import { useParams } from 'react-router-dom';
import { Shield, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProviderCard from './ProviderCard';
import { providers, gameNames } from '../../data/providers';

export default function GameProvidersPage() {
  const { gameId } = useParams();
  const gameName = gameId ? gameNames[gameId as keyof typeof gameNames] : '';
  const gameProviders = gameId ? providers[gameId as keyof typeof providers] || [] : [];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500/80 to-amber-500/80">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white/90">{gameName} Providers</h1>
          </div>
          <Link
            to="/"
            className="flex items-center space-x-2 text-gray-400/90 hover:text-white/90 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
        </div>

        {/* Providers List */}
        <div className="space-y-6">
          {gameProviders.map((provider, index) => (
            <ProviderCard
              key={provider.id}
              gameId={gameId || ''}
              provider={provider}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}