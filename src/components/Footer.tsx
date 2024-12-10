import { Shield, MessageSquare, Zap, Target, Crosshair, Globe, Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const games = [
  { name: 'Escape from Tarkov', icon: Target },
  { name: 'Apex Legends', icon: Crosshair },
  { name: 'Rust', icon: Shield },
  { name: 'FiveM', icon: Gamepad2 },
];

const communities = [
  { name: 'Discord', icon: MessageSquare, url: 'https://discord.gg/undetect' },
  { name: 'Telegram', icon: Globe, url: 'https://t.me/undetect' },
];

export default function Footer() {
  return (
    <footer className="relative mt-20">
      {/* Wave Separator */}
      <div className="absolute top-0 left-0 right-0 transform -translate-y-full overflow-hidden">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          className="relative block w-full h-[100px]"
          style={{ transform: 'rotate(180deg)' }}
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-orange-950/50"
          />
        </svg>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-950 via-black to-black opacity-90" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">UDP Gaming</span>
            </Link>
            <p className="text-slate-400">
              Premium gaming tools and HWID spoofer for EAC, BattlEye, and Ricochet.
              Supporting multiple games with undetectable technology.
            </p>
            <div className="flex items-center space-x-4">
              {communities.map((community) => (
                <a
                  key={community.name}
                  href={community.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <community.icon className="w-5 h-5 text-orange-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Supported Games */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Supported Games</h3>
            <ul className="space-y-4">
              {games.map((game) => (
                <motion.li 
                  key={game.name}
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-3 text-slate-400 hover:text-orange-400 transition-colors"
                >
                  <game.icon className="w-5 h-5" />
                  <Link to={`/product/${game.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    {game.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <motion.li whileHover={{ x: 5 }}>
                <Link to="/status" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Status Page
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link to="/terms" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Terms of Service
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a 
                  href="https://discord.gg/undetect"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-orange-400 transition-colors"
                >
                  Support
                </a>
              </motion.li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">24/7 Support</h3>
            <div className="space-y-4">
              <p className="text-slate-400">
                Join our Discord community for instant support and updates
              </p>
              <a
                href="https://discord.gg/undetect"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg
                         bg-gradient-to-r from-orange-500 to-amber-500 text-white
                         hover:shadow-lg hover:shadow-orange-500/25 transition-all"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Join Discord</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} UDP Gaming. All rights reserved.
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-orange-400">Secured by</span>
              <Shield className="w-4 h-4 text-orange-400" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}