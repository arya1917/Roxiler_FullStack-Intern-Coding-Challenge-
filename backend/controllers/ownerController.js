// controllers/ownerController.js
const pool = require('../config/db');

exports.getOwnerStores = async (req, res) => {
  const ownerId = req.user.id;
  try {
    const [stores] = await pool.query(`
      SELECT s.id, s.name,
             IFNULL(ROUND(AVG(r.rating),2),0) AS average_rating
      FROM stores s
      LEFT JOIN ratings r ON r.store_id = s.id
      WHERE s.owner_id = ?
      GROUP BY s.id
    `, [ownerId]);
    res.json(stores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteStore = async (req, res) => {
  const ownerId = req.user.id;
  const storeId = req.params.id;
  try {
    // ensure store belongs to this owner
    const [rows] = await pool.query('SELECT 1 FROM stores WHERE id = ? AND owner_id = ?', [storeId, ownerId]);
    if (!rows.length) return res.status(403).json({ message: 'Not your store' });

    await pool.query('DELETE FROM stores WHERE id = ?', [storeId]);
    res.json({ message: 'Store deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
