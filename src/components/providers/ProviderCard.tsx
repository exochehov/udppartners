import { motion } from 'framer-motion';
import { Star, Users, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProviderCardProps {
  gameId: string;
  provider: {
    id: string;
    name: string;
    rating: number;
    users: string;
    lastUpdate: string;
    features: string[];
    pricing: Array<{ period: string; price: number }>;
  };
  index: number;
}

export default function ProviderCard({ gameId, provider, index }: ProviderCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-amber-500/5 rounded-lg blur-xl 
                    group-hover:from-orange-500/10 group-hover:to-amber-500/10 transition-all duration-500" />
      
      <div className="relative bg-black/40 backdrop-blur-sm rounded-lg border border-white/5 overflow-hidden
                    group-hover:border-orange-500/20 transition-all duration-500">
        {/* Provider Header */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white/90 group-hover:text-orange-400/90 transition-colors">
              {provider.name}
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-orange-400/90" />
                <span className="text-white/90">{provider.rating}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-orange-400/90" />
                <span className="text-white/90">{provider.users}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-orange-400/90" />
                <span className="text-white/90">{provider.lastUpdate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features & Pricing */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Features */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-400/90">Features</h4>
            <div className="grid grid-cols-2 gap-2">
              {provider.features.map((feature) => (
                <div key={feature} className="flex items-center space-x-2 text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500/90" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-sm font-medium text-gray-400/90">Pricing</h4>
              <Link
                to={`/product/${gameId}/${provider.id}`}
                className="flex items-center space-x-2 text-orange-400/90 hover:text-orange-300/90 transition-colors"
              >
                <span>View Details</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {provider.pricing.map((price) => (
                <Link
                  key={price.period}
                  to={`/product/${gameId}/${provider.id}`}
                  className="group/price relative overflow-hidden rounded-lg border border-white/10 
                           hover:border-orange-500/20 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-amber-500/0 
                               group-hover/price:from-orange-500/10 group-hover/price:to-amber-500/10 transition-all duration-300" />
                  <div className="relative p-4">
                    <div className="text-sm text-gray-400/90 mb-1">{price.period}</div>
                    <div className="text-2xl font-bold text-white/90">${price.price}</div>
                    <div className="mt-2 text-sm text-orange-400/90 group-hover/price:text-orange-300/90 transition-colors">
                      Purchase
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}