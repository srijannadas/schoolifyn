// Import necessary modules
const mongoose = require('mongoose');

// Define the "boards" schema
const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Create the "boards" model
const Board = mongoose.model('Boards', boardSchema);

// Export the model
module.exports = Board;
