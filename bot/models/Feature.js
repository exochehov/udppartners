import { db } from '../config/database.js';

export class Feature {
  static async create({ category, name, description }) {
    const query = `
      INSERT INTO features (category, name, description)
      VALUES (?, ?, ?)
    `;

    try {
      return await db.run(query, [category, name, description]);
    } catch (error) {
      console.error('Error creating feature:', error);
      throw error;
    }
  }

  static async getAll() {
    const query = `
      SELECT * FROM features
      ORDER BY category, name
    `;

    try {
      return await db.all(query);
    } catch (error) {
      console.error('Error fetching features:', error);
      throw error;
    }
  }

  static async update(id, { category, name, description }) {
    const query = `
      UPDATE features
      SET category = ?, name = ?, description = ?
      WHERE id = ?
    `;

    try {
      return await db.run(query, [category, name, description, id]);
    } catch (error) {
      console.error('Error updating feature:', error);
      throw error;
    }
  }

  static async delete(id) {
    const query = `
      DELETE FROM features
      WHERE id = ?
    `;

    try {
      return await db.run(query, [id]);
    } catch (error) {
      console.error('Error deleting feature:', error);
      throw error;
    }
  }
}