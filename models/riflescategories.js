const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RiflesCategorySchema = new Schema(
  {
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  }
);

module.exports = mongoose.model('RiflesCategory', RiflesCategorySchema);