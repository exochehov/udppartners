export const commands = [
  {
    command: 'start',
    description: 'Start the bot'
  },
  {
    command: 'status',
    description: 'View and update product statuses'
  },
  {
    command: 'addproduct',
    description: 'Add a new product'
  },
  {
    command: 'gallery',
    description: 'Manage product images'
  },
  {
    command: 'translations',
    description: 'Manage website translations'
  },
  {
    command: 'pricing',
    description: 'Manage product pricing'
  },
  {
    command: 'features',
    description: 'Manage product features'
  }
];

export const setupCommands = async (bot) => {
  try {
    await bot.setMyCommands(commands);
    console.log('Bot commands set up successfully');
  } catch (error) {
    console.error('Error setting up bot commands:', error);
  }
};