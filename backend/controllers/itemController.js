const db = require('../config/db');

exports.createItem = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;

  await db.query(
    "INSERT INTO items (user_id, title, description) VALUES (?, ?, ?)",
    [userId, title, description]
  );

  res.json({ msg: "Item added" });
};

exports.getItems = async (req, res) => {
  const [items] = await db.query(
    "SELECT * FROM items WHERE user_id = ?",
    [req.user.id]
  );

  res.json(items);
};
