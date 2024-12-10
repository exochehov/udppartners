import { Product } from '../models/Product.js';
import { Category } from '../models/Category.js';
import { validateProduct } from '../utils/validators.js';
import { logger } from '../utils/logger.js';

export const handleAddProduct = async (bot, msg) => {
  const chatId = msg.chat.id;
  
  try {
    const categories = await Category.getAll();
    
    const keyboard = categories.map(category => ([{
      text: category.name,
      callback_data: `new_product_category_${category.id}`
    }]));

    await bot.sendMessage(
      chatId,
      'Select game category for the new product:',
      { reply_markup: { inline_keyboard: keyboard } }
    );
  } catch (error) {
    logger.error('Error handling add product:', error);
    await bot.sendMessage(chatId, 'Failed to load categories.');
  }
};

export const handleCategorySelect = async (bot, chatId, categoryId) => {
  try {
    const category = await Category.getById(categoryId);
    
    if (!category) {
      await bot.sendMessage(chatId, 'Category not found.');
      return;
    }

    const message = 
      `Selected category: ${category.name}\n\n` +
      'Please provide the product details in the following format:\n\n' +
      'Name: Product Name\n' +
      'Description: Product description\n' +
      'Features: feature1, feature2, feature3\n' +
      'Requirements: req1, req2, req3\n' +
      'Pricing: 2h:1,day:6,week:25,month:50';

    // Store category in context for the next message
    bot.context = { ...bot.context, addingProduct: { categoryId } };

    await bot.sendMessage(chatId, message);
  } catch (error) {
    logger.error('Error handling category select:', error);
    await bot.sendMessage(chatId, 'Failed to process category selection.');
  }
};

export const handleProductInput = async (bot, msg) => {
  const chatId = msg.chat.id;
  const context = bot.context?.addingProduct;

  if (!context?.categoryId) {
    await bot.sendMessage(chatId, 'No category selected. Please start over with /addproduct');
    return;
  }

  try {
    const productData = parseProductInput(msg.text);
    productData.categoryId = context.categoryId;

    const validationResult = validateProduct(productData);
    if (!validationResult.isValid) {
      throw new Error(validationResult.errors.join('\n'));
    }

    await Product.create(productData);
    
    await bot.sendMessage(
      chatId,
      `Product "${productData.name}" has been created successfully!\n\n` +
      'You can now add images using /gallery command.'
    );

    // Clear context
    delete bot.context.addingProduct;
  } catch (error) {
    logger.error('Error creating product:', error);
    await bot.sendMessage(
      chatId,
      `Failed to create product: ${error.message}\n\nPlease try again.`
    );
  }
};

function parseProductInput(text) {
  const lines = text.split('\n');
  const data = {};

  for (const line of lines) {
    const [key, ...valueParts] = line.split(':');
    const value = valueParts.join(':').trim();

    switch (key.trim().toLowerCase()) {
      case 'name':
        data.name = value;
        break;
      case 'description':
        data.description = value;
        break;
      case 'features':
        data.features = value.split(',').map(f => f.trim());
        break;
      case 'requirements':
        data.requirements = value.split(',').map(r => r.trim());
        break;
      case 'pricing':
        data.pricing = parsePricing(value);
        break;
    }
  }

  return data;
}

function parsePricing(pricingStr) {
  const pricing = {};
  const pairs = pricingStr.split(',');

  for (const pair of pairs) {
    const [period, price] = pair.split(':').map(s => s.trim());
    pricing[period] = parseFloat(price);
  }

  return pricing;
}