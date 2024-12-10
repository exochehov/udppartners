import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, ChevronLeft } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import VideoModal from './VideoModal';
import ProductTabs from './product/ProductTabs';
import toast from 'react-hot-toast';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { getPriceInCurrentCurrency } = useLanguage();
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

  const product = id ? products[id as keyof typeof products] : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  useEffect(() => {
    if (!product) {
      navigate('/');
    }
  }, [product, navigate]);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedPeriod) return;
    
    const pricing = product.pricing.find(p => p.period === selectedPeriod);
    if (!pricing) return;

    addToCart({
      id: product.id,
      name: product.name,
      period: selectedPeriod,
      price: pricing.price
    });

    toast.success(t('cart.itemAdded'));
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">{product.name}</h1>
            </div>
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>

          {/* Product content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left column - Product info */}
            <div className="space-y-6">
              <p className="text-gray-400">{product.description}</p>
              
              {product.featureCategories && (
                <ProductTabs features={product.featureCategories} />
              )}
            </div>

            {/* Right column - Pricing */}
            {product.pricing && product.pricing.length > 0 && (
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">
                  {t('product.selectPeriod')}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.pricing.map((price) => (
                    <button
                      key={price.period}
                      onClick={() => setSelectedPeriod(price.period)}
                      className={`p-4 rounded-lg border transition-all ${
                        selectedPeriod === price.period
                          ? 'bg-orange-600/20 border-orange-500 text-orange-400'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-sm">{t(`periods.${price.period}`)}</div>
                      <div className="text-2xl font-bold mt-1">
                        {getPriceInCurrentCurrency(price.price)}
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!selectedPeriod}
                  className="w-full mt-6 py-3 px-6 bg-orange-600 text-white rounded-lg font-medium
                           hover:bg-orange-700 transition-colors disabled:opacity-50 
                           disabled:cursor-not-allowed"
                >
                  {t('cart.addToCart')}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {showVideo && (
        <VideoModal isOpen={showVideo} onClose={() => setShowVideo(false)} />
      )}
    </div>
  );
}