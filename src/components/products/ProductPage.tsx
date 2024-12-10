import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductHeader from './ProductHeader';
import ProductStatus from './ProductStatus';
import ProductFeatures from './ProductFeatures';
import ProductGallery from './ProductGallery';
import ProductPricing from './ProductPricing';
import ProductRequirements from './ProductRequirements';
import VideoModal from '../VideoModal';
import { products } from '../../data/products';

export default function ProductPage() {
  const { productId } = useParams();
  const [showVideo, setShowVideo] = useState(false);
  
  const product = productId ? products[productId as keyof typeof products] : null;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Product not found</h2>
          <Link to="/" className="text-orange-400 hover:text-orange-300">Return home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ProductHeader
          name={product.name}
          description={product.description}
          videoUrl={product.videoUrl}
          onWatchVideo={() => setShowVideo(true)}
        />

        <ProductStatus status="undetected" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Features & Gallery */}
          <div className="lg:col-span-2 space-y-8">
            <ProductFeatures features={product.featureCategories} />
            <ProductGallery images={product.images} />
          </div>

          {/* Right Column - Pricing & Requirements */}
          <div className="space-y-8">
            <ProductPricing 
              productId={product.id}
              productName={product.name}
              pricing={product.pricing} 
            />
            <ProductRequirements requirements={product.systemRequirements} />
          </div>
        </div>
      </div>

      {showVideo && (
        <VideoModal
          isOpen={showVideo}
          onClose={() => setShowVideo(false)}
          videoUrl={product.videoUrl}
        />
      )}
    </div>
  );
}