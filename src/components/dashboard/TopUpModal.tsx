import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, CreditCard, Loader } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PaymentOption {
  amount: number;
  buttonId: string;
}

declare global {
  interface Window {
    initializeSellSnEmbed?: () => void;
    openSellSnModal?: (storeId: string, productId: string) => void;
    closeSellSnModal?: () => void;
  }
}

const paymentOptions: PaymentOption[] = [
  { amount: 1, buttonId: '1e535040-ad8a-4c02-988f-94ebe7bd199a' },
  { amount: 2, buttonId: '285e40e5-9a10-4f75-b8b3-c4efa3e887eb' },
  { amount: 3, buttonId: 'c8d00d08-661d-476c-988d-8175134983d1' },
  { amount: 5, buttonId: '71016e9b-bc7a-4185-a244-c92a2d0942d9' },
  { amount: 15, buttonId: '71e94e8e-c7d6-4327-a78f-5fffb23918fa' },
  { amount: 25, buttonId: 'ff33367c-bc25-48d4-b27c-f2359f4517ec' },
  { amount: 50, buttonId: '4a6d2859-12bd-4312-88fe-d5f7a7909c87' },
  { amount: 75, buttonId: '785c1e31-0a18-427c-a1ff-9ab214eb4deb' },
  { amount: 100, buttonId: '46c1b4a9-05e3-48bf-bf39-ef8f080736b0' },
].sort((a, b) => a.amount - b.amount);

export default function TopUpModal({ isOpen, onClose }: TopUpModalProps) {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(4);
  const [processing, setProcessing] = useState(false);
  const [scriptError, setScriptError] = useState(false);
  const scriptLoaded = useRef(false);
  const { updateBalance } = useAuth();

  useEffect(() => {
    if (isOpen && !scriptLoaded.current) {
      const script = document.createElement('script');
      script.src = 'https://pay.sellsn.io/embed.min.js';
      script.async = true;

      script.onload = () => {
        try {
          scriptLoaded.current = true;
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
        scriptLoaded.current = false;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === 'https://pay.sellsn.io') {
        try {
          const { type, data } = event.data;
          if (type === 'payment_success') {
            updateBalance(data.amount);
            setProcessing(false);
            onClose();
          }
        } catch (error) {
          console.error('Error processing payment message:', error);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [updateBalance, onClose]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOptionIndex(Number(e.target.value));
  };

  const handlePayment = () => {
    if (!window.openSellSnModal || !scriptLoaded.current) {
      setScriptError(true);
      return;
    }

    setProcessing(true);
    const selectedOption = paymentOptions[selectedOptionIndex];

    try {
      window.openSellSnModal(
        '5b9ec969-85b7-473e-8f77-92b800113825',
        selectedOption.buttonId
      );
    } catch (error) {
      console.error('Error opening SellSN embed:', error);
      setProcessing(false);
      setScriptError(true);
    }
  };

  const selectedOption = paymentOptions[selectedOptionIndex];

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
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Add Balance</h3>
              <button
                onClick={() => !processing && onClose()}
                className="text-gray-400 hover:text-white transition-colors"
                disabled={processing}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-8">
              {/* Amount Display */}
              <div className="text-center">
                <div className="text-4xl font-bold text-white flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-purple-400" />
                  <span>{selectedOption.amount}</span>
                </div>
              </div>

              {/* Slider */}
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max={paymentOptions.length - 1}
                    value={selectedOptionIndex}
                    onChange={handleSliderChange}
                    className="w-full h-2 bg-purple-500/20 rounded-lg appearance-none cursor-pointer
                             [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 
                             [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-purple-500 
                             [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
                             [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white
                             [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:bg-purple-500
                             [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer
                             [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white"
                  />
                  {/* Tick marks */}
                  <div className="absolute w-full flex justify-between px-[3px] -mt-2">
                    {paymentOptions.map((option, index) => (
                      <div
                        key={option.amount}
                        className={`w-1 h-1 rounded-full ${
                          index <= selectedOptionIndex ? 'bg-purple-500' : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Amount labels grid */}
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {paymentOptions.map((option, index) => (
                    <button
                      key={option.amount}
                      onClick={() => setSelectedOptionIndex(index)}
                      className={`text-sm py-1 px-2 rounded transition-colors ${
                        index === selectedOptionIndex 
                          ? 'bg-purple-500/20 text-purple-400' 
                          : 'text-gray-400 hover:text-gray-300'
                      }`}
                    >
                      ${option.amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {scriptError && (
                <p className="text-red-500 text-sm text-center">
                  There was an error loading the payment system. Please try again.
                </p>
              )}

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                disabled={processing || !scriptLoaded.current || scriptError}
                className="w-full py-3 px-6 bg-purple-600 text-white rounded-lg font-medium
                         hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span>Pay ${selectedOption.amount}</span>
                  </>
                )}
              </button>

              <p className="text-center text-sm text-gray-400">
                Secure payment powered by SellSN
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}