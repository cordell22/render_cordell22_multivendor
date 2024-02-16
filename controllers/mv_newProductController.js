// Import the multer middleware
const multer = require('multer');
const upload = multer({ dest: './pics' }); // Use './pics' as the destination



const mv_Product = require('../models/mv_product');


// Display form to create a new product
exports.showNewProductForm = (req, res) => {
    res.render('mv_new_product', { title: 'Create New Product' });
};

// Create a new product
exports.createNewProduct = async function (req, res) {
    upload.single('image')(req, res, async function (err) {
    
    try {
        const { product_name, description, price, stock/*, category_id */} = req.body;
        const category_id = null;
        const vendor_id = req.session.vendorId || null; // Use obtained vendor ID from session
        const image = req.file.filename;

        // Check if image file was uploaded
        if (!req.file) {
            return res.status(400).send('No image uploaded');
        }
        const product = new mv_Product({
            product_name,
            description,
            price,
            stock,
            category_id,
            vendor_id,
            image   // Save the filename of the uploaded image
          });
          await product.save();

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating new product');
    }
    });
};