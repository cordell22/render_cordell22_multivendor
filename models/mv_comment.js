const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'mv_User', required: true },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'mv_Product', required: true },
  comment: { type: String, required: true },
  comment_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('mv_Comment', commentSchema);