const mongoose = require('mongoose');
const { User } = require('../models');
const fs = require('fs').promises;
const path = require('path');
const connectDB = require('../config/database-seed');

async function resetDatabase() {
  try {
    // Connect to MongoDB using the connection module
    await connectDB();
    console.log('Connected to MongoDB');

    // Read the latest seed data
    const seedPath = path.join(__dirname, '../seeds/data/initial.json');
    const seedData = JSON.parse(await fs.readFile(seedPath, 'utf8'));
    console.log('Loaded latest seed data');

    // Drop existing collections
    console.log('Dropping existing collections...');
    try {
      await mongoose.connection.db.dropDatabase();
      console.log('Dropped existing database');
    } catch (err) {
      console.error('Error dropping database:', err);
    }

    // Insert seed data
    console.log('Inserting seed data...');
    await User.insertMany(seedData.users);
    
    console.log('Database reset completed successfully!');
    
  } catch (error) {
    console.error('Error resetting database:', error);
  } finally {
    // Close the connection
    if (mongoose.connection.readyState === 1) { // Only close if connected
      await mongoose.connection.close();
      console.log('Database connection closed');
    }
  }
}

// Run the reset
resetDatabase(); 