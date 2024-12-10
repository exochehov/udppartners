import express from 'express';
import { db } from '../config/database.js';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await db.prepare(`
      SELECT p.*, 
             GROUP_CONCAT(CASE WHEN pi.is_primary = 1 THEN pi.image_path END) as primary_image,
             GROUP_CONCAT(pi.image_path) as images
      FROM products p
      LEFT JOIN product_images pi ON p.id = pi.product_id
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `).all();
    
    res.json(products.map(formatProduct));
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get product status
router.get('/status', async (req, res) => {
  try {
    const statuses = await db.prepare(`
      SELECT id, name, status, last_updated 
      FROM products 
      ORDER BY name ASC
    `).all();
    
    res.json(statuses);
  } catch (error) {
    console.error('Error fetching product statuses:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await db.prepare(`
      SELECT p.*, 
             GROUP_CONCAT(CASE WHEN pi.is_primary = 1 THEN pi.image_path END) as primary_image,
             GROUP_CONCAT(pi.image_path) as images
      FROM products p
      LEFT JOIN product_images pi ON p.id = pi.product_id
      WHERE p.id = ?
      GROUP BY p.id
    `).get(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(formatProduct(product));
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update product status
router.patch('/:id/status', async (req, res) => {
  const { status } = req.body;
  
  try {
    await db.prepare(`
      UPDATE products 
      SET status = ?, last_updated = CURRENT_TIMESTAMP 
      WHERE id = ?
    `).run(status, req.params.id);
    
    res.json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating product status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

function formatProduct(product) {
  return {
    ...product,
    features: JSON.parse(product.features),
    requirements: JSON.parse(product.requirements),
    pricing: JSON.parse(product.pricing),
    images: product.images?.split(',').filter(Boolean) || [],
    primary_image: product.primary_image || null
  };
}

export default router;