const express = require('express');
const router = express.Router();

const salesController = require('../../../controllers/shop/landing/sales/saleController');

// List items for a specific category

router.get('/', salesController.sales_list);





module.exports = router;