import { Product } from '../models/Product.js';
import { formatPrice, formatPeriod } from '../utils/formatters.js';

export const handlePricing = async (bot, msg) => {
  const chatId = msg.chat.id;
  
  try {
    const products = await Product.getAll();
    
    if (products.length === 0) {
      await bot.sendMessage(chatId, 'No products found.');
      return;
    }

    const keyboard = products.map(product => ([{
      text: product.name,
      callback_data: `pricing_${product.id}`
    }]));

    await bot.sendMessage(
      chatId,
      'Select a product to manage pricing:',
      { reply_markup: { inline_keyboard: keyboard } }
    );
  } catch (error) {
    console.error('Error handling pricing:', error);
    await bot.sendMessage(chatId, 'Failed to fetch products.');
  }
};

export const handlePricingUpdate = async (bot, chatId, productId) => {
  try {
    const product = await Product.getById(productId);
    
    if (!product) {
      await bot.sendMessage(chatId, 'Product not found.');
      return;
    }

    const currentPricing = JSON.parse(product.pricing);
    const pricingMessage = Object.entries(currentPricing)
      .map(([period, price]) => `${formatPeriod(period)}: ${formatPrice(price)}`)
      .join('\n');

    await bot.sendMessage(
      chatId,
      `Current pricing for ${product.name}:\n\n${pricingMessage}\n\n` +
      'To update pricing, send new prices in the format:\n' +
      '2h:1,day:6,week:25,month:50\n\n' +
      'Or click Cancel to go back.',
      {
        reply_markup: {
          inline_keyboard: [[
            { text: 'Cancel', callback_data: 'pricing_cancel' }
          ]]
        }
      }
    );

    // Store product ID in context for the next message
    bot.context = { ...bot.context, updatingPricing: productId };
  } catch (error) {
    console.error('Error handling pricing update:', error);
    await bot.sendMessage(chatId, 'Failed to prepare pricing update.');
  }
};

export const processPricingUpdate = async (bot, msg) => {
  const chatId = msg.chat.id;
  const productId = bot.context?.updatingPricing;

  if (!productId) {
    await bot.sendMessage(chatId, 'No product selected for pricing update.');
    return;
  }

  try {
    const pricing = parsePricingInput(msg.text);
    await Product.updatePricing(productId, pricing);

    await bot.sendMessage(
      chatId,
      'Pricing updated successfully!',
      { reply_markup: { remove_keyboard: true } }
    );

    // Clear context
    delete bot.context.updatingPricing;
  } catch (error) {
    await bot.sendMessage(
      chatId,
      `Failed to update pricing: ${error.message}`
    );
  }
};

function parsePricingInput(input) {
  const pricing = {};
  const pairs = input.split(',');

  for (const pair of pairs) {
    const [period, price] = pair.split(':').map(s => s.trim());
    
    if (!['2h', 'day', 'week', 'month'].includes(period)) {
      throw new Error(`Invalid period: ${period}`);
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      throw new Error(`Invalid price for ${period}: ${price}`);
    }

    pricing[period] = priceNum;
  }

  return pricing;
}