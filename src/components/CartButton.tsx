import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import CartModal from './CartModal';
import { motion } from 'framer-motion';

export default function CartButton() {
  const [showModal, setShowModal] = useState(false);
  const { items } = useCart();

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="relative p-2 text-gray-400 hover:text-white transition-colors"
      >
        <ShoppingCart className="w-6 h-6" />
        {items.length > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full
                     flex items-center justify-center text-xs text-white font-medium"
          >
            {items.length}
          </motion.div>
        )}
      </button>

      <CartModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}