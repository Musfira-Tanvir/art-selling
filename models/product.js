const mongoose = require('mongoose');

// Define the product schema for the 'products' collection
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },  // Can be 'name', 'anniversary', etc.
}, { collection: 'products' });  // Explicitly set the collection name to 'products'

const Product = mongoose.model('product', productSchema);  // 'product' model will refer to the 'products' collection

module.exports = Product;
