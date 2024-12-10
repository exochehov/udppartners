import { db } from '../config/database.js';

export class ProductStatus {
  static async getAllProducts() {
    const query = `
      SELECT id, name, status, last_updated
      FROM products
      ORDER BY name ASC
    `;
    
    try {
      return await db.all(query);
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
  
  static async getProduct(id) {
    const query = `
      SELECT id, name, status, last_updated
      FROM products
      WHERE id = ?
    `;
    
    try {
      return await db.get(query, [id]);
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }
  
  static async updateStatus(id, status) {
    const query = `
      UPDATE products
      SET status = ?, last_updated = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    
    try {
      return await db.run(query, [status, id]);
    } catch (error) {
      console.error('Error updating status:', error);
      throw error;
    }
  }
}