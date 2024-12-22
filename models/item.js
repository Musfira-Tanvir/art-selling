const mongoose = require('mongoose');

// Define the schema for order data
const orderSchema = new mongoose.Schema(
  {
    customerDetails: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      notes: { type: String },
    },
    cartItems: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },  // Refers to the 'product' model
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now }, // Automatically store order date
  },
  { collection: 'Orders' }  // The orders will be stored in the 'Orders' collection
);

// Export the model
module.exports = mongoose.model('Item', orderSchema);  // 'Item' refers to the orders collection
