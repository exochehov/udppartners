import { products } from '../config/products.js';

const SELLSN_API_URL = 'https://pay.sellsn.io/api';
const STORE_ID = process.env.SELLSN_STORE_ID;

export function getSellSnButtonId(productId, period) {
  return products[productId]?.sellSnButtons?.[period];
}

export function getSellSnPaymentUrl(productId, period) {
  const buttonId = getSellSnButtonId(productId, period);
  if (!buttonId) return null;
  
  return `https://pay.sellsn.io/embed/${STORE_ID}/${buttonId}`;
}