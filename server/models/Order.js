import { get, all, run } from '../config/database.js';

class Order {
  static async create({ userId, product, period, price }) {
    const result = await run(
      'INSERT INTO orders (user_id, product, period, price) VALUES (?, ?, ?, ?)',
      [userId, product, period, price]
    );
    return this.findById(result.lastID);
  }

  static async findById(id) {
    return get('SELECT * FROM orders WHERE id = ?', [id]);
  }

  static async findByUser(userId) {
    return all(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
  }

  static async updateStatus(orderId, status, licenseKey = null) {
    await run(
      'UPDATE orders SET status = ?, license_key = ? WHERE id = ?',
      [status, licenseKey, orderId]
    );
    return this.findById(orderId);
  }
}

export default Order;