const mongoose = require('mongoose');

// Example schema - modify according to your needs
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  image: {
    type: String,
    default: 'https://ui-avatars.com/api/?background=random' // Default avatar generator
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Add more schemas as needed

module.exports = {
  User: mongoose.model('User', userSchema),
  // Add more models here as needed
}; 