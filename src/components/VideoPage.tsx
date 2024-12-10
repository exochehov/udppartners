import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function VideoPage() {
  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/ZiEWUA_myXg?autoplay=1';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.className = 'w-full h-full absolute inset-0';
    
    const container = document.getElementById('video-container');
    if (container) {
      container.appendChild(iframe);
    }

    return () => {
      if (container && container.contains(iframe)) {
        container.removeChild(iframe);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl font-bold text-purple-400 mb-8 font-mono"
      >
        e-e-eee boooy
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-4xl aspect-video relative rounded-xl overflow-hidden"
        id="video-container"
      />
    </div>
  );
}