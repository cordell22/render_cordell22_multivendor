const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['buyer', 'vendor', 'admin'], required: true }
});

module.exports = mongoose.model('mv_User', userSchema);