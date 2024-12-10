import { get, all } from '../config/database.js';

class Product {
  static async findAll() {
    const products = await all('SELECT * FROM products');
    const pricing = await all('SELECT * FROM product_pricing');
    
    return products.map(product => ({
      ...product,
      pricing: pricing
        .filter(price => price.product_id === product.id)
        .map(({ period, price, sellsn_button_id }) => ({
          period,
          price,
          sellsn_button_id
        }))
    }));
  }

  static async findById(id) {
    const product = await get('SELECT * FROM products WHERE id = ?', [id]);
    if (!product) return null;

    const pricing = await all(
      'SELECT period, price, sellsn_button_id FROM product_pricing WHERE product_id = ?',
      [id]
    );

    return {
      ...product,
      pricing: pricing.map(({ period, price, sellsn_button_id }) => ({
        period,
        price,
        sellsn_button_id
      }))
    };
  }
}

export default Product;