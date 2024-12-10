const ADMIN_IDS = process.env.TELEGRAM_ADMIN_IDS?.split(',').map(id => parseInt(id)) || [];

export const isAdmin = (msg, next) => {
  const userId = msg.from.id;
  
  if (!ADMIN_IDS.includes(userId)) {
    bot.sendMessage(msg.chat.id, 'You are not authorized to use this command.');
    return;
  }
  
  next();
};