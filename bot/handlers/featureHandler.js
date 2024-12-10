import { Feature } from '../models/Feature.js';

export const handleFeature = async (bot, msg) => {
  const chatId = msg.chat.id;
  const message = 'Select feature management action:';
  
  const keyboard = {
    inline_keyboard: [
      [
        { text: 'Add Feature', callback_data: 'feature_add' },
        { text: 'List Features', callback_data: 'feature_list' }
      ],
      [
        { text: 'Edit Feature', callback_data: 'feature_edit' },
        { text: 'Delete Feature', callback_data: 'feature_delete' }
      ]
    ]
  };

  await bot.sendMessage(chatId, message, { reply_markup: keyboard });
};

export const handleFeatureAdd = async (bot, chatId) => {
  await bot.sendMessage(
    chatId,
    'Please send the feature details in the following format:\n\n' +
    'Category: category_name\n' +
    'Name: feature_name\n' +
    'Description: feature_description'
  );
};

export const handleFeatureList = async (bot, chatId) => {
  try {
    const features = await Feature.getAll();
    
    if (features.length === 0) {
      await bot.sendMessage(chatId, 'No features found.');
      return;
    }

    const message = features
      .reduce((acc, feature) => {
        if (!acc[feature.category]) {
          acc[feature.category] = [];
        }
        acc[feature.category].push(`- ${feature.name}: ${feature.description}`);
        return acc;
      }, {});

    const formattedMessage = Object.entries(message)
      .map(([category, features]) => (
        `*${category}*\n${features.join('\n')}`
      ))
      .join('\n\n');

    await bot.sendMessage(chatId, formattedMessage, { parse_mode: 'Markdown' });
  } catch (error) {
    console.error('Error listing features:', error);
    await bot.sendMessage(chatId, 'Failed to list features.');
  }
};