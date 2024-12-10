import { ProductImage } from '../models/ProductImage.js';
import { handleImage } from './imageHandler.js';

export const handleGallery = async (bot, msg) => {
  const chatId = msg.chat.id;
  
  try {
    const products = await ProductImage.getProductsWithImages();
    
    if (products.length === 0) {
      await bot.sendMessage(chatId, 'No products found.');
      return;
    }

    const keyboard = products.map(product => ([{
      text: product.name,
      callback_data: `gallery_${product.id}`
    }]));

    await bot.sendMessage(
      chatId,
      'Select a product to manage images:',
      { reply_markup: { inline_keyboard: keyboard } }
    );
  } catch (error) {
    console.error('Error handling gallery:', error);
    await bot.sendMessage(chatId, 'Failed to fetch products.');
  }
};

export const handleGalleryView = async (bot, chatId, productId) => {
  try {
    const images = await ProductImage.getByProduct(productId);
    const product = await ProductImage.getProduct(productId);

    if (!product) {
      await bot.sendMessage(chatId, 'Product not found.');
      return;
    }

    if (images.length === 0) {
      await bot.sendMessage(
        chatId,
        `No images found for ${product.name}.\n\nSend images to add them to the gallery.`,
        {
          reply_markup: {
            inline_keyboard: [[
              { text: 'Back', callback_data: 'gallery_back' }
            ]]
          }
        }
      );
      return;
    }

    // Send each image with management options
    for (const image of images) {
      const keyboard = [
        [
          { 
            text: image.is_primary ? '★ Primary' : 'Set as Primary',
            callback_data: `gallery_primary_${image.id}`
          },
          {
            text: '🗑 Delete',
            callback_data: `gallery_delete_${image.id}`
          }
        ]
      ];

      await bot.sendPhoto(chatId, image.image_path, {
        caption: `Image ID: ${image.id}${image.is_primary ? ' (Primary)' : ''}`,
        reply_markup: { inline_keyboard: keyboard }
      });
    }
  } catch (error) {
    console.error('Error handling gallery view:', error);
    await bot.sendMessage(chatId, 'Failed to load gallery.');
  }
};

export const handleGalleryAction = async (bot, query) => {
  const chatId = query.message.chat.id;
  const [action, imageId] = query.data.split('_').slice(1);

  try {
    switch (action) {
      case 'primary':
        await ProductImage.setPrimary(imageId);
        await bot.answerCallbackQuery(query.id, { text: 'Set as primary image' });
        break;
      
      case 'delete':
        await ProductImage.delete(imageId);
        await bot.deleteMessage(chatId, query.message.message_id);
        await bot.answerCallbackQuery(query.id, { text: 'Image deleted' });
        break;
    }
  } catch (error) {
    console.error('Error handling gallery action:', error);
    await bot.answerCallbackQuery(query.id, { 
      text: 'Failed to process action',
      show_alert: true
    });
  }
};