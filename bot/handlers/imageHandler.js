import { promises as fs } from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.join(__dirname, '../../public/images/products');

export const handleImage = async (bot, msg) => {
  const chatId = msg.chat.id;
  
  if (!msg.photo) {
    await bot.sendMessage(chatId, 'Please send an image.');
    return;
  }

  try {
    // Get the largest photo (last in array)
    const photo = msg.photo[msg.photo.length - 1];
    const file = await bot.getFile(photo.file_id);
    const fileName = `${Date.now()}.jpg`;
    const filePath = path.join(IMAGES_DIR, fileName);

    // Ensure directory exists
    await fs.mkdir(IMAGES_DIR, { recursive: true });

    // Download image
    const response = await axios({
      method: 'GET',
      url: `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${file.file_path}`,
      responseType: 'arraybuffer'
    });

    await fs.writeFile(filePath, response.data);

    await bot.sendMessage(
      chatId,
      `Image uploaded successfully!\nPath: /images/products/${fileName}`
    );

    return `/images/products/${fileName}`;
  } catch (error) {
    console.error('Error handling image:', error);
    await bot.sendMessage(chatId, 'Failed to process image. Please try again.');
    return null;
  }
};