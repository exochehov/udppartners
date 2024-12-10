import { motion } from 'framer-motion';
import { Shield, Target, Eye, Zap, Cpu, Crown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const features = [
  { icon: Eye, key: 'esp' },
  { icon: Target, key: 'aimbot' },
  { icon: Shield, key: 'undetectable' },
  { icon: Cpu, key: 'performance' },
  { icon: Crown, key: 'support' },
];

export default function Features() {
  const { t } = useTranslation();

  return (
    <div id="features" className="relative py-32 px-4">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-600">
              {t('features.title')}
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl blur-xl 
                             group-hover:from-orange-500/20 group-hover:to-amber-500/20 transition-all duration-500" />
                
                <div className="relative p-8 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm
                             group-hover:border-orange-500/20 transition-all duration-500">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 
                               w-fit mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">
                    {t(`features.categories.${feature.key}`)}
                  </h3>
                  
                  <p className="text-slate-400 group-hover:text-slate-300 transition-colors">
                    {t(`features.descriptions.${feature.key}`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}