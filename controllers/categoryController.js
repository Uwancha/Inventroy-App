const Category = require("../models/category");
const Item = require("../models/item")
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
exports.category_create_get = (req, res, next) => {
  res.render('category_form', {
    title: 'Create New Category',
    errors: []
  })
};

// Handle Category create on POST.
exports.category_create_post = [
  // Validate and sanitize data
  body('name')
    .trim()
    .isLength({min: 3, max: 30})
    .escape()
    .withMessage("Category name must be specified."),
    
    body("description")
    .trim()
    .isLength({min: 10, max: 200})
    .escape()
    .withMessage("Category description must be specified."),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);

      const category = new Category({
        name: req.body.name,
        description: req.body.description
      });

      if (!errors.isEmpty()) {
        res.render("category_form", {
          title: "Create New Category",
          category: category,
          errors: errors.array()
        })

        console.log("There was an error")

        return 
      } else {
        // Check if Category already exists
        const categoryExists = await Category.findOne({name: req.body.name}).exec()

        if (categoryExists) {
          // If category aready exists, redirect to it
          res.redirect(categoryExists.url)
        } else {
          // Save it 
          await category.save()
        
          // Redirect to new author record.
          res.redirect(category.url)
        }
      }
    }) 
]

// Display Category delete form on GET.
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  const [category, items] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({category: req.params.id}).exec()
  ])

  if (category == null) {
    res.redirect('/category/')
  }

  res.render('category_delete', {
    title: "Delete Category",
    category: category,
    items: items
  })
});

// Handle Category delete on POST.
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  const [category, items] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({category: req.params.id}).exec()
  ])

  if (items.length > 0) {
    // Category has books. Render in same way as for GET route.
    res.render("author_delete", {
      title: "Delete Category",
      category: category,
      items: items
    });
    return;
  } else {
    // Category has no items. Delete object and redirect to the list of categories.
    await Category.findByIdAndDelete(req.body.categoryid);
    res.redirect("/category");
  }
});

// Display Category update form on GET.
exports.category_update_get = asyncHandler(async (req, res, next) => {
  // Get category for form
  const category = await Category.findById(req.params.id).exec();

  if (category === null) {
    // No category found
    const err = new Error('Category Not found');

    err.status == 4040;

    return next(err);
  }

  res.render('category_form', {
    title: 'Update Category',
    category: category
  })
});

// Handle Category update on POST.
exports.category_update_post = [
  // Validate and sanitize data
  body('name')
    .trim()
    .isLength({min: 3, max: 30})
    .escape()
    .withMessage("Category name must be specified."),
    
    body("description")
    .trim()
    .isLength({min: 10, max: 200})
    .escape()
    .withMessage("Category description must be specified."),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);

      const category = new Category({
        name: req.body.name,
        description: req.body.description,
        _id: req.params.id
      });

      if (!errors.isEmpty()) {
        res.render("category_form", {
          title: "Update Category",
          category: category,
          errors: errors.array()
        })

        console.log("There was an error")

        return 
      } else {
        // Data from form is valid. Update the category.
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, category, {})
        // Redirect to new author record.
        res.redirect(updatedCategory.url)
      }
    }) 
]
