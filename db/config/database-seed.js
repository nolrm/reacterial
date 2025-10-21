const mongoose = require('mongoose');
const path = require('path');
require('colors');

// Try to load from apps/admin/.env.local first, then fall back to root .env.local
const envPath = path.join(__dirname, '../../apps/admin/.env.local');
require('dotenv').config({ path: envPath });

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('\n================================='.blue);
    console.log(`🌿 MongoDB Connected: ${conn.connection.host}`.green);
    console.log(`📦 Database: reacterial_dev`.cyan);
    console.log('=================================\n'.blue);

    return conn;
  } catch (error) {
    console.error(`❌ Error: ${error.message}`.red);
    process.exit(1);
  }
};

module.exports = connectDB;
