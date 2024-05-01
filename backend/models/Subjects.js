// Import necessary modules
const mongoose = require('mongoose');

// Define the "subjects" schema
const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
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

// Create the "subjects" model
const Subject = mongoose.model('Subjects', subjectSchema);

// Export the model
module.exports = Subject;
