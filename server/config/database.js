import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, '../../database.sqlite');
const db = new Database(dbPath);

export const initDatabase = () => {
  db.pragma('foreign_keys = ON');

  db.exec(`
    CREATE TABLE IF NOT EXISTS game_categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      icon TEXT NOT NULL,
      order_index INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS games (
      id TEXT PRIMARY KEY,
      category_id TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      status TEXT DEFAULT 'undetected',
      last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES game_categories(id)
    );

    CREATE TABLE IF NOT EXISTS game_features (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      game_id TEXT NOT NULL,
      category TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (game_id) REFERENCES games(id)
    );

    CREATE TABLE IF NOT EXISTS game_requirements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      game_id TEXT NOT NULL,
      requirement TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (game_id) REFERENCES games(id)
    );

    CREATE TABLE IF NOT EXISTS game_pricing (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      game_id TEXT NOT NULL,
      period TEXT NOT NULL,
      price REAL NOT NULL,
      button_id TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (game_id) REFERENCES games(id)
    );

    CREATE TABLE IF NOT EXISTS game_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      game_id TEXT NOT NULL,
      image_path TEXT NOT NULL,
      is_primary BOOLEAN DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (game_id) REFERENCES games(id)
    );

    -- Insert default game categories if they don't exist
    INSERT OR IGNORE INTO game_categories (id, name, description, icon, order_index) VALUES
    ('fps', 'FPS Games', 'First-person shooter games', 'Target', 1),
    ('battle-royale', 'Battle Royale', 'Battle royale games', 'Crosshair', 2),
    ('survival', 'Survival Games', 'Survival games', 'Shield', 3),
    ('mmo', 'MMO Games', 'Massively multiplayer online games', 'Users', 4);

    -- Insert default games if they don't exist
    INSERT OR IGNORE INTO games (id, category_id, name, description, status) VALUES
    ('eft', 'fps', 'Escape from Tarkov', 'Premium external cheat for Escape from Tarkov', 'undetected'),
    ('apex', 'battle-royale', 'Apex Legends', 'Advanced external cheat for Apex Legends', 'testing'),
    ('rust', 'survival', 'Rust', 'Premium cheat for Rust with advanced features', 'undetected'),
    ('fortnite', 'battle-royale', 'Fortnite', 'Coming soon', 'closed');
  `);
};

export const query = (sql, params = []) => {
  return db.prepare(sql).run(params);
};

export const get = (sql, params = []) => {
  return db.prepare(sql).get(params);
};

export const all = (sql, params = []) => {
  return db.prepare(sql).all(params);
};

initDatabase();

export { db };