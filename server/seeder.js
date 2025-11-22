import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Car from './models/Car.js';
import Booking from './models/Booking.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

const sampleCars = [
  {
    name: 'Toyota Land Cruiser V8',
    brand: 'Toyota',
    model: 'Land Cruiser V8',
    year: 2020,
    category: '4x4',
    transmission: 'Automatic',
    fuelType: 'Diesel',
    seats: 7,
    pricePerDay: 15000,
    images: [],
    features: ['4WD', 'GPS Navigation', 'Leather Seats', 'Sunroof', 'Backup Camera', 'Cruise Control'],
    available: true,
    description: 'Perfect for mountain terrain and long trips. Powerful V8 engine ideal for Swat\'s challenging roads.'
  },
  {
    name: 'Toyota Fortuner',
    brand: 'Toyota',
    model: 'Fortuner',
    year: 2021,
    category: 'SUV',
    transmission: 'Automatic',
    fuelType: 'Diesel',
    seats: 7,
    pricePerDay: 12000,
    images: [],
    features: ['4WD', 'Climate Control', 'Touchscreen', 'Parking Sensors', 'Airbags'],
    available: true,
    description: 'Spacious and comfortable SUV perfect for family trips to Kalam and Malam Jabba.'
  },
  {
    name: 'Honda Civic',
    brand: 'Honda',
    model: 'Civic',
    year: 2022,
    category: 'Sedan',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 5,
    pricePerDay: 8000,
    images: [],
    features: ['Navigation', 'Bluetooth', 'USB Ports', 'Air Conditioning', 'Power Windows'],
    available: true,
    description: 'Comfortable sedan ideal for city tours and smooth highway drives.'
  },
  {
    name: 'Suzuki Jimny',
    brand: 'Suzuki',
    model: 'Jimny',
    year: 2021,
    category: '4x4',
    transmission: 'Manual',
    fuelType: 'Petrol',
    seats: 4,
    pricePerDay: 7000,
    images: [],
    features: ['4WD', 'Off-road Capability', 'Compact Design', 'Fuel Efficient'],
    available: true,
    description: 'Compact 4x4 perfect for adventurous mountain trails and off-road exploration.'
  },
  {
    name: 'Toyota Corolla',
    brand: 'Toyota',
    model: 'Corolla',
    year: 2021,
    category: 'Sedan',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 5,
    pricePerDay: 6000,
    images: [],
    features: ['Cruise Control', 'Bluetooth', 'Backup Camera', 'Keyless Entry'],
    available: true,
    description: 'Reliable and fuel-efficient sedan for comfortable valley tours.'
  },
  {
    name: 'Mitsubishi Pajero',
    brand: 'Mitsubishi',
    model: 'Pajero',
    year: 2019,
    category: '4x4',
    transmission: 'Automatic',
    fuelType: 'Diesel',
    seats: 7,
    pricePerDay: 13000,
    images: [],
    features: ['4WD', 'Super Select 4WD', 'Hill Descent Control', 'Leather Interior'],
    available: true,
    description: 'Rugged and powerful 4x4 for extreme mountain conditions and off-road adventures.'
  },
  {
    name: 'Suzuki Alto',
    brand: 'Suzuki',
    model: 'Alto',
    year: 2022,
    category: 'Hatchback',
    transmission: 'Manual',
    fuelType: 'Petrol',
    seats: 4,
    pricePerDay: 4000,
    images: [],
    features: ['Fuel Efficient', 'Air Conditioning', 'Power Steering'],
    available: true,
    description: 'Budget-friendly option for short trips and city exploration.'
  },
  {
    name: 'Toyota Hiace',
    brand: 'Toyota',
    model: 'Hiace',
    year: 2020,
    category: 'Van',
    transmission: 'Manual',
    fuelType: 'Diesel',
    seats: 15,
    pricePerDay: 10000,
    images: [],
    features: ['Large Cargo Space', 'Multiple Seats', 'Air Conditioning', 'Powerful Engine'],
    available: true,
    description: 'Perfect for large groups and family tours. Spacious and comfortable.'
  },
  {
    name: 'BMW X5',
    brand: 'BMW',
    model: 'X5',
    year: 2021,
    category: 'Luxury',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 5,
    pricePerDay: 20000,
    images: [],
    features: ['Premium Interior', 'Advanced Navigation', 'Panoramic Sunroof', 'Adaptive Cruise Control'],
    available: true,
    description: 'Luxury SUV for those who want to explore Swat in ultimate comfort and style.'
  }
];

const importData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Car.deleteMany();
    await User.deleteMany();
    await Booking.deleteMany();

    console.log('Existing data cleared');

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@swatcarrental.com',
      password: 'admin123',
      phone: '+92 300 1234567',
      cnic: '12345-1234567-1',
      role: 'admin'
    });

    console.log('Admin user created');

    // Create sample cars
    await Car.insertMany(sampleCars);
    console.log('Sample cars created');

    console.log('\n✅ Data Import Successful!');
    console.log('\nAdmin Login Credentials:');
    console.log('Email: admin@swatcarrental.com');
    console.log('Password: admin123');
    console.log('\nTotal Cars Added:', sampleCars.length);

    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await Car.deleteMany();
    await User.deleteMany();
    await Booking.deleteMany();

    console.log('✅ Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

// Run based on command line argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
