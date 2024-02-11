const express = require('express');
const router = express.Router();

// Require the sub-route modules
const landingRouter = require('./shop/landing');
const salesRouter = require('./shop/sales/sale');
const itemsRouter = require('./shop/items/item');


// Require controller modules for admin
// const adminController = require('../controllers/adminController');

router.get('/', function(req, res) {
    //  res.redirect('/catalog');
    //  res.send('Shopping lika MF Ma Niggaz')
    res.redirect('/shop/landing');  //  this is the localhost:3000/shop/landing redirected from /
  });
  
// Mount the sub-routes
router.use('/landing', landingRouter);  //  this is subroute of shop
router.use('/shop/sales', salesRouter);   //  mayb this should be like abovee, just sales..?
router.use('/items', itemsRouter);



module.exports = router;


