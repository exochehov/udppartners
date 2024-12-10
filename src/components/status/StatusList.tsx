import { motion } from 'framer-motion';
import { Shield, AlertTriangle, RefreshCcw, Lock, Loader2 } from 'lucide-react';
import { useGames } from '../../contexts/GameContext';
import { useTranslation } from 'react-i18next';

const statusConfig = {
  undetected: {
    icon: Shield,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
    gradient: 'from-green-500 to-emerald-500'
  },
  detected: {
    icon: AlertTriangle,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
    gradient: 'from-red-500 to-orange-500'
  },
  updating: {
    icon: RefreshCcw,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
    gradient: 'from-yellow-500 to-amber-500'
  },
  testing: {
    icon: Loader2,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    gradient: 'from-blue-500 to-cyan-500'
  },
  closed: {
    icon: Lock,
    color: 'text-gray-500',
    bgColor: 'bg-gray-500/10',
    borderColor: 'border-gray-500/20',
    gradient: 'from-gray-500 to-slate-500'
  }
};

export default function StatusList() {
  const { games, loading, error } = useGames();
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {games.map((game, index) => {
        const config = statusConfig[game.status as keyof typeof statusConfig];
        const Icon = config.icon;

        return (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} opacity-5 rounded-xl blur-xl 
                         group-hover:opacity-10 transition-all duration-500`} />

            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden
                         group-hover:border-white/20 transition-all duration-500">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`p-3 rounded-xl bg-gradient-to-r ${config.gradient}`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                      {game.name}
                    </h3>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${config.color} ${config.bgColor} border ${config.borderColor}`}>
                    {t(`status.statuses.${game.status}`)}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-gray-400">
                    {t('status.lastUpdated')}: {new Date(game.lastUpdated).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}