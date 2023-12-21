const express = require('express');
const router = express.Router();

// Controllers
const categoryController = require('../controllers/categoryController')

/* GET home page. */
router.get('/category/', categoryController.category_list);
router.get('/category/:id', categoryController.category_detail)

module.exports = router;
