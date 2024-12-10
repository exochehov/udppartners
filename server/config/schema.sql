-- Users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  balance DECIMAL(10, 2) DEFAULT 0.00,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_username (username)
);

-- Orders table
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  product VARCHAR(50) NOT NULL,
  period VARCHAR(20) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
  license_key TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at)
);

-- Products table
CREATE TABLE products (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  status ENUM('active', 'coming_soon', 'disabled') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product Pricing table
CREATE TABLE product_pricing (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id VARCHAR(50) NOT NULL,
  period VARCHAR(20) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  sellsn_button_id VARCHAR(100),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE KEY unique_product_period (product_id, period)
);

-- Sessions table
CREATE TABLE sessions (
  id VARCHAR(255) PRIMARY KEY,
  user_id INT NOT NULL,
  token VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_token (token),
  INDEX idx_expires_at (expires_at)
);

-- Insert initial products
INSERT INTO products (id, name, description, status) VALUES
('eft-full', 'EFT External', 'Premium external cheat for Escape from Tarkov with advanced features.', 'active'),
('apex', 'Apex External', 'Advanced external cheat for Apex Legends. Currently in development - coming soon!', 'coming_soon'),
('fortnite', 'Fortnite', 'Currently in development. Our team is working hard to bring you the best Fortnite gaming tools.', 'coming_soon');

-- Insert product pricing
INSERT INTO product_pricing (product_id, period, price, sellsn_button_id) VALUES
('eft-full', '2h', 1.00, 'd05a8988-8d23-4465-809c-3c2150e1a3fa'),
('eft-full', 'day', 6.00, 'b87a2bcf-9646-44ea-96fd-3f60bc33765f'),
('eft-full', 'week', 25.00, '7bb05e01-e274-4b8e-bb17-df7148417ab4'),
('eft-full', 'month', 50.00, 'fcb05f39-4d82-4e84-be66-3228348df45b');
