import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { isAdmin } from './middleware/authMiddleware.js';
import { handleStart } from './handlers/startHandler.js';
import { handleStatus, handleStatusUpdate, updateProductStatus } from './handlers/statusHandler.js';
import { handleCallback } from './handlers/callbackHandler.js';
import { handleAddProduct, handleProductInput } from './handlers/productHandler.js';
import { handleGallery, handleGalleryView, handleGalleryAction } from './handlers/imageGalleryHandler.js';
import { handleTranslation } from './handlers/translationHandler.js';
import { handlePricing } from './handlers/pricingHandler.js';
import { handleFeature } from './handlers/featureHandler.js';

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// Command handlers
bot.onText(/\/start/, handleStart);
bot.onText(/\/status/, (msg) => isAdmin(msg, () => handleStatus(bot, msg)));
bot.onText(/\/addproduct/, (msg) => isAdmin(msg, () => handleAddProduct(bot, msg)));
bot.onText(/\/gallery/, (msg) => isAdmin(msg, () => handleGallery(bot, msg)));
bot.onText(/\/translations/, (msg) => isAdmin(msg, () => handleTranslation(bot, msg)));
bot.onText(/\/pricing/, (msg) => isAdmin(msg, () => handlePricing(bot, msg)));
bot.onText(/\/features/, (msg) => isAdmin(msg, () => handleFeature(bot, msg)));

// Callback query handler
bot.on('callback_query', async (query) => {
  try {
    await handleCallback(bot, query);
  } catch (error) {
    console.error('Error handling callback:', error);
    await bot.answerCallbackQuery(query.id, {
      text: 'An error occurred',
      show_alert: true
    });
  }
});

// Photo handler for gallery
bot.on('photo', async (msg) => {
  if (!isAdmin(msg)) return;

  const productId = bot.context?.addingGalleryImages;
  if (!productId) {
    await bot.sendMessage(msg.chat.id, 'No product selected for adding images.');
    return;
  }

  try {
    const imagePath = await handleImage(bot, msg);
    if (imagePath) {
      await ProductImage.create({
        productId,
        imagePath,
        isPrimary: false
      });
    }
  } catch (error) {
    console.error('Error handling photo:', error);
    await bot.sendMessage(msg.chat.id, 'Failed to process photo.');
  }
});

// Error handler
bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});

console.log('Bot started successfully!');