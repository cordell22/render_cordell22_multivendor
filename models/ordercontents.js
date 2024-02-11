const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderContentSchema = new Schema(
  {
    order_id: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    product_type: { type: String, enum: ['guns', 'rifles'] },
    product_id: { type: Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true },
    price_per: Number,
    ship_date: Date,
  }
);

module.exports = mongoose.model('OrderContent', OrderContentSchema);