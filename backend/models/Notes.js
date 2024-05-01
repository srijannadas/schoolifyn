// Import necessary modules
const mongoose = require('mongoose');

// Define the "notes" schema
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  subject_id: {
    type: String,
    required: true
  },
  board_id: {
    type: String,
    required: true
  },
  year: {
    type: Number,
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

// Create the "notes" model
const Note = mongoose.model('Notes', noteSchema);

// Export the model
module.exports = Note;
