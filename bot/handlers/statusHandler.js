import { ProductStatus } from '../models/ProductStatus.js';
import { formatDate } from '../utils/formatters.js';

export const handleStatus = async (bot, msg) => {
  const chatId = msg.chat.id;
  
  try {
    const products = await ProductStatus.getAllProducts();
    
    if (products.length === 0) {
      await bot.sendMessage(chatId, 'No products found.');
      return;
    }

    const statusMessage = products.map(product => (
      `${product.name}\n` +
      `Status: ${product.status}\n` +
      `Last Updated: ${formatDate(product.last_updated)}\n`
    )).join('\n');

    const keyboard = products.map(product => ([{
      text: `Update ${product.name}`,
      callback_data: `status_${product.id}`
    }]));

    await bot.sendMessage(chatId, statusMessage, {
      reply_markup: {
        inline_keyboard: keyboard
      },
      parse_mode: 'HTML'
    });
  } catch (error) {
    console.error('Error handling status:', error);
    await bot.sendMessage(chatId, 'Failed to fetch product statuses.');
  }
};

export const handleStatusUpdate = async (bot, chatId, productId) => {
  try {
    const product = await ProductStatus.getProduct(productId);
    
    if (!product) {
      await bot.sendMessage(chatId, 'Product not found.');
      return;
    }

    const statuses = [
      { label: '✅ Undetected', value: 'undetected' },
      { label: '⚠️ Detected', value: 'detected' },
      { label: '🔄 Updating', value: 'updating' },
      { label: '🧪 Testing', value: 'testing' },
      { label: '🔒 Closed', value: 'closed' }
    ];

    const keyboard = statuses.map(status => ([{
      text: status.label,
      callback_data: `update_status_${productId}_${status.value}`
    }]));

    await bot.sendMessage(
      chatId,
      `Current status of ${product.name}: ${product.status}\n\nSelect new status:`,
      {
        reply_markup: {
          inline_keyboard: keyboard
        }
      }
    );
  } catch (error) {
    console.error('Error handling status update:', error);
    await bot.sendMessage(chatId, 'Failed to prepare status update.');
  }
};

export const updateProductStatus = async (bot, chatId, productId, newStatus) => {
  try {
    const product = await ProductStatus.getProduct(productId);
    
    if (!product) {
      await bot.sendMessage(chatId, 'Product not found.');
      return;
    }

    await ProductStatus.updateStatus(productId, newStatus);
    
    const statusEmoji = {
      undetected: '✅',
      detected: '⚠️',
      updating: '🔄',
      testing: '🧪',
      closed: '🔒'
    };

    const message = 
      `Status updated successfully!\n\n` +
      `Product: ${product.name}\n` +
      `New Status: ${statusEmoji[newStatus]} ${newStatus}\n` +
      `Updated: ${formatDate(new Date())}`;

    await bot.sendMessage(chatId, message);
  } catch (error) {
    console.error('Error updating status:', error);
    await bot.sendMessage(chatId, 'Failed to update status. Please try again.');
  }
};