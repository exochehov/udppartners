import { db } from '../config/database.js';
import { logger } from '../utils/logger.js';

export class Product {
  static async create(data) {
    const {
      categoryId,
      name,
      description,
      features,
      requirements,
      pricing
    } = data;

    const query = `
      INSERT INTO products (
        id, category_id, type, name, description, features, requirements, pricing
      ) VALUES (
        lower(replace(?, ' ', '-')),
        ?, 'game', ?, ?, ?, ?, ?
      )
    `;

    try {
      return await db.run(query, [
        name,
        categoryId,
        name,
        description,
        JSON.stringify(features),
        JSON.stringify(requirements),
        JSON.stringify(pricing)
      ]);
    } catch (error) {
      logger.error('Error creating product:', error);
      throw error;
    }
  }

  static async getByCategory(categoryId) {
    const query = `
      SELECT p.*, c.name as category_name
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.category_id = ?
      ORDER BY p.name ASC
    `;

    try {
      return await db.all(query, [categoryId]);
    } catch (error) {
      logger.error('Error fetching products by category:', error);
      throw error;
    }
  }

  static async update(id, data) {
    const {
      name,
      description,
      features,
      requirements,
      pricing
    } = data;

    const query = `
      UPDATE products 
      SET name = ?, description = ?, features = ?, requirements = ?, pricing = ?
      WHERE id = ?
    `;

    try {
      return await db.run(query, [
        name,
        description,
        JSON.stringify(features),
        JSON.stringify(requirements),
        JSON.stringify(pricing),
        id
      ]);
    } catch (error) {
      logger.error('Error updating product:', error);
      throw error;
    }
  }
}