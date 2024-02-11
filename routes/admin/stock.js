const express = require('express');
const router = express.Router();
const stockCategoriesController = require('../../controllers/admin/stock/stockCategoriesController');

const productRoutes = require('./products/product');


// Display list of all categories (gun and rifle).
// GET request for list of all stock categories.
router.get('/', stockCategoriesController.stock_categories_list);


// Display form for adding a new stock category.
router.get('/category/create', stockCategoriesController.stock_category_create_get);

// Handle adding a new stock category.
router.post('/category/create', stockCategoriesController.stock_category_create_post);

// Display form for editing a stock category.
router.get('/category/:id/edit', stockCategoriesController.stock_category_edit_get);

// Handle editing a stock category.
router.post('/category/:id/edit', stockCategoriesController.stock_category_edit_post);

// Display form for confirming the deletion of a stock category.
router.get('/category/:id/delete', stockCategoriesController.stock_category_delete_get);

// Handle deleting a stock category.
router.post('/category/:id/delete', stockCategoriesController.stock_category_delete_post);



// Display products for a specific category
//  router.use('/category/:categoryType/:categoryId', productRoutes);

// Display products for a specific category
router.use('/products', productRoutes);

  
  // ... Other routes for adding, editing, and deleting categories ...

module.exports = router;