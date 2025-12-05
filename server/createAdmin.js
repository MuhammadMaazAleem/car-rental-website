import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = 'admin@swatcarrental.com';
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('\n✅ Admin user already exists!');
      console.log('\nAdmin Login Credentials:');
      console.log('Email:', adminEmail);
      console.log('Password: admin123');
      console.log('\nNote: If you forgot the password, delete this admin and run the script again.');
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

    console.log('\n✅ Admin user created successfully!');
    console.log('\nAdmin Login Credentials:');
    console.log('Email:', admin.email);
    console.log('Password: admin123');
    console.log('\nYou can now login with these credentials.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createAdmin();
