import { db } from '../config/database.js';

export class Translation {
  static async getByLanguage(langCode) {
    const query = `
      SELECT key, value 
      FROM translations 
      WHERE lang_code = ?
      ORDER BY key
    `;

    try {
      return await db.all(query, [langCode]);
    } catch (error) {
      console.error('Error fetching translations:', error);
      throw error;
    }
  }

  static async updateMultiple(langCode, translations) {
    const query = `
      INSERT OR REPLACE INTO translations (lang_code, key, value)
      VALUES (?, ?, ?)
    `;

    try {
      await db.run('BEGIN TRANSACTION');

      for (const [key, value] of Object.entries(translations)) {
        await db.run(query, [langCode, key, value]);
      }

      await db.run('COMMIT');
    } catch (error) {
      await db.run('ROLLBACK');
      console.error('Error updating translations:', error);
      throw error;
    }
  }

  static async getMissingTranslations(baseLang = 'en') {
    const query = `
      SELECT t1.key, t1.lang_code
      FROM translations t1
      LEFT JOIN translations t2 ON t1.key = t2.key AND t2.lang_code != t1.lang_code
      WHERE t2.key IS NULL AND t1.lang_code = ?
    `;

    try {
      return await db.all(query, [baseLang]);
    } catch (error) {
      console.error('Error fetching missing translations:', error);
      throw error;
    }
  }

  static async exportAll() {
    const query = `
      SELECT lang_code, key, value
      FROM translations
      ORDER BY lang_code, key
    `;

    try {
      const translations = await db.all(query);
      return translations.reduce((acc, { lang_code, key, value }) => {
        if (!acc[lang_code]) {
          acc[lang_code] = {};
        }
        acc[lang_code][key] = value;
        return acc;
      }, {});
    } catch (error) {
      console.error('Error exporting translations:', error);
      throw error;
    }
  }
}