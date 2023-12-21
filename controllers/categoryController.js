const Category = require("../models/category");
const Item = require("../models/item")
const asyncHandler = require("express-async-handler");

// Display list of all Categories.
exports.category_list = asyncHandler(async (req, res, next) => {
  const categoryList = await Category.find().sort({name:1}).exec();
  console.log(categoryList)

  res.render('index', {
    title: "Products",
    categoryList: categoryList,
  });
});

// Display detail page for a specific Category.
exports.category_detail = asyncHandler(async (req, res, next) => {
  const [category, items] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({category: req.params.id})
  ])

  if (category == null) {
    // No results.
    const err = new Error("Category not found");
    err.status = 404;

    return next(err);
  }

  res.render('categoryDetail', {
    category: category,
    items: items
  })
  
});

// Display Category create form on GET.
exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED YET: Category create GET");
});

// Handle Category create on POST.
exports.category_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED YET: Category create POST");
});

// Display Category delete form on GET.
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED YET: Category delete GET");
});

// Handle Category delete on POST.
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED YET: Category delete POST");
});

// Display Category update form on GET.
exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED YET: Category update GET");
});

// Handle Category update on POST.
exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED YET: Category update POST");
});
