import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function VideoLoader() {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex flex-col items-center justify-center">
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 360, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="mb-8"
      >
        <Shield className="h-16 w-16 text-purple-500" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <motion.h2
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-4xl font-bold text-purple-400 mb-4 font-mono"
        >
          e-e-eee boooy
        </motion.h2>
        <p className="text-gray-400">Loading something special...</p>
      </motion.div>

      <div className="mt-8 flex space-x-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ 
              duration: 1, 
              repeat: Infinity, 
              delay: i * 0.2 
            }}
            className="w-3 h-3 bg-purple-500 rounded-full"
          />
        ))}
      </div>
    </div>
  );
}