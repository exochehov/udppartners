import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Trash2, Loader } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useTranslation } from 'react-i18next';
import { products } from '../data/products';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    initializeSellSnEmbed?: () => void;
    openSellSnModal?: (storeId: string, productId: string) => void;
    closeSellSnModal?: () => void;
  }
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, removeFromCart, total } = useCart();
  const [processing, setProcessing] = useState(false);
  const { t } = useTranslation();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    if (isOpen && !scriptLoaded) {
      const script = document.createElement('script');
      script.src = 'https://pay.sellsn.io/embed.min.js';
      script.async = true;

      script.onload = () => {
        try {
          setScriptLoaded(true);
          if (window.initializeSellSnEmbed) {
            window.initializeSellSnEmbed();
          }
          setScriptError(false);
        } catch (error) {
          console.error('Error initializing SellSN:', error);
          setScriptError(true);
        }
      };

      script.onerror = () => {
        console.error('Failed to load SellSN script');
        setScriptError(true);
      };

      document.body.appendChild(script);

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
        setScriptLoaded(false);
      };
    }
  }, [isOpen]);

  const handleCheckout = () => {
    if (!window.openSellSnModal || !scriptLoaded) {
      setScriptError(true);
      return;
    }

    setProcessing(true);
    const firstItem = items[0];
    const product = products[firstItem.id as keyof typeof products];
    const pricing = product?.pricing.find(p => p.period === firstItem.period);
    
    if (pricing?.buttonId) {
      try {
        window.openSellSnModal(
          '5b9ec969-85b7-473e-8f77-92b800113825', // Your store ID
          pricing.buttonId
        );
      } catch (error) {
        console.error('Error opening SellSN embed:', error);
        setProcessing(false);
        setScriptError(true);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={() => !processing && onClose()}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md 
                     bg-black/90 border border-purple-500/20 rounded-xl p-6 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-6 h-6 text-purple-400" />
                <h3 className="text-xl font-bold text-white">{t('cart.title')}</h3>
              </div>
              <button
                onClick={() => !processing && onClose()}
                className="text-gray-400 hover:text-white transition-colors"
                disabled={processing}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {items.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">{t('cart.empty')}</p>
                </div>
              ) : (
                items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-lg p-4 border border-white/10 flex justify-between items-center"
                  >
                    <div>
                      <h4 className="text-white font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-400">{t(`periods.${item.period}`)}</p>
                      <p className="text-purple-400">${item.price}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(index)}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                      disabled={processing}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Error Message */}
            {scriptError && (
              <p className="text-red-500 text-sm text-center mb-4">
                {t('cart.paymentError')}
              </p>
            )}

            {/* Footer */}
            {items.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-white">
                  <span className="font-medium">{t('cart.total')}:</span>
                  <span className="text-xl font-bold">${total.toFixed(2)}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={processing || !scriptLoaded || scriptError}
                  className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium
                           hover:bg-purple-700 transition-colors disabled:opacity-50
                           flex items-center justify-center space-x-2"
                >
                  {processing ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      <span>{t('cart.checkout')}</span>
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-gray-400">
                  {t('cart.securePayment')}
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}