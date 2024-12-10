import { Link } from 'react-router-dom';
import { Shield, ChevronLeft, Play } from 'lucide-react';

interface ProductHeaderProps {
  name: string;
  description: string;
  videoUrl?: string;
  onWatchVideo?: () => void;
}

export default function ProductHeader({ name, description, videoUrl, onWatchVideo }: ProductHeaderProps) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500/80 to-amber-500/80">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white/90">{name}</h1>
        </div>
        <Link
          to="/"
          className="flex items-center space-x-2 text-gray-400/90 hover:text-white/90 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </Link>
      </div>

      {/* Description */}
      <div className="mb-8">
        <p className="text-gray-400">{description}</p>
        {videoUrl && onWatchVideo && (
          <button
            onClick={onWatchVideo}
            className="mt-4 inline-flex items-center space-x-2 text-orange-400 hover:text-orange-300 transition-colors"
          >
            <Play className="w-5 h-5" />
            <span>Watch Video</span>
          </button>
        )}
      </div>
    </>
  );
}