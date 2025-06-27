const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1
  }})

  const cartSchema = new mongoose.Schema({
   userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  products: [cartItemSchema]
}, {timestamps: true})

module.exports = mongoose.model('Cart', cartSchema);