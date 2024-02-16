const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'mv_Category' },
  vendor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'mv_Vendor', required: true },
  image: { type: String, required: true } // Store the filename of the product image
});

module.exports = mongoose.model('mv_Product', productSchema);