const express = require('express');
const router = express.Router();
const isAuth = require("../authmiddleware").isAuth;
const isAdmin = require("../authmiddleware").isAdmin;


// Controllers
const categoryController = require('../controllers/categoryController')

/* GET home page // List of all categories. */
router.get('/category/', categoryController.category_list);

// Get request for creating a category
router.get('/category/create', categoryController.category_create_get)

// Post request for creating category
router.post('/category/create', categoryController.category_create_post)

// Get detail of a category
router.get('/category/:id', categoryController.category_detail)

// Get request to delete a category
router.get('/category/:id/delete', isAuth, isAdmin, categoryController.category_delete_get)

// Get request to delete a category
router.post('/category/:id/delete', categoryController.category_delete_post)

// Get request to delete a category
router.get('/category/:id/update', isAuth, isAdmin, categoryController.category_update_get)

// Get request to delete a category
router.post('/category/:id/update', categoryController.category_update_post)


module.exports = router;
