const Item = require("../models/item");
const Category = require("../models/category")
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const category = require("../models/category");


// Display Item create form on GET.
exports.item_create_get = asyncHandler(async (req, res, next) => {
  const category =  await Category.findById(req.params.id).exec();

  res.render('item_form', {
   title: 'Add New Item to',
   category: category
  })
});

// Handle Item create on POST.
exports.item_create_post = [
  // Validate and Sanitize data 
  body('name')
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage("Item name can't be empty or less than 2 letters."),
  
  body('description')
    .trim()
    .escape()
    .isLength({ min: 10 })
    .withMessage("Item description must be specified."),

  body('price')
    .trim()
    .escape(),

  // Process data after validation and sanitization
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    const category = await Category.findOne({name:req.body.category}).exec();

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: category
    })

    // Display errors in form
    if (!errors.isEmpty()) {
      res.render('item_form', {
        title: "Add New Item",
        category: category,
        errors: errors.array(),
      })
    } else {
      // Check if an item already exists
      const itemExits = await Item.findOne({name:req.body.name}).exec();

      // If an item already exists, redirect to category where it beongs
      if (itemExits) {
        res.redirect(category.url)
      } else {
        // Save an item
        await item.save();

        res.redirect(category.url);
      }

    }
  })
]

// Display Item delete form on GET.
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).exec()

  // Check if item exists
  if (!item) {
    res.render('item_delete', {
      noitem: 'There is no such item'
    })
  }

  res.render('item_delete.pug', {
    item: item 
  })
});

// Handle Item delete on POST.
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  await Item.findByIdAndDelete(req.body.itemid);
  const category = await Category.findById(req.params.categoryid).exec();

  res.redirect(category.url)
});

// Display Item update form on GET.
exports.item_update_get = asyncHandler(async (req, res, next) => {
  // Get category and item belongs
  const category = await Category.findById(req.params.categoryid).exec();
  const item = await Item.findById(req.params.itemid).exec();

  res.render('item_form', {
    title: "Update Item in",
    category: category,
    item:item
  })
});

// Handle Item update on POST.
exports.item_update_post = [
  // Validate and Sanitize data 
  body('name')
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage("Item name can't be empty or less than 2 letters."),
  
  body('description')
    .trim()
    .escape()
    .isLength({ min: 10 })
    .withMessage("Item description must be specified."),

  body('price')
    .trim()
    .escape(),

  // Process data after validation and sanitization
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    const category = await Category.findOne({name:req.body.category}).exec();

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: category,
      _id: req.params.itemid
    })

    // Display errors in form
    if (!errors.isEmpty()) {
      res.render('item_form', {
        title: "Update Item in",
        category: category,
        errors: errors.array(),
      })
    } else {
      const updatedItem = await Item.findByIdAndUpdate(req.params.itemid, item, {})
      console.log(updatedItem)

      res.redirect(category.url);
    }
  })
]
