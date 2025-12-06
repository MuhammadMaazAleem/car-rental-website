import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const resetAdmin = async () => {
  try {
    console.log('Connecting to MongoDB...');
    
    await mongoose.connect(process.env.MONGO_URI);

    console.log('✅ MongoDB Connected');

    const adminEmail = 'admin@swatcarrental.com';
    
    // Delete existing admin
    const deleted = await User.deleteOne({ email: adminEmail });
    
    if (deleted.deletedCount > 0) {
      console.log('🗑️  Old admin user deleted');
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
    console.log('Role:', admin.role);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

resetAdmin();
