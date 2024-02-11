const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    customer_id: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    total: Number,
    shipping: Number,
    credit_card_number: Number,
    order_date: { type: Date, default: Date.now, required: true },
  }
);

module.exports = mongoose.model('Order', OrderSchema);