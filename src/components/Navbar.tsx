import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import CartButton from './cart/CartButton';
import LanguageSelector from './LanguageSelector';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const maxScroll = 200; // Maximum scroll for vignette effect

      setIsScrolled(currentScrollY > 50);
      setScrollProgress(Math.min(currentScrollY / maxScroll, 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Vignette Effect */}
      <div 
        className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-40 pointer-events-none"
        style={{ 
          opacity: Math.max(0.6 - scrollProgress * 0.6, 0),
          transition: 'opacity 0.3s ease-out'
        }}
      />

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-md border-b border-orange-500/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                UDP Gaming
              </span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link 
                to="/status"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Status
              </Link>
              <LanguageSelector />
              <CartButton />
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}