require('colors');
const connectDB = require('../config/database');
const mongoose = require('mongoose');

const initDatabase = async () => {
  try {
    console.log('\n🚀 Initializing database...'.yellow);
    
    const conn = await connectDB();
    
    // Add any initialization logic here
    // For example, creating indexes
    
    console.log('✅ Database initialized successfully\n'.green);
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error initializing database:'.red, error);
    process.exit(1);
  }
};

initDatabase(); 