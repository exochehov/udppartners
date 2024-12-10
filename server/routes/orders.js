import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Get user orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findByUser(req.user.userId);
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create order
router.post('/', async (req, res) => {
  try {
    const { product, period, price } = req.body;
    const order = await Order.create({
      userId: req.user.userId,
      product,
      period,
      price
    });
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order status
router.patch('/:id', async (req, res) => {
  try {
    const { status, licenseKey } = req.body;
    const order = await Order.updateStatus(req.params.id, status, licenseKey);
    res.json(order);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;