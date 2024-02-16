// mv_indexController.js
const mv_Product = require('../models/mv_product');

exports.landingPage = async (req, res) => {
  
  try {
    // Fetch all products
    const products = await mv_Product.find({});

    // Check if the user is logged in and their role is 'vendor'
    let sessionVendorId = null;
    if (req.session.loggedIn && req.session.userRole === 'vendor') {
      sessionVendorId = req.session.vendorId;
    }

    res.render('mv_landing', { title: 'Multivendor Landing Page', loggedIn: req.session.loggedIn, userRole: req.session.userRole, products, sessionVendorId  });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching products');
  }
};