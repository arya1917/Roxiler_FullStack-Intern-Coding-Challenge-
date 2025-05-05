// controllers/adminController.js
const pool = require('../config/db');

exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, name, email, address, role, created_at FROM users');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllStores = async (req, res) => {
  try {
    const [stores] = await pool.query(`
      SELECT s.id, s.name, s.email, s.address,
             u.name AS owner_username,
             IFNULL(ROUND(AVG(r.rating),2), 0) AS average_rating
      FROM stores s
      JOIN users u ON s.owner_id = u.id
      LEFT JOIN ratings r ON r.store_id = s.id
      GROUP BY s.id, u.name
    `);
    res.json(stores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteStore = async (req, res) => {
  try {
    await pool.query('DELETE FROM stores WHERE id = ?', [req.params.id]);
    res.json({ message: 'Store deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
