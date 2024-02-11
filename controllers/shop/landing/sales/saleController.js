// Import the multer middleware
const multer = require('multer');
const upload = multer({ dest: './pics' }); // Use './pics' as the destination


const Rifles = require('../../../../models/rifles'); // Import your Product model
const Guns = require('../../../../models/guns'); // Import your Product model
const Gunscategories = require('../../../../models/gunscategories'); // Import Gun Categories model
const Riflecategories = require('../../../../models/riflescategories'); // Import Rifle Categories model

const Sales = require('../../../../models/sales'); // Import sales model


// Controller functions for landing items display
exports.sales_list = async function (req, res, next) {
    //  display sales
    res.send('Sales Controller niggaz')
}

module.exports = exports;