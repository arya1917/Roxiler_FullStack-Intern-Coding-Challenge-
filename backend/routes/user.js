const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { verifyToken, requireRole } = require('../middlewares/auth');

// List/Search stores
router.get('/stores', verifyToken, requireRole(['user']), async (req, res) => {
    const { name, address } = req.query;
    let sql = 'SELECT s.id, s.name, s.address, IFNULL(AVG(r.rating),0) AS avgRating, ' +
              '(SELECT rating FROM ratings WHERE user_id=? AND store_id=s.id) AS userRating ' +
              'FROM stores s LEFT JOIN ratings r ON s.id=r.store_id';
    const params = [req.user.id];
    if (name) { sql += ' WHERE s.name LIKE ?'; params.push(`%${name}%`); }
    if (address) { sql += name ? ' AND s.address LIKE ?' : ' WHERE s.address LIKE ?'; params.push(`%${address}%`); }
    sql += ' GROUP BY s.id';
    const [stores] = await pool.query(sql, params);
    res.json(stores);
  });
  
  // Submit/Update rating
  router.post('/stores/:id/rate', verifyToken, requireRole(['user']), async (req, res) => {
    const userId = req.user.id;
    const storeId = req.params.id;
    const { rating } = req.body;
    await pool.query(
      'INSERT INTO ratings (user_id, store_id, rating) VALUES (?,?,?) ON DUPLICATE KEY UPDATE rating=?',
      [userId, storeId, rating, rating]
    );
    res.json({ msg: 'Rating submitted' });
  });
  
  module.exports = router;
  