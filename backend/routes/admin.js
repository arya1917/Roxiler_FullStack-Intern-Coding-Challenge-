// routes/admin.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { verifyToken, requireRole } = require('../middlewares/auth');

// View all users
router.get('/users', verifyToken, requireRole(['admin']), async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, name, email, role FROM users');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', err });
  }
});

// Delete user
router.delete('/users/:id', verifyToken, requireRole(['admin']), async (req, res) => {
  try {
    await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ msg: 'User deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', err });
  }
});

// View all stores
router.get('/stores', verifyToken, requireRole(['admin']), async (req, res) => {
  try {
    const [stores] = await pool.query(
      'SELECT s.id, s.name, s.email, s.address, u.name AS owner FROM stores s JOIN users u ON s.owner_id = u.id'
    );
    res.json(stores);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', err });
  }
});

// Delete store
router.delete('/stores/:id', verifyToken, requireRole(['admin']), async (req, res) => {
  try {
    await pool.query('DELETE FROM stores WHERE id = ?', [req.params.id]);
    res.json({ msg: 'Store deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', err });
  }
});

module.exports = router;
