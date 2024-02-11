const express = require('express');
const router = express.Router();

const itemController = require('../../../controllers/shop/landing/items/itemController');

// List items for a specific category

router.get('/', itemController.items_list);





module.exports = router;