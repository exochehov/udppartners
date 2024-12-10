export const handleStart = (msg) => {
  const chatId = msg.chat.id;
  const message = `Welcome to UDP Gaming Admin Bot!\n\nAvailable commands:\n/addproduct - Add new product\n/editproduct - Edit existing product\n/status - View products status`;
  
  bot.sendMessage(chatId, message);
};