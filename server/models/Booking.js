import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  pickupDate: {
    type: Date,
    required: [true, 'Please add pickup date']
  },
  returnDate: {
    type: Date,
    required: [true, 'Please add return date']
  },
  pickupLocation: {
    type: String,
    required: [true, 'Please add pickup location'],
    enum: ['Mingora', 'Kalam', 'Malam Jabba', 'Bahrain', 'Swat Motorway', 'Other']
  },
  dropoffLocation: {
    type: String,
    default: 'Same as pickup'
  },
  totalPrice: {
    type: Number,
    required: true
  },
  numberOfDays: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  paymentMethod: {
    type: String,
    required: [true, 'Please select payment method'],
    enum: ['Cash on Delivery', 'Bank Transfer', 'JazzCash', 'EasyPaisa', 'Credit Card']
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed', 'Pending Verification'],
    default: 'Pending'
  },
  paymentReference: {
    type: String
  },
  paymentReceipt: {
    type: String
  },
  needDriver: {
    type: Boolean,
    default: false
  },
  driverCharge: {
    type: Number,
    default: 0
  },
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate total price before saving
bookingSchema.pre('save', function(next) {
  if (this.pickupDate && this.returnDate) {
    const days = Math.ceil((this.returnDate - this.pickupDate) / (1000 * 60 * 60 * 24));
    this.numberOfDays = days;
  }
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
