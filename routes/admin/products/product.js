const express = require('express');
const router = express.Router();

const productController = require('../../../controllers/admin/stock/products/productController');

// List products for a specific category
//  router.get('/:categoryType/:categoryId/products', productController.product_list);
//  router.get('/products', productController.product_list);
router.get('/', productController.product_list);


// Display form for adding a new product
router.get('/create', productController.product_create_get);

// Handle adding a new product
router.post('/create', productController.product_create_post);


//  todo: rewtite vsetko na create_gun  create_rifle
//  :productId/edit_gun, :productId/edit_rifle
//  :productId/delete_gun 

// Display form for editing a product
router.get('/:productId/edit', productController.product_edit_get);

// Handle editing a product
router.post('/:productId/edit', productController.product_edit_post);

// Handle deleting a product
router.get('/:productId/delete', productController.product_delete_get); // Route to display product delete confirmation view

router.post('/:productId/delete', productController.product_delete_post); // Route to handle product deletion


module.exports = router;