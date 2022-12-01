const pool = require('../utils/pool');

class Reviews {
  id;
  user_id;
  restaurant_id;
  stars;
  detail;

  constructor(row) {
    this.id = row.id;
    this.user_id = row.user_id;
    this.restaurant_id = row.restaurant_id;
    this.stars = row.stars;
    this.detail = row.detail;
  }

  static async insertReview ({ restaurantId, userId, stars, detail }) {
    const { rows } = await pool.query(`
      INSERT INTO reviews (restaurant_id, user_id, stars, detail)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [restaurantId, userId, stars, detail]);

    return new Reviews(rows[0]);
  }

  static async getReviewById(id) {
    
    const { rows } = await pool.query(`
  SELECT * from reviews WHERE id = $1`,
    [id]
    );
    if (!rows[0]) return null;
    return new Reviews(rows[0]);
  }

  static async deleteReview(id) {
    const { rows } = await pool.query(`
  DELETE FROM reviews WHERE id = $1 RETURNING *`,
    [id]
    );
    return new Reviews(rows[0]);
  }

}


module.exports = { Reviews };
