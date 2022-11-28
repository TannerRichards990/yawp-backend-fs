const pool = require('../utils/pool');

module.exports = class Restaurant {
  id;
  name;

  constructor({ id, name, reviews }) {
    this.id = id;
    this.name = name;
    if (reviews) this.reviews = reviews.length > 0 ? reviews : [];
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM restaurants');
    return rows.map((row) => new Restaurant(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM restaurants WHERE id=$1',
      [id]
    );
    return new Restaurant(rows[0]);
  }
};
