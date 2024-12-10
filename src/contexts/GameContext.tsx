import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getGames, getGameStatus } from '../services/api';

interface Game {
  id: string;
  name: string;
  description: string;
  status: string;
  lastUpdated: string;
  category: string;
  features: string[];
  requirements: string[];
  pricing: Array<{
    period: string;
    price: number;
    buttonId: string;
  }>;
  images: string[];
  primaryImage: string | null;
}

interface GameContextType {
  games: Game[];
  loading: boolean;
  error: string | null;
  refreshGames: () => Promise<void>;
  getGameById: (id: string) => Game | undefined;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshGames = async () => {
    try {
      setLoading(true);
      const data = await getGames();
      setGames(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch games');
      console.error('Error fetching games:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshGames();
  }, []);

  const getGameById = (id: string) => {
    return games.find(game => game.id === id);
  };

  return (
    <GameContext.Provider value={{ 
      games, 
      loading, 
      error, 
      refreshGames,
      getGameById
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGames() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGames must be used within a GameProvider');
  }
  return context;
}