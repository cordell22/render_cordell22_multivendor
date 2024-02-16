// controllers/mv_billingController.js

// Import necessary models
const mv_Product = require('../models/mv_product');

const mv_Order = require('../models/mv_order');
const mv_OrderDetail = require('../models/mv_order_detail');

// Display billing page
exports.showBillingPage = async (req, res) => {
    try {
        // Retrieve cart information from session
        const cart = req.session.cart;

        // Calculate total price
        let total = 0;
        cart.items.forEach(item => {
            total += item.product.price * item.quantity;
        });

        res.render('mv_billing', { title: 'Billing Page', user: req.session.user, cart, total });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error rendering billing page');
    }
};

// Handle purchase confirmation
exports.confirmPurchase = async (req, res) => {
    try {
        const userId = req.session.userId; // Assuming you have stored the user ID in the session

        // Calculate total amount based on cart items
        let totalAmount = 0;
        // Retrieve cart information from session
        const cart = req.session.cart;
        if (cart && cart.items.length > 0) {
            cart.items.forEach(item => {
                totalAmount += item.product.price * item.quantity;
            });
        }

        // Create new order
        const order = new mv_Order({
            user_id: userId, // Assuming user ID is stored in session
            total_amount: totalAmount,
            // Add any additional order information here
        });
        await order.save();

        // Create order details for each item in the cart
        for (const item of cart.items) {
            const orderDetail = new mv_OrderDetail({
                order_id: order._id,
                product_id: item.product._id,
                quantity: item.quantity,
                // Add any additional order detail information here
            });
            await orderDetail.save();
        }

        // Clear cart from session
        req.session.cart = null;

        // Redirect to thank you page
        res.redirect('/thank-you');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error confirming purchase');
    }
};

// Function to calculate total price of items in the cart
function calculateTotalPrice(cart) {
    let total = 0;
    cart.items.forEach(item => {
        total += item.product.price * item.quantity;
    });
    return total;
}