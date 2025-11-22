import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a car name'],
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'Please add a brand'],
    trim: true
  },
  model: {
    type: String,
    required: [true, 'Please add a model'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Please add manufacture year']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['SUV', 'Sedan', '4x4', 'Hatchback', 'Van', 'Luxury']
  },
  transmission: {
    type: String,
    required: [true, 'Please add transmission type'],
    enum: ['Automatic', 'Manual']
  },
  fuelType: {
    type: String,
    required: [true, 'Please add fuel type'],
    enum: ['Petrol', 'Diesel', 'Hybrid', 'Electric']
  },
  seats: {
    type: Number,
    required: [true, 'Please add number of seats'],
    min: 2,
    max: 15
  },
  pricePerDay: {
    type: Number,
    required: [true, 'Please add price per day']
  },
  images: [{
    type: String
  }],
  features: [{
    type: String
  }],
  available: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Car = mongoose.model('Car', carSchema);

export default Car;
