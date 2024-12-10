import { get, run } from '../config/database.js';
import bcrypt from 'bcryptjs';

class User {
  static async findByEmail(email) {
    return get('SELECT * FROM users WHERE email = ?', [email]);
  }

  static async findById(id) {
    return get(
      'SELECT id, username, email, balance, role, created_at FROM users WHERE id = ?',
      [id]
    );
  }

  static async create({ username, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await run(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    return this.findById(result.lastID);
  }

  static async comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
}

export default User;