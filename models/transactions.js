const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    order_id: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    response_code: Number,
    response_reason: String,
    transaction_id: Number,
    response: String,
    date_created: { type: Date, default: Date.now, required: true },
  }
);

module.exports = mongoose.model('Transaction', TransactionSchema);