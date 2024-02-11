// Import the multer middleware
const multer = require('multer');
const upload = multer({ dest: './pics' }); // Use './pics' as the destination


const Rifles = require('../../../../models/rifles'); // Import your Product model
const Guns = require('../../../../models/guns'); // Import your Product model
const Gunscategories = require('../../../../models/gunscategories'); // Import Gun Categories model
const Riflecategories = require('../../../../models/riflescategories'); // Import Rifle Categories model


// Controller functions for landing items display
exports.items_list = async function (req, res, next) {
    //  display items
    //  res.send('item Controller niggaz')
    try {
        const categoryType = req.query.categoryType; // Extract categoryType from query parameter
        const categoryId = req.query.categoryId;     // Extract categoryId from query parameter
    
        console.log('categoryType : ', categoryType);
        console.log('categoryId : ', categoryId);
    
        // Determine the appropriate model and category based on the category type
        let CategoryModel, ProductModel;
        if (categoryType === 'guns') {
          CategoryModel = Gunscategories;
          ProductModel = Guns;
        } else if (categoryType === 'rifles') {
          CategoryModel = Riflecategories;
          ProductModel = Rifles;
        } else {
          return res.status(400).send('Invalid category type');
        }
    
        const category = await CategoryModel.findById(categoryId);
    
        if (!category) {
          return res.status(404).send('Category not found');
        }
    
        const products = await ProductModel.find({ categoryId }).exec();
    
        res.render('shop/items/items', {
          title: 'Products List',
          categoryType,      // Pass the extracted categoryType to the view
          categoryId,        // Pass the extracted categoryId to the view
          categoryName: category.category,
          products
        });
      } catch (err) {
        next(err);
      }
}

module.exports = exports;