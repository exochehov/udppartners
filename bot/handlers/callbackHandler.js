import { handleStatusUpdate, updateProductStatus } from './statusHandler.js';

export const handleCallback = async (bot, query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data.startsWith('status_')) {
    const productId = data.split('_')[1];
    await handleStatusUpdate(bot, chatId, productId);
  }
  else if (data.startsWith('update_status_')) {
    const [, , productId, newStatus] = data.split('_');
    await updateProductStatus(bot, chatId, productId, newStatus);
  }
  else {
    switch (data) {
      case 'new_product_cheat':
        await handleNewCheat(bot, chatId);
        break;
      case 'new_product_spoofer':
        await handleNewSpoofer(bot, chatId);
        break;
      default:
        await bot.sendMessage(chatId, 'Unknown command');
    }
  }
  
  // Answer callback query to remove loading state
  await bot.answerCallbackQuery(query.id);
};

async function handleNewCheat(bot, chatId) {
  const message = 'Please provide the following information for the new cheat:\n\n' +
                 '1. Name\n' +
                 '2. Description\n' +
                 '3. Features (one per line)\n' +
                 '4. System Requirements\n' +
                 '5. Pricing (format: period:price, e.g. "2h:1,day:6")';
                 
  await bot.sendMessage(chatId, message);
}

async function handleNewSpoofer(bot, chatId) {
  const message = 'Please provide the following information for the new spoofer:\n\n' +
                 '1. Name\n' +
                 '2. Description\n' +
                 '3. Supported Platforms\n' +
                 '4. System Requirements\n' +
                 '5. Pricing (format: period:price, e.g. "day:4,week:10")';
                 
  await bot.sendMessage(chatId, message);
}