const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const [user] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  if (user.length > 0) return res.json({ msg: "User exists" });

  const hashed = await bcrypt.hash(password, 10);

  await db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashed]
  );

  res.json({ msg: "Registered" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const [user] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  if (user.length === 0) return res.json({ msg: "User not found" });

  const valid = await bcrypt.compare(password, user[0].password);
  if (!valid) return res.json({ msg: "Invalid password" });

  const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });

  res.json({ token });
};
