import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

interface GameCardProps {
  id: string;
  name: string;
  image: string;
  delay?: number;
}

export default function GameCard({ id, name, image, delay = 0 }: GameCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ scale: 1.02 }}
      className="group relative"
    >
      <Link to={`/product/${id}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl blur-xl 
                     group-hover:from-orange-500/20 group-hover:to-amber-500/20 transition-all duration-500" />
        
        <div className="relative overflow-hidden rounded-xl">
          <div className="aspect-[16/9] relative">
            <img 
              src={image} 
              alt={name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
              {name}
            </h4>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <Shield className="w-4 h-4 text-orange-400" />
              <span>Undetected</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}