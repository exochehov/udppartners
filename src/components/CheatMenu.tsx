import { useState, useEffect } from 'react';
import {
  Target,
  Eye,
  Users,
  Globe,
  Settings,
  Wrench,
  Search,
  Lock,
  ShoppingCart,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

const sections = [
  { id: 'combat', icon: Target, label: 'Combat' },
  { id: 'visuals', icon: Eye, label: 'Visuals' },
  { id: 'players', icon: Users, label: 'Players' },
  { id: 'world', icon: Globe, label: 'World' },
  { id: 'search', icon: Search, label: 'Search' },
  { id: 'misc', icon: Wrench, label: 'Misc' },
  { id: 'config', icon: Settings, label: 'Config' },
];

const subscriptionOptions = [
  { period: '2h', price: 1.0 },
  { period: 'day', price: 6.0 },
  { period: 'week', price: 25.0 },
  { period: 'month', price: 50.0 },
];

export default function CheatMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('combat');
  const [showInsertHint, setShowInsertHint] = useState(true);
  const [aimbotEnabled, setAimbotEnabled] = useState(false);
  const [aimbotRadius, setAimbotRadius] = useState(100);
  const [silentAimbotEnabled, setSilentAimbotEnabled] = useState(false);
  const { addToCart } = useCart();
  const { t } = useTranslation();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Insert') {
        setIsOpen((prev) => !prev);
        setShowInsertHint(true);
      } else {
        setShowInsertHint(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    const event = new CustomEvent('toggleAimbot', {
      detail: { enabled: aimbotEnabled, radius: aimbotRadius },
    });
    window.dispatchEvent(event);
  }, [aimbotEnabled, aimbotRadius]);

  const handleAimbotToggle = () => {
    setAimbotEnabled(!aimbotEnabled);
  };

  const handleRadiusChange = (value: number) => {
    setAimbotRadius(Math.min(200, Math.max(0, value)));
  };

  const handleSubscriptionSelect = (period: string, price: number) => {
    addToCart({
      id: 'eft-full',
      name: 'EFT External',
      period,
      price
    });
    toast.success(t('cart.itemAdded'));
  };

  const renderCombatSection = () => (
    <div className="space-y-6">
      <div className="text-[#666666] text-sm">General</div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[#666666]">Enabled (Use at own risk)</span>
          <button
            onClick={handleAimbotToggle}
            className={`w-5 h-5 rounded transition-colors ${
              aimbotEnabled
                ? 'bg-purple-500'
                : 'bg-[#1A1A1A] border border-[#333333]'
            }`}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#666666]">Fov Slider</span>
            <span className="text-[#666666]">{aimbotRadius}</span>
          </div>
          <input
            type="range"
            min="0"
            max="200"
            value={aimbotRadius}
            onChange={(e) => handleRadiusChange(Number(e.target.value))}
            className="w-full h-1 bg-[#1A1A1A] rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#666666]">Silent Aimbot</span>
          <button
            onClick={() => setSilentAimbotEnabled(!silentAimbotEnabled)}
            className={`w-5 h-5 rounded transition-colors ${
              silentAimbotEnabled
                ? 'bg-purple-500'
                : 'bg-[#1A1A1A] border border-[#333333]'
            }`}
          />
        </div>
      </div>
    </div>
  );

  const renderLockedSection = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center"
    >
      <div className="text-center space-y-6 p-8">
        <Lock className="w-16 h-16 text-purple-500 mx-auto" />
        <h3 className="text-2xl font-bold text-white">{t('cheatMenu.premiumFeature')}</h3>
        <p className="text-gray-400 max-w-md">
          {t('cheatMenu.premiumDescription')}
        </p>

        <div className="grid grid-cols-2 gap-4 mt-8">
          {subscriptionOptions.map((option) => (
            <motion.button
              key={option.period}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSubscriptionSelect(option.period, option.price)}
              className="p-4 bg-white/5 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors"
            >
              <div className="text-white font-medium">
                {t(`periods.${option.period}`)}
              </div>
              <div className="text-2xl font-bold text-purple-400">
                ${option.price}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      {/* Insert key hint */}
      {showInsertHint && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black/90 text-white px-4 py-2 rounded-lg border border-purple-500/20 text-sm">
          {t('cheatMenu.insertHint')}
        </div>
      )}

      {isOpen && (
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#0F0F0F] rounded-lg border border-[#1A1A1A] z-50 flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-[200px] bg-[#141414] border-r border-[#1A1A1A]">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full px-6 py-3 flex items-center space-x-3 ${
                  activeSection === section.id
                    ? 'bg-[#1A1A1A] text-white'
                    : 'text-[#666666] hover:text-white'
                }`}
              >
                <section.icon className="w-5 h-5" />
                <span className="text-sm">{section.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar relative">
            {activeSection === 'combat' && renderCombatSection()}
            {activeSection !== 'combat' && renderLockedSection()}
          </div>
        </div>
      )}
    </>
  );
}