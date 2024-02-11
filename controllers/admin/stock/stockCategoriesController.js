// Import the multer middleware
const multer = require('multer');
const upload = multer({ dest: './pics' }); // Use './pics' as the destination


const Gunscategories = require('../../../models/gunscategories');
const Riflecategories = require('../../../models/riflescategories');

// Display list of all stock categories.
exports.stock_categories_list = function (req, res, next) {
  // Fetch categories from both Gunscategories and Riflecategories models
  Promise.all([
    Gunscategories.find().exec(),
    Riflecategories.find().exec()
  ])
  .then(([gunscategories, riflescategories]) => {
    res.render('admin/stock/stock_categories_list', {
      title: 'Stock Categories List',
      gunscategories,
      riflescategories
    });
  })
  .catch(err => next(err));
};


// Display form for adding a new stock category.
exports.stock_category_create_get = function (req, res) {
    res.render('admin/stock/stock_categories_create', { title: 'Add Stock Category', error: null });
  };
  

  // Handle adding a new stock category.
//  exports.stock_category_create_post = upload.single('image'), function (req, res, next) {

exports.stock_category_create_post = function (req, res, next) {
    upload.single('image')(req, res, function (err) {
        if (err) {
            return res.render('admin/stock/stock_categories_create', { title: 'Add Stock Category', error: 'Error uploading image' });
        }


    const category = req.body.category;
    const description = req.body.description;
    const categoryType = req.body.categoryType;
    const image = req.file.filename;
  
    // Use the appropriate model based on the category (gun or rifle)
    const CategoryModel = categoryType === 'guns' ? Gunscategories : Riflecategories;

    const categoryInstance = new CategoryModel({
      category,
      description,
      image,
    });
  
    categoryInstance.save((err) => {
      if (err) {
        res.render('admin/stock/stock_categories_create', { title: 'Add Stock Category', error: 'Error creating stock category' });
      } else {
        res.redirect('/admin/stock');
      }
    });
});
  };
  
  // Display form for editing a stock category.
// Display form for editing a stock category.
exports.stock_category_edit_get = function (req, res, next) {
    const categoryId = req.params.id; // Get the category ID from the URL parameter
    const categoryType = req.query.categoryType; // Get the category type from the query parameter
  
    // Determine the appropriate model based on the category type
    const CategoryModel = categoryType === 'guns' ? Gunscategories : Riflecategories;
  
    // Fetch the stock category details
    CategoryModel.findById(categoryId, (err, category) => {
      if (err) {
        return next(err);
      }
      res.render('admin/stock/stock_categories_edit', {
        title: 'Edit Stock Category',
        categoryId,
        categoryType,
        category
      });
    });
  };
  
  // Handle editing a stock category.
  //    exports.stock_category_edit_post = upload.single('image'), function (req, res, next) {
  exports.stock_category_edit_post = function (req, res, next) {
        upload.single('image')(req, res, function (err) {
    const categoryId = req.params.id; // Get the category ID from the URL parameter
    const categoryType = req.query.categoryType; // Get the category type from the query parameter
  
    // Determine the appropriate model based on the category type
    const CategoryModel = categoryType === 'guns' ? Gunscategories : Riflecategories;
  
    // Update the category details
    CategoryModel.findByIdAndUpdate(
      categoryId,
      {
        category: req.body.category,
        description: req.body.description,
        image: req.file ? req.file.filename : undefined
      },
      (err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/admin/stock');
      }
    );
});
  };
  
  // Handle deleting a stock category.
  // Display confirmation page for deleting a stock category.
exports.stock_category_delete_get = function (req, res, next) {
    const categoryId = req.params.id; // Get the category ID from the URL parameter
    const categoryType = req.query.categoryType; // Get the category type from the query parameter
  
    res.render('admin/stock/stock_categories_delete', {
      title: 'Delete Stock Category',
      categoryId,
      categoryType
    });
  };

  // Handle deleting a stock category.
exports.stock_category_delete_post = function (req, res, next) {
    const categoryId = req.params.id; // Get the category ID from the URL parameter
    const categoryType = req.query.categoryType; // Get the category type from the query parameter
  
    // Determine the appropriate model based on the category type
    const CategoryModel = categoryType === 'guns' ? Gunscategories : Riflecategories;
  
    // Delete the category by ID
    CategoryModel.findByIdAndDelete(categoryId, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/admin/stock');
    });
  };
  
  
  // Handle deleting a stock category.
  
  /*
exports.stock_category_delete = function (req, res, next) {
    const categoryId = req.params.id; // Get the category ID from the URL parameter
    const categoryType = req.query.categoryType; // Get the category type from the query parameter
  
    // Determine the appropriate model based on the category type
    const CategoryModel = categoryType === 'guns' ? Gunscategories : Riflecategories;
  
    // Delete the category by ID
    CategoryModel.findByIdAndDelete(categoryId, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/admin/stock');
    });
  };
  */

// ... other controller functions ...

// Export the controller functions.
module.exports = exports;