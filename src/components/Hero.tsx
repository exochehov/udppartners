import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-5"
        >
          <Shield className="w-full h-full text-white" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-amber-500 to-orange-400">
            UDP Gaming Tools
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-slate-400 text-xl max-w-2xl mx-auto mb-12"
        >
          {t('hero.description')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="https://discord.gg/undetect"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-4 rounded-lg 
                     font-medium text-lg shadow-lg shadow-orange-500/25 hover:shadow-orange-500/50 
                     transition-all duration-300 hover:scale-105"
          >
            {t('hero.joinDiscord')}
          </a>
          
          <a
            href="#features"
            className="bg-white/5 text-white px-8 py-4 rounded-lg font-medium text-lg
                     border border-orange-500/20 hover:bg-white/10 
                     transition-all duration-300 hover:scale-105"
          >
            {t('hero.exploreFeatures')}
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
        >
          {Object.entries(t('hero.stats', { returnObjects: true })).map(([key, value]) => (
            <div key={key} className="relative group">
              <div className="absolute inset-0 bg-orange-500/5 rounded-lg blur-xl group-hover:bg-orange-500/10 transition-all duration-300" />
              <div className="relative p-6 bg-white/5 rounded-lg border border-white/10 group-hover:border-orange-500/20 transition-all duration-300">
                <div className="text-2xl font-bold text-white mb-1">
                  {key === 'uptime' ? '99.9%' : 
                   key === 'support' ? '24/7' :
                   key === 'performance' ? '0%' :
                   '1ms'}
                </div>
                <div className="text-sm text-gray-400">{value as string}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}