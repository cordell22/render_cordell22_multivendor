const express = require('express');
const router = express.Router();

// Require controller modules for cart
const checkoutController = require('../controllers/checkout/checkoutController');

// Define routes for cart
// router.get('/showcart', cartController.show_cart);
// router.post('/addtocart', cartController.add_to_cart);
// router.post('/purchase', cartController.purchase);


//  router.get('/', checkoutController.checkout);
//  router.post('/', checkoutController.checkout);

// Display checkout page with total price and payment form
router.get('/checkout', checkoutController.showCheckout);

// Handle the payment and save the order details
router.post('/process-payment', checkoutController.processPayment);



module.exports = router;