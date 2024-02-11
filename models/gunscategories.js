const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GunsCategorySchema = new Schema(
  {
    category: { type: String, required: true },
    description: String,
    image: { type: String, required: true },
  }
);

module.exports = mongoose.model('GunsCategory', GunsCategorySchema);