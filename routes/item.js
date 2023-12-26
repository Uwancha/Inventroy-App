const express = require('express');
const router = express.Router();

const isAuth = require("../authmiddleware").isAuth;
const isAdmin = require("../authmiddleware").isAdmin;


// Controllers
const itemController = require('../controllers/itemController')

// Get request to create an item
router.get('/category/item/create/:id', itemController.item_create_get);

// Post request to create an item
router.post('/category/item/create/:id', itemController.item_create_post);

// Get request to delete an item
router.get('/category/item/delete/:categoryid/:id', isAuth, isAdmin, itemController.item_delete_get);

// Get request to delete an item
router.post('/category/item/delete/:categoryid/:id', itemController.item_delete_post);

// Get request to update an item
router.get('/category/item/update/:categoryid/:itemid', isAuth, isAdmin, itemController.item_update_get);

// Post request to update an item
router.post('/category/item/update/:categoryid/:itemid', itemController.item_update_post);


module.exports = router;
