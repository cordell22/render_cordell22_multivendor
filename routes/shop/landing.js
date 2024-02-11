const express = require('express');
const router = express.Router();
const landingCategoriesController = require('../../controllers/shop/landing/landingCategoriesController');
//  todo:
//  const stockCategoriesController = require('../../controllers/shop/landing/landingSalesController');

const itemsRoutes = require('./items/item');
const salesRoutes = require('./sales/sale');


// Display list of all categories (gun and rifle).
// GET request for list of all stock categories.
router.get('/', landingCategoriesController.landing_categories_list);




// Display products for a specific category
//  router.use('/category/:categoryType/:categoryId', productRoutes);

// Display products for a specific category
router.use('/items', itemsRoutes);

// Display sales
router.use('/sales', salesRoutes);


  
  // ... Other routes for adding, editing, and deleting categories ...

module.exports = router;