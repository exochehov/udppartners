import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import GameCategories from './components/games/GameCategories';
import PricingNew from './components/PricingNew';
import Footer from './components/Footer';
import NetworkBackground from './components/NetworkBackground';
import GameProvidersPage from './components/providers/GameProvidersPage';
import ProductPage from './components/products/ProductPage';
import StatusPage from './components/status/StatusPage';
import MouseEffect from './components/MouseEffect';

export default function App() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="fixed inset-0 z-0">
        <NetworkBackground />
      </div>
      <MouseEffect />
      <div className="relative z-10">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <GameCategories />
              <Features />
              <PricingNew />
            </>
          } />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/product/:gameId" element={<GameProvidersPage />} />
          <Route path="/product/:gameId/:productId" element={<ProductPage />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}