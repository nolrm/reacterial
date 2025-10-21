require('colors');
const connectDB = require('../config/database-seed');
const mongoose = require('mongoose');
const { User } = require('../models');
const initialData = require('../seeds/data/initial.json');

const seedDatabase = async () => {
  try {
    console.log('\n🌱 Starting database seeding...'.yellow);

    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    console.log('🧹 Cleared existing data'.cyan);

    // Insert seed data
    await User.insertMany(initialData.users);
    console.log('📥 Seed data inserted successfully'.green);

    console.log('\n✅ Database seeding completed!\n'.green);

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error seeding database:'.red, error);
    process.exit(1);
  }
};

seedDatabase();
