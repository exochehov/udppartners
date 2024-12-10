import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface GameCategoryHeaderProps {
  icon: LucideIcon;
  title: string;
  delay?: number;
}

export default function GameCategoryHeader({ icon: Icon, title, delay = 0 }: GameCategoryHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="flex items-center space-x-4 mb-8"
    >
      <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500/20 to-amber-500/20">
        <Icon className="w-6 h-6 text-orange-400" />
      </div>
      <h3 className="text-2xl font-bold text-white">{title}</h3>
    </motion.div>
  );
}