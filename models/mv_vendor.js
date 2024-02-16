const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'mv_User', required: true },
  shop_name: { type: String, required: true },
  bank_amount: { type: Number, default: 0 }
});

module.exports = mongoose.model('mv_Vendor', vendorSchema);