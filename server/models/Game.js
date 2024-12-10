import { db } from '../config/database.js';

export class Game {
  static getAll() {
    const query = `
      SELECT g.*,
             gc.name as category_name,
             gc.icon as category_icon,
             GROUP_CONCAT(DISTINCT gf.name) as features,
             GROUP_CONCAT(DISTINCT gr.requirement) as requirements,
             GROUP_CONCAT(DISTINCT gi.image_path) as images,
             (SELECT image_path FROM game_images WHERE game_id = g.id AND is_primary = 1) as primary_image,
             json_group_array(json_object('period', gp.period, 'price', gp.price, 'button_id', gp.button_id)) as pricing
      FROM games g
      LEFT JOIN game_categories gc ON g.category_id = gc.id
      LEFT JOIN game_features gf ON g.id = gf.game_id
      LEFT JOIN game_requirements gr ON g.id = gr.game_id
      LEFT JOIN game_pricing gp ON g.id = gp.game_id
      LEFT JOIN game_images gi ON g.id = gi.game_id
      GROUP BY g.id
      ORDER BY gc.order_index, g.name
    `;

    return db.prepare(query).all().map(this.formatGame);
  }

  static getById(id) {
    const query = `
      SELECT g.*,
             gc.name as category_name,
             gc.icon as category_icon,
             GROUP_CONCAT(DISTINCT gf.name) as features,
             GROUP_CONCAT(DISTINCT gr.requirement) as requirements,
             GROUP_CONCAT(DISTINCT gi.image_path) as images,
             (SELECT image_path FROM game_images WHERE game_id = g.id AND is_primary = 1) as primary_image,
             json_group_array(json_object('period', gp.period, 'price', gp.price, 'button_id', gp.button_id)) as pricing
      FROM games g
      LEFT JOIN game_categories gc ON g.category_id = gc.id
      LEFT JOIN game_features gf ON g.id = gf.game_id
      LEFT JOIN game_requirements gr ON g.id = gr.game_id
      LEFT JOIN game_pricing gp ON g.id = gp.game_id
      LEFT JOIN game_images gi ON g.id = gi.game_id
      WHERE g.id = ?
      GROUP BY g.id
    `;

    const game = db.prepare(query).get(id);
    return game ? this.formatGame(game) : null;
  }

  static updateStatus(id, status) {
    const query = `
      UPDATE games
      SET status = ?, last_updated = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    return db.prepare(query).run(status, id);
  }

  static formatGame(game) {
    return {
      ...game,
      features: game.features?.split(',').filter(Boolean) || [],
      requirements: game.requirements?.split(',').filter(Boolean) || [],
      images: game.images?.split(',').filter(Boolean) || [],
      pricing: JSON.parse(game.pricing || '[]').filter(p => p.period && p.price)
    };
  }
}