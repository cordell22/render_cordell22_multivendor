// Import the multer middleware
const multer = require('multer');
const upload = multer({ dest: './pics' }); // Use './pics' as the destination



const Rifles = require('../../../models/rifles'); // Import your Product model
const Guns = require('../../../models/guns'); // Import your Product model
const Gunscategories = require('../../../models/gunscategories'); // Import Gun Categories model
const Riflecategories = require('../../../models/riflescategories'); // Import Rifle Categories model


// Display list of all stock categories.
exports.landing_categories_list = async function (req, res, next) {
  try {
    // Fetch categories from both Gunscategories and Riflecategories models
    const gunCategories = await Gunscategories.find();
    const rifleCategories = await Riflecategories.find();
    console.log('gunCategories : ', gunCategories);
    // Render the landing categories view with the fetched categories
    res.render('shop/landing', { gunCategories, rifleCategories });
  } catch (err) {
    // Handle errors and pass to error handler middleware
    next(err);
  }
};



/*
// Display list of all stock categories.
exports.landing_categories_list = function (req, res, next) {
  // Fetch categories from both Gunscategories and Riflecategories models
  res.send('Landing Categories Controller ma niggz')
};
*/

// Export the controller functions.
module.exports = exports;