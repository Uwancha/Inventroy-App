const express = require('express');
const router = express.Router();

// Controllers
const itemController = require('../controllers/itemController')

/* Item detail page. */
router.get('/category/item/:id', itemController.item_detail);

module.exports = router;
