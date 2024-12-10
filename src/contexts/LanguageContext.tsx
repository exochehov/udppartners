import { createContext, useContext, useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface PriceMultiplier {
  [key: string]: number;
}

const priceMultipliers: PriceMultiplier = {
  en: 1,
  ru: 95, // USD to RUB approximate rate
  zh: 7.2 // USD to CNY approximate rate
};

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  getPriceInCurrentCurrency: (basePrice: number) => string;
  getCurrencySymbol: () => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const [language, setLanguageState] = useState('en');

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    i18n.changeLanguage(lang);
  };

  const getPriceInCurrentCurrency = (basePrice: number): string => {
    const multiplier = priceMultipliers[language];
    const price = basePrice * multiplier;
    
    switch (language) {
      case 'ru':
        return `${Math.round(price)}₽`;
      case 'zh':
        return `¥${price.toFixed(2)}`;
      default:
        return `$${price}`;
    }
  };

  const getCurrencySymbol = (): string => {
    switch (language) {
      case 'ru':
        return '₽';
      case 'zh':
        return '¥';
      default:
        return '$';
    }
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      getPriceInCurrentCurrency,
      getCurrencySymbol
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}