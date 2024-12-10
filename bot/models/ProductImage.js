import { db } from '../config/database.js';

export class ProductImage {
  static async create({ productId, imagePath, isPrimary = false }) {
    const query = `
      INSERT INTO product_images (product_id, image_path, is_primary)
      VALUES (?, ?, ?)
    `;

    try {
      return await db.run(query, [productId, imagePath, isPrimary ? 1 : 0]);
    } catch (error) {
      console.error('Error creating product image:', error);
      throw error;
    }
  }

  static async getByProduct(productId) {
    const query = `
      SELECT * FROM product_images
      WHERE product_id = ?
      ORDER BY is_primary DESC, created_at DESC
    `;

    try {
      return await db.all(query, [productId]);
    } catch (error) {
      console.error('Error fetching product images:', error);
      throw error;
    }
  }

  static async setPrimary(imageId) {
    const image = await db.get(
      'SELECT product_id FROM product_images WHERE id = ?',
      [imageId]
    );

    if (!image) throw new Error('Image not found');

    const queries = [
      'UPDATE product_images SET is_primary = 0 WHERE product_id = ?',
      'UPDATE product_images SET is_primary = 1 WHERE id = ?'
    ];

    try {
      await db.run('BEGIN TRANSACTION');
      
      for (const query of queries) {
        await db.run(query, query.includes('product_id') ? [image.product_id] : [imageId]);
      }
      
      await db.run('COMMIT');
    } catch (error) {
      await db.run('ROLLBACK');
      throw error;
    }
  }

  static async delete(imageId) {
    const query = 'DELETE FROM product_images WHERE id = ?';

    try {
      return await db.run(query, [imageId]);
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }

  static async getProductsWithImages() {
    const query = `
      SELECT DISTINCT p.id, p.name
      FROM products p
      LEFT JOIN product_images pi ON p.id = pi.product_id
      ORDER BY p.name
    `;

    try {
      return await db.all(query);
    } catch (error) {
      console.error('Error fetching products with images:', error);
      throw error;
    }
  }
}