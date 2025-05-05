// controllers/userController.js
const pool = require('../config/db');

exports.listStores = async (req, res) => {
  const userId = req.user.id;
  const { name, address } = req.query;
  try {
    let sql = `
      SELECT s.id, s.name, s.address,
             IFNULL(ROUND(AVG(r.rating),2),0) AS avgRating,
             (SELECT rating FROM ratings WHERE user_id = ? AND store_id = s.id) AS userRating
      FROM stores s
      LEFT JOIN ratings r ON r.store_id = s.id
    `;
    const params = [userId];
    if (name) {
      sql += ' WHERE s.name LIKE ?';
      params.push(`%${name}%`);
    }
    if (address) {
      sql += name ? ' AND s.address LIKE ?' : ' WHERE s.address LIKE ?';
      params.push(`%${address}%`);
    }
    sql += ' GROUP BY s.id';
    const [stores] = await pool.query(sql, params);
    res.json(stores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.rateStore = async (req, res) => {
  const userId = req.user.id;
  const storeId = req.params.id;
  const { rating } = req.body;
  try {
    await pool.query(
      `INSERT INTO ratings (user_id, store_id, rating)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE rating = ?`,
      [userId, storeId, rating, rating]
    );
    res.json({ message: 'Rating submitted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
