import { db } from '../config/database.js';
import { logger } from '../utils/logger.js';

export class Category {
  static async getAll() {
    const query = `
      SELECT * FROM categories
      ORDER BY name ASC
    `;

    try {
      return await db.all(query);
    } catch (error) {
      logger.error('Error fetching categories:', error);
      throw error;
    }
  }

  static async getById(id) {
    const query = `
      SELECT * FROM categories
      WHERE id = ?
    `;

    try {
      return await db.get(query, [id]);
    } catch (error) {
      logger.error('Error fetching category:', error);
      throw error;
    }
  }

  static async create({ id, name, description, icon }) {
    const query = `
      INSERT INTO categories (id, name, description, icon)
      VALUES (?, ?, ?, ?)
    `;

    try {
      return await db.run(query, [id, name, description, icon]);
    } catch (error) {
      logger.error('Error creating category:', error);
      throw error;
    }
  }

  static async update(id, { name, description, icon }) {
    const query = `
      UPDATE categories
      SET name = ?, description = ?, icon = ?
      WHERE id = ?
    `;

    try {
      return await db.run(query, [name, description, icon, id]);
    } catch (error) {
      logger.error('Error updating category:', error);
      throw error;
    }
  }
}