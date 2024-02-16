
// mv_editProductController.js

const Product = require('../models/mv_product');

// Display edit form
exports.showEditForm = async (req, res) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        // Render the edit form view with the product data
        res.render('mv_edit_product', { title: 'Edit Product', product });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching product');
    }
};

// Process edit form submission
exports.editProduct = async (req, res) => {
    const productId = req.params.productId;
    const { product_name, description, price, stock } = req.body;
    try {
        await Product.findByIdAndUpdate(productId, { product_name, description, price, stock });
        res.redirect('/'); // Redirect to landing page after successful edit
    } catch (err) {
        console.error(err);
        res.status(500).send('Error editing product');
    }
};

// Process delete request
exports.deleteProduct = async (req, res) => {
    const productId = req.params.productId;
    try {
        await Product.findByIdAndDelete(productId);
        res.redirect('/'); // Redirect to landing page after successful delete
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting product');
    }
};


