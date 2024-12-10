import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../auth/AuthContext';
import { useCart } from '../cart/CartContext';
import { ShoppingCart, LogOut, User, DollarSign, Clock, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CartModal from '../cart/CartModal';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Order {
  _id: string;
  product: string;
  period: string;
  price: number;
  status: 'pending' | 'completed' | 'failed';
  key?: string;
  createdAt: string;
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const [showCartModal, setShowCartModal] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders');
        setOrders(response.data);
      } catch (error) {
        toast.error('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-dark">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* User Info */}
          <div className="bg-black/50 rounded-xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-purple-600/20">
                  <User className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{user?.username}</h2>
                  <p className="text-gray-400">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Balance */}
            <div className="bg-black/50 rounded-xl p-6 border border-purple-500/20">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-full bg-green-500/20">
                  <DollarSign className="w-6 h-6 text-green-400" />
                </div>
                <span className="text-sm text-gray-400">Balance</span>
              </div>
              <p className="text-3xl font-bold text-white mt-4">
                ${user?.balance.toFixed(2)}
              </p>
            </div>

            {/* Cart */}
            <div 
              className="bg-black/50 rounded-xl p-6 border border-purple-500/20 cursor-pointer hover:border-purple-500/40 transition-colors"
              onClick={() => setShowCartModal(true)}
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-full bg-blue-500/20">
                  <ShoppingCart className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-sm text-gray-400">Cart Items</span>
              </div>
              <p className="text-3xl font-bold text-white mt-4">{items.length}</p>
            </div>

            {/* Total Orders */}
            <div className="bg-black/50 rounded-xl p-6 border border-purple-500/20">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-full bg-purple-500/20">
                  <Package className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-sm text-gray-400">Total Orders</span>
              </div>
              <p className="text-3xl font-bold text-white mt-4">{orders.length}</p>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-black/50 rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-xl font-bold text-white mb-6">Recent Orders</h3>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
              </div>
            ) : orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-white/5 rounded-lg p-4 border border-white/10"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-white font-medium">{order.product}</h4>
                        <p className="text-sm text-gray-400">{order.period}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-400">
                            {formatDate(order.createdAt)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-purple-400">${order.price}</p>
                        <span className={`text-sm ${
                          order.status === 'completed' ? 'text-green-400' :
                          order.status === 'failed' ? 'text-red-400' :
                          'text-yellow-400'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    {order.key && (
                      <div className="mt-2 p-2 bg-purple-500/10 rounded border border-purple-500/20">
                        <p className="text-sm text-purple-400 break-all font-mono">
                          {order.key}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                No orders yet
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <CartModal
        isOpen={showCartModal}
        onClose={() => setShowCartModal(false)}
      />
    </div>
  );
}