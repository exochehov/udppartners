import { createContext, useContext, useState, ReactNode } from 'react';
import { products } from '../../data/products';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  period: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: string, period: string) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (productId: string, period: string) => {
    const product = products[productId as keyof typeof products];
    const pricing = product.pricing?.find(p => p.period === period);
    
    if (product && pricing) {
      const cartItem: CartItem = {
        id: productId,
        name: product.name,
        price: pricing.price,
        period: period
      };
      setItems(prev => [...prev, cartItem]);
    }
  };

  const removeFromCart = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}