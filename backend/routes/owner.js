const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { verifyToken, requireRole } = require('../middlewares/auth');

// Dashboard: user list & avg rating
router.get('/dashboard', verifyToken, requireRole(['store_owner']), async (req, res) => {
  const ownerId = req.user.id;
  const [store] = await pool.query('SELECT id FROM stores WHERE owner_id=?', [ownerId]);
  if (!store.length) return res.status(404).json({ msg: 'No store found' });
  const storeId = store[0].id;

  const [ratings] = await pool.query(
    'SELECT u.id, u.name, r.rating FROM ratings r JOIN users u ON r.user_id=u.id WHERE r.store_id=?',
    [storeId]
  );
  const avg = ratings.reduce((sum, r) => sum + r.rating, 0) / (ratings.length||1);

  res.json({ users: ratings, avgRating: avg });
});

module.exports = router;
