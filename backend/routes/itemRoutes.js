const express = require('express');
const router = express.Router();
const { createItem, getItems } = require('../controllers/itemController');
const auth = require('../middleware/auth');

router.post('/', auth, createItem);
router.get('/', auth, getItems);

module.exports = router;
