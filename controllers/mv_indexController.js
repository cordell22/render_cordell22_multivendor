// mv_indexController.js
const fs = require('fs');
const path = require('path');
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

    // Read the pics directory to get random images
    const picsDirectory = path.join(__dirname, '..', 'pics');
    fs.readdir(picsDirectory, (err, files) => {
      if (err) {
        console.error('Error reading pics directory:', err);
        res.status(500).send('Internal Server Error');
      } else {
        // Filter out only image files (you may need to adjust this based on your file types)
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        
        // Pick a random image file from the array
        const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];

        res.render('mv_landing', { title: 'Multivendor Landing Page', loggedIn: req.session.loggedIn, userRole: req.session.userRole, products, sessionVendorId, randomImage });

    //  res.render('mv_landing', { title: 'Multivendor Landing Page', loggedIn: req.session.loggedIn, userRole: req.session.userRole, products, sessionVendorId  });
  }
});
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching products');
  }
};