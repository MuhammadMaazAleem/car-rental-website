import mongoose from 'mongoose';
import User from './models/User.js';

// MongoDB Atlas connection string - replace with your actual connection string
const ATLAS_URI = 'mongodb+srv://maazswati51:HKMLcCqK1RYZWJl1@cluster0.bk2xg.mongodb.net/swat-car-rental?retryWrites=true&w=majority';

const createAdmin = async () => {
  try {
    console.log('Connecting to MongoDB Atlas...');
    
    await mongoose.connect(ATLAS_URI, {
      serverSelectionTimeoutMS: 10000
    });

    console.log('✅ MongoDB Atlas Connected');

    const adminEmail = 'admin@swatcarrental.com';
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('\n✅ Admin user already exists in MongoDB Atlas!');
      console.log('\nAdmin Login Credentials:');
      console.log('Email:', adminEmail);
      console.log('Password: admin123');
      console.log('Role:', existingAdmin.role);
      await mongoose.connection.close();
      process.exit(0);
    }

    // Create new admin user
    const admin = await User.create({
      name: 'Admin User',
      email: adminEmail,
      password: 'admin123',
      phone: '03288691013',
      cnic: '12345-1234567-1',
      role: 'admin'
    });

    console.log('\n✅ Admin user created successfully in MongoDB Atlas!');
    console.log('\nAdmin Login Credentials:');
    console.log('Email:', admin.email);
    console.log('Password: admin123');
    console.log('Role:', admin.role);
    console.log('\n🚀 You can now login on your Azure deployed site!');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\nPlease check:');
    console.error('1. Your internet connection');
    console.error('2. MongoDB Atlas IP whitelist (add 0.0.0.0/0 to allow all IPs)');
    console.error('3. MongoDB Atlas username and password are correct');
    await mongoose.connection.close();
    process.exit(1);
  }
};

createAdmin();
