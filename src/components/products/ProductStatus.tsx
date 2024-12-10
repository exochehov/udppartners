import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Info } from 'lucide-react';

type Status = 'undetected' | 'detected' | 'updating';

interface ProductStatusProps {
  status: Status;
}

const statusConfig = {
  undetected: {
    icon: Shield,
    text: 'Undetected',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20'
  },
  detected: {
    icon: AlertTriangle,
    text: 'Detected',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20'
  },
  updating: {
    icon: Info,
    text: 'Updating',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20'
  }
};

export default function ProductStatus({ status }: ProductStatusProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mb-8 p-4 rounded-lg ${config.bgColor} ${config.borderColor} border`}
    >
      <div className="flex items-center space-x-2">
        <Icon className={`w-5 h-5 ${config.color}`} />
        <span className={`font-medium ${config.color}`}>
          Status: {config.text}
        </span>
      </div>
    </motion.div>
  );
}