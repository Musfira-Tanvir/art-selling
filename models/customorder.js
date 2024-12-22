const mongoose = require('mongoose');

// Define the schema for custom order data
const customOrderSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name field, required
  phone: { type: String, required: true }, //Phone number, required 
  size: { type: Number, required: true }, // Size field, required
  follow: { type: Boolean, required: true }, // Checkbox for "Follow the right scripts?", required
  finishing: { type: String, enum: ['Matt', 'Gloss'], required: true }, // Radio options for finishing type
  script: { type: String, required: true }, // Dropdown for script selection
  description: { type: String, required: true }, // Text area for order description
  createdAt: { type: Date, default: Date.now }, // Automatically store creation date
},
{ collection: 'CustomOrders' } // Specify collection name
);

// Export the model
module.exports = mongoose.model('CustomOrder', customOrderSchema);
