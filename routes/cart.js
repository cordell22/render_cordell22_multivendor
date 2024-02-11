const express = require('express');
const router = express.Router();

// Require controller modules for cart
const cartController = require('../controllers/cart/cartController');

// Define routes for cart
// router.get('/showcart', cartController.show_cart);
// router.post('/addtocart', cartController.add_to_cart);
// router.post('/purchase', cartController.purchase);


router.get('/', cartController.getCart);
router.post('/add', cartController.addToCart);
router.post('/update', cartController.updateCartItemQuantity);
router.post('/increase', cartController.increaseCartItemQuantity);
router.post('/decrease', cartController.decreaseCartItemQuantity);


module.exports = router;