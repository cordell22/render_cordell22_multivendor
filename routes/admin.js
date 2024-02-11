const express = require('express');
const router = express.Router();

// Require the sub-route modules
const customerRouter = require('./admin/customer');
const salesRouter = require('./admin/sales');
const ordersRouter = require('./admin/orders');
const stockRouter = require('./admin/stock');

// Require controller modules for admin
// const adminController = require('../controllers/adminController');

// Define routes for admin
router.get('/', (req, res) => {
    // Render the main admin dashboard view
    res.render('admin/index'); // Create the admin dashboard view later
  });
  
// Mount the sub-routes
router.use('/customers', customerRouter);
router.use('/sales', salesRouter);
router.use('/orders', ordersRouter);
router.use('/stock', stockRouter);


module.exports = router;