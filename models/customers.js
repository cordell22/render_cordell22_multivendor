const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
  {
    email: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address1: { type: String, required: true },
    address2: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: Number, required: true },
    phone: { type: Number, required: true },
    date_created: { type: Date, default: Date.now, required: true },
  }
);

module.exports = mongoose.model('Customer', CustomerSchema);