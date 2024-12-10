import express from 'express';
import cors from 'cors';
import { initDatabase } from './server/config/database.js';
import authRoutes from './server/routes/auth.js';
import gamesRoutes from './server/routes/games.js';

const app = express();

// Initialize database
try {
  initDatabase();
  console.log('Database initialized successfully');
} catch (error) {
  console.error('Failed to initialize database:', error);
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use('/images', express.static('public/images'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/games', gamesRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});