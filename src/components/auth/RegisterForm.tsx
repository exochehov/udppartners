import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, User, Loader } from 'lucide-react';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Basic validation
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }
      if (!email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }
      if (username.length < 3) {
        throw new Error('Username must be at least 3 characters long');
      }

      await register(email, username, password);
      toast.success('Successfully registered!');
      navigate('/');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-black/50 p-8 rounded-xl border border-purple-500/20"
      >
        <div className="text-center">
          <Shield className="mx-auto h-12 w-12 text-purple-500" />
          <h2 className="mt-6 text-3xl font-bold text-white">Create account</h2>
          <p className="mt-2 text-sm text-gray-400">Join our community</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg 
                           bg-black/30 text-white placeholder-gray-500 focus:outline-none 
                           focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  placeholder="Username"
                  minLength={3}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg 
                           bg-black/30 text-white placeholder-gray-500 focus:outline-none 
                           focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  placeholder="Email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg 
                           bg-black/30 text-white placeholder-gray-500 focus:outline-none 
                           focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  placeholder="Password"
                  minLength={6}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg
                     text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 
                     focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <Loader className="h-5 w-5 animate-spin" />
            ) : (
              'Create account'
            )}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              Already have an account? Sign in
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}