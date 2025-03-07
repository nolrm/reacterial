const mongoose = require('mongoose');

// Example schema - modify according to your needs
const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  image: {
    type: String,
    default: 'https://ui-avatars.com/api/?background=random' // Default avatar generator
  },
  address: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Create index for unique email
userSchema.index({ email: 1 }, { unique: true });

// Add more schemas as needed

module.exports = {
  User: mongoose.model('User', userSchema),
  // Add more models here as needed
}; 