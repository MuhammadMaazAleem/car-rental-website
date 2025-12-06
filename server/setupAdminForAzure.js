// Run this script in Azure Console or SSH
// Command: node setupAdminForAzure.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Your MongoDB Atlas URI from Azure environment variables
const MONGO_URI = process.env.MONGO_URI;

const setupAdmin = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Define User schema inline
    const userSchema = new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      phone: String,
      cnic: String,
      role: { type: String, default: 'user' },
      createdAt: { type: Date, default: Date.now }
    });

    const User = mongoose.models.User || mongoose.model('User', userSchema);

    const adminEmail = 'admin@swatcarrental.com';
    
    // Delete existing admin if any
    await User.deleteOne({ email: adminEmail });
    console.log('🗑️  Cleared existing admin');

    // Hash password manually
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // Create admin directly
    await User.create({
      name: 'Admin User',
      email: adminEmail,
      password: hashedPassword,
      phone: '03288691013',
      cnic: '12345-1234567-1',
      role: 'admin'
    });

    console.log('\n✅ Admin user created successfully!');
    console.log('\nLogin Credentials:');
    console.log('Email: admin@swatcarrental.com');
    console.log('Password: admin123');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

setupAdmin();
