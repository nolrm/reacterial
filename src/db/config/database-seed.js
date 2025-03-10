const mongoose = require('mongoose');
const path = require('path');
require('colors');
require('dotenv').config({ path: path.join(__dirname, '../../../.env.local') });

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
