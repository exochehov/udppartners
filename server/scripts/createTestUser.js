import bcrypt from 'bcryptjs';
import { query } from '../config/database.js';

const createTestUser = async () => {
  const testUser = {
    username: 'test',
    email: 'test@test.com',
    password: 'test123',
    balance: 100.00
  };

  try {
    const hashedPassword = await bcrypt.hash(testUser.password, 10);
    
    query(
      'INSERT OR REPLACE INTO users (username, email, password, balance) VALUES (?, ?, ?, ?)',
      [testUser.username, testUser.email, hashedPassword, testUser.balance]
    );

    console.log('Test user created successfully!');
    console.log('Email:', testUser.email);
    console.log('Password:', testUser.password);
  } catch (error) {
    console.error('Error creating test user:', error);
  }
};

createTestUser();