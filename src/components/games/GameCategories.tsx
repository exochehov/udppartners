import { motion } from 'framer-motion';
import { Shield, Crosshair, Target, Gamepad } from 'lucide-react';
import GameCategoryHeader from './GameCategoryHeader';
import GameCard from './GameCard';

const games = [
  {
    id: 'fps',
    title: 'FPS Games',
    icon: Crosshair,
    games: [
      { id: 'eft-full', name: 'Escape from Tarkov', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80' },
      { id: 'apex', name: 'Apex Legends', image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&q=80' },
      { id: 'pubg', name: 'PUBG', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80' },
    ]
  },
  {
    id: 'survival',
    title: 'Survival Games',
    icon: Shield,
    games: [
      { id: 'rust', name: 'Rust', image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&q=80' },
      { id: 'dayz', name: 'DayZ', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80' },
    ]
  },
  {
    id: 'battle-royale',
    title: 'Battle Royale',
    icon: Target,
    games: [
      { id: 'fortnite', name: 'Fortnite', image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&q=80' },
      { id: 'warzone', name: 'Warzone', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80' },
    ]
  },
];

export default function GameCategories() {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-8"
          >
            <Gamepad className="w-4 h-4 text-orange-400 mr-2" />
            <span className="text-sm text-orange-300">Game Selection</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-600 mb-4"
          >
            Choose Your Game
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Select from our wide range of supported games and discover the perfect tools for your gaming experience
          </motion.p>
        </div>

        {/* Game Categories */}
        <div className="space-y-16">
          {games.map((category, categoryIndex) => (
            <div key={category.id}>
              <GameCategoryHeader 
                icon={category.icon} 
                title={category.title} 
                delay={categoryIndex * 0.1} 
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.games.map((game, gameIndex) => (
                  <GameCard 
                    key={game.id}
                    {...game}
                    delay={categoryIndex * 0.1 + gameIndex * 0.1}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}