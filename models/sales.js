const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SaleSchema = new Schema(
  {
    product_type: { type: String, enum: ['guns', 'riffles'] },
    product_id: { type: Schema.Types.ObjectId, required: true },
    price: { type: Number, required: true },
    start_date: { type: Date, required: true },
    end_date: Date,
  }
);

module.exports = mongoose.model('Sale', SaleSchema);