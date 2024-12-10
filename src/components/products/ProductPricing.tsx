import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';
import { ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

interface PricingOption {
  period: string;
  price: number;
  buttonId: string;
}

interface ProductPricingProps {
  productId: string;
  productName: string;
  pricing: PricingOption[];
}

export default function ProductPricing({ productId, productName, pricing }: ProductPricingProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!selectedPeriod) return;
    
    const option = pricing.find(p => p.period === selectedPeriod);
    if (!option) return;

    addToCart({
      id: productId,
      name: productName,
      period: selectedPeriod,
      price: option.price
    });

    toast.success('Added to cart');
  };

  return (
    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
      <h3 className="text-xl font-bold text-white mb-4">Select Period</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {pricing.map((option) => (
          <button
            key={option.period}
            onClick={() => setSelectedPeriod(option.period)}
            className={`p-4 rounded-lg border transition-all ${
              selectedPeriod === option.period
                ? 'bg-orange-600/20 border-orange-500 text-orange-400'
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
            }`}
          >
            <div className="text-sm">{option.period}</div>
            <div className="text-2xl font-bold mt-1">${option.price}</div>
          </button>
        ))}
      </div>

      <button
        onClick={handleAddToCart}
        disabled={!selectedPeriod}
        className="w-full py-3 px-6 rounded-lg font-medium transition-all duration-300
                 bg-gradient-to-r from-orange-500 to-amber-500 text-white
                 hover:shadow-lg hover:shadow-orange-500/25
                 disabled:opacity-50 disabled:cursor-not-allowed
                 flex items-center justify-center space-x-2"
      >
        <ShoppingCart className="w-5 h-5" />
        <span>Add to Cart</span>
      </button>
    </div>
  );
}