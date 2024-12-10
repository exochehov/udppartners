import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Wrench, Shield } from 'lucide-react';

interface FeatureCategory {
  [key: string]: string[] | { [key: string]: string[] };
}

interface ProductFeaturesProps {
  features: FeatureCategory;
}

const tabConfig = {
  aimbot: {
    icon: Target,
    gradient: 'from-orange-500 to-amber-500',
  },
  visuals: {
    icon: Eye,
    gradient: 'from-amber-500 to-orange-500',
  },
  misc: {
    icon: Wrench,
    gradient: 'from-orange-500 to-amber-500',
  },
};

export default function ProductFeatures({ features }: ProductFeaturesProps) {
  const [activeTab, setActiveTab] = useState(Object.keys(features)[0]);

  const renderFeatureList = (featureList: string[]) => (
    <ul className="space-y-2">
      {Array.isArray(featureList) && featureList.map((feature, index) => (
        <li key={index} className="flex items-center space-x-2 text-gray-400">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );

  const renderContent = () => {
    const activeFeatures = features[activeTab];

    if (!activeFeatures) return null;

    if (Array.isArray(activeFeatures)) {
      return renderFeatureList(activeFeatures);
    }

    return (
      <div className="space-y-8">
        {Object.entries(activeFeatures).map(([subCategory, subFeatures]) => (
          <div key={subCategory}>
            <h4 className="text-lg font-semibold text-orange-400 mb-3">
              {subCategory.charAt(0).toUpperCase() + subCategory.slice(1)}
            </h4>
            {Array.isArray(subFeatures) && renderFeatureList(subFeatures)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex flex-wrap gap-4">
        {Object.keys(features).map((tab) => {
          const config = tabConfig[tab as keyof typeof tabConfig];
          const Icon = config?.icon || Shield;
          
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab
                  ? 'text-white'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className={`absolute inset-0 bg-gradient-to-r ${config?.gradient || 'from-orange-500 to-amber-500'} 
                           rounded-lg opacity-20`}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div className="relative flex items-center space-x-2">
                <Icon className="w-5 h-5" />
                <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="bg-white/5 rounded-lg p-6 border border-white/10">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
}