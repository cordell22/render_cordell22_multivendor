const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RifleSchema = new Schema(
  {
    rifles_category_id: { type: Schema.Types.ObjectId, ref: 'RiflesCategory', required: true },
    name: { type: String, required: true },
    description: String,
    image: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    date_created: { type: Date, default: Date.now, required: true },
  }
);

module.exports = mongoose.model('Rifle', RifleSchema);