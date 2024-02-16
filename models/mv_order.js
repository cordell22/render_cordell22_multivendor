const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'mv_User', required: true },
  order_date: { type: Date, default: Date.now },
  total_amount: { type: Number, required: true }
});

module.exports = mongoose.model('mv_Order', orderSchema);