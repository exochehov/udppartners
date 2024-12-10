import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Scroll } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function TermsOfService() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState('intro');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const scrollPercentage = (element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100;
    setScrollPosition(scrollPercentage);

    // Update active section based on scroll position
    const sections = element.querySelectorAll('h3[id]');
    let currentSection = 'intro';
    
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 200) {
        currentSection = section.id;
      }
    });
    
    setActiveSection(currentSection);
  };

  // Prevent background scrolling when terms page is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-dark z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="sticky top-0 bg-black/90 backdrop-blur-sm border-b border-purple-500/20 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Scroll className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">{t('terms.title')}</h2>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>{t('terms.back')}</span>
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="sticky top-[89px] w-full h-1 bg-gray-800">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          style={{ width: `${scrollPosition}%` }}
        />
      </div>

      {/* Section title */}
      <div className="sticky top-[96px] bg-black/80 backdrop-blur-sm border-b border-purple-500/20 py-4">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-xl font-bold text-white">
            {t(`terms.sections.${activeSection}`)}
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex">
        {/* Navigation sidebar */}
        <div className="w-64 h-[calc(100vh-144px)] bg-black/50 border-r border-purple-500/20 p-4 overflow-y-auto custom-scrollbar">
          <nav className="space-y-2">
            {Object.entries(t('terms.sections', { returnObjects: true })).map(([key, value]) => (
              <button
                key={key}
                onClick={() => scrollToSection(key)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeSection === key
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                {value as string}
              </button>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <div 
          className="flex-1 p-6 overflow-y-auto h-[calc(100vh-144px)] custom-scrollbar space-y-6"
          onScroll={handleScroll}
        >
          <div className="max-w-3xl mx-auto prose prose-invert">
            <div id="intro">
              <p className="text-gray-400">{t('terms.content.intro')}</p>
              <p className="text-gray-400">{t('terms.content.companyInfo')}</p>
            </div>

            <h3 id="definitions" className="text-xl font-bold text-white mt-8">{t('terms.sections.definitions')}</h3>
            <ul className="list-disc pl-6 text-gray-400 space-y-2">
              {t('terms.content.definitions', { returnObjects: true }).map((def: string, index: number) => (
                <li key={index}>{def}</li>
              ))}
            </ul>

            <h3 id="termsConditions" className="text-xl font-bold text-white mt-8">{t('terms.sections.termsConditions')}</h3>
            <ul className="list-disc pl-6 text-gray-400 space-y-2">
              {t('terms.content.terms', { returnObjects: true }).map((term: string, index: number) => (
                <li key={index}>{term}</li>
              ))}
            </ul>

            <h3 id="payment" className="text-xl font-bold text-white mt-8">{t('terms.sections.payment')}</h3>
            <ul className="list-disc pl-6 text-gray-400 space-y-2">
              {t('terms.content.payment', { returnObjects: true }).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h3 id="prohibited" className="text-xl font-bold text-white mt-8">{t('terms.sections.prohibited')}</h3>
            <ul className="list-disc pl-6 text-gray-400 space-y-2">
              {t('terms.content.prohibited', { returnObjects: true }).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h3 id="disclaimer" className="text-xl font-bold text-white mt-8">{t('terms.sections.disclaimer')}</h3>
            <p className="text-gray-400">{t('terms.content.disclaimer')}</p>

            <h3 id="contact" className="text-xl font-bold text-white mt-8">{t('terms.sections.contact')}</h3>
            <p className="text-gray-400">{t('terms.content.contact')}</p>

            <div className="mt-8 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <p className="text-sm text-gray-400">
                {t('terms.lastUpdated')}: March 14, 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}