import Booking from '../models/Booking.js';
import Car from '../models/Car.js';

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req, res) => {
  try {
    const {
      car,
      pickupDate,
      returnDate,
      pickupLocation,
      dropoffLocation,
      paymentMethod,
      needDriver,
      notes
    } = req.body;

    // Check if car exists and is available
    const carExists = await Car.findById(car);
    
    if (!carExists) {
      return res.status(404).json({ message: 'Car not found' });
    }

    if (!carExists.available) {
      return res.status(400).json({ message: 'Car is not available' });
    }

    // Calculate number of days
    const days = Math.ceil((new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24));
    
    if (days <= 0) {
      return res.status(400).json({ message: 'Invalid date range' });
    }

    // Calculate total price
    let totalPrice = carExists.pricePerDay * days;
    let driverCharge = 0;

    // Add driver charge if needed (e.g., 2000 PKR per day)
    if (needDriver) {
      driverCharge = 2000 * days;
      totalPrice += driverCharge;
    }

    const booking = await Booking.create({
      user: req.user._id,
      car,
      pickupDate,
      returnDate,
      pickupLocation,
      dropoffLocation: dropoffLocation || 'Same as pickup',
      totalPrice,
      numberOfDays: days,
      paymentMethod,
      needDriver: needDriver || false,
      driverCharge,
      notes
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate('car', 'name brand model images pricePerDay')
      .populate('user', 'name email phone');

    res.status(201).json({
      success: true,
      data: populatedBooking
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private
export const getBookings = async (req, res) => {
  try {
    let query = {};

    // If not admin, only show user's bookings
    if (req.user.role !== 'admin') {
      query.user = req.user._id;
    }

    // Filter by status if provided
    if (req.query.status) {
      query.status = req.query.status;
    }

    const bookings = await Booking.find(query)
      .populate('car', 'name brand model images pricePerDay category')
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
export const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('car')
      .populate('user', 'name email phone cnic');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user owns this booking or is admin
    if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this booking' });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Private
export const updateBooking = async (req, res) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check authorization
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this booking' });
    }

    // Only allow certain updates based on role
    if (req.user.role === 'admin') {
      // Admin can update status and payment status
      booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      }).populate('car user');
    } else {
      // Users can only cancel their bookings
      if (req.body.status === 'cancelled') {
        booking.status = 'cancelled';
        await booking.save();
      } else {
        return res.status(403).json({ message: 'Not authorized to perform this action' });
      }
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private/Admin
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await booking.deleteOne();

    res.json({
      success: true,
      message: 'Booking removed'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
