import express from 'express';
import { Game } from '../models/Game.js';

const router = express.Router();

// Get all games
router.get('/', (req, res) => {
  try {
    const games = Game.getAll();
    res.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get game by ID
router.get('/:id', (req, res) => {
  try {
    const game = Game.getById(req.params.id);
    
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    
    res.json(game);
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update game status
router.patch('/:id/status', (req, res) => {
  const { status } = req.body;
  
  try {
    Game.updateStatus(req.params.id, status);
    res.json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating game status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;