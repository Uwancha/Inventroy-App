const Category = require("../models/category");
const asyncHandler = require("express-async-handler");

// Display list of all Categories.
exports.category_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED YET: Category list");
});

// Display detail page for a specific Category.
exports.category_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED YET: Category detail: ${req.params.id}`);
});

// Display Category create form on GET.
exports.author_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED YET: Category create GET");
});

// Handle Category create on POST.
exports.author_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED YET: Category create POST");
});

// Display Category delete form on GET.
exports.author_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED YET: Category delete GET");
});

// Handle Category delete on POST.
exports.author_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED YET: Category delete POST");
});

// Display Category update form on GET.
exports.author_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED YET: Category update GET");
});

// Handle Category update on POST.
exports.author_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED YET: Category update POST");
});
