import { Translation } from '../models/Translation.js';
import { formatLanguageCode } from '../utils/formatters.js';

export const handleTranslation = async (bot, msg) => {
  const chatId = msg.chat.id;
  
  const keyboard = {
    inline_keyboard: [
      [
        { text: 'Add Translation', callback_data: 'translation_add' },
        { text: 'Edit Translation', callback_data: 'translation_edit' }
      ],
      [
        { text: 'List Missing', callback_data: 'translation_missing' },
        { text: 'Export All', callback_data: 'translation_export' }
      ]
    ]
  };

  await bot.sendMessage(
    chatId,
    'Translation Management:\nSelect an action to manage website translations.',
    { reply_markup: keyboard }
  );
};

export const handleTranslationAdd = async (bot, chatId) => {
  const languages = ['en', 'ru'];
  const keyboard = languages.map(lang => ([{
    text: formatLanguageCode(lang),
    callback_data: `translation_lang_${lang}`
  }]));

  await bot.sendMessage(
    chatId,
    'Select language for new translation:',
    { reply_markup: { inline_keyboard: keyboard } }
  );
};

export const handleTranslationEdit = async (bot, chatId, langCode) => {
  try {
    const translations = await Translation.getByLanguage(langCode);
    const message = translations.length > 0
      ? `Current translations for ${formatLanguageCode(langCode)}:\n\n` +
        translations.map(t => `${t.key}: ${t.value}`).join('\n')
      : `No translations found for ${formatLanguageCode(langCode)}`;

    await bot.sendMessage(
      chatId,
      message + '\n\nTo add/edit translations, send them in format:\n' +
      'key: translation_text\n\nMultiple translations can be sent, one per line.',
      {
        reply_markup: {
          inline_keyboard: [[
            { text: 'Cancel', callback_data: 'translation_cancel' }
          ]]
        }
      }
    );

    // Store language in context for next message
    bot.context = { ...bot.context, editingTranslations: langCode };
  } catch (error) {
    console.error('Error handling translation edit:', error);
    await bot.sendMessage(chatId, 'Failed to prepare translation edit.');
  }
};

export const processTranslationUpdate = async (bot, msg) => {
  const chatId = msg.chat.id;
  const langCode = bot.context?.editingTranslations;

  if (!langCode) {
    await bot.sendMessage(chatId, 'No language selected for translation update.');
    return;
  }

  try {
    const translations = parseTranslations(msg.text);
    await Translation.updateMultiple(langCode, translations);

    await bot.sendMessage(
      chatId,
      'Translations updated successfully!',
      { reply_markup: { remove_keyboard: true } }
    );

    // Clear context
    delete bot.context.editingTranslations;
  } catch (error) {
    await bot.sendMessage(
      chatId,
      `Failed to update translations: ${error.message}`
    );
  }
};

function parseTranslations(text) {
  const translations = {};
  const lines = text.split('\n').filter(line => line.trim());

  for (const line of lines) {
    const [key, ...valueParts] = line.split(':');
    const value = valueParts.join(':').trim();

    if (!key || !value) {
      throw new Error('Invalid translation format');
    }

    translations[key.trim()] = value;
  }

  return translations;
}