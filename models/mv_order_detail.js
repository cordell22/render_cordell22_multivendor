const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'mv_Order', required: true },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'mv_Product', required: true },
  quantity: { type: Number, required: true }
});

module.exports = mongoose.model('mv_OrderDetail', orderDetailSchema);