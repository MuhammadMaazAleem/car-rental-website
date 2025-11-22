import Booking from '../models/Booking.js';
import {
  createJazzCashPayment,
  createEasyPaisaPayment,
  verifyJazzCashPayment as verifyJC,
  verifyEasyPaisaPayment as verifyEP,
  bankConfig
} from '../config/paymentGateways.js';

// @desc    Initialize payment
// @route   POST /api/payments/initialize
// @access  Private
export const initializePayment = async (req, res) => {
  try {
    const { bookingId, paymentMethod } = req.body;

    const booking = await Booking.findById(bookingId).populate('car');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const bookingData = {
      bookingId: booking._id.toString(),
      totalAmount: booking.totalPrice,
      carName: booking.car.name,
      userEmail: req.user.email,
      userPhone: req.user.phone
    };

    let paymentResponse;

    switch (paymentMethod) {
      case 'jazzcash':
        paymentResponse = await createJazzCashPayment(bookingData);
        booking.paymentMethod = 'JazzCash';
        booking.paymentReference = paymentResponse.txnRefNumber;
        break;

      case 'easypaisa':
        paymentResponse = await createEasyPaisaPayment(bookingData);
        booking.paymentMethod = 'EasyPaisa';
        booking.paymentReference = paymentResponse.orderId;
        break;

      case 'bank':
        paymentResponse = {
          paymentMethod: 'bank',
          bankDetails: bankConfig,
          bookingId: booking._id,
          amount: booking.totalPrice,
          instructions: 'Please transfer the amount to the bank account and upload the payment receipt.'
        };
        booking.paymentMethod = 'Bank Transfer';
        booking.paymentReference = `BANK${Date.now()}`;
        break;

      default:
        return res.status(400).json({ message: 'Invalid payment method' });
    }

    booking.paymentStatus = 'Pending';
    await booking.save();

    res.json({
      success: true,
      paymentResponse
    });
  } catch (error) {
    console.error('Payment initialization error:', error);
    res.status(500).json({ message: 'Error initializing payment', error: error.message });
  }
};

// @desc    Verify JazzCash payment
// @route   POST /api/payments/jazzcash/verify
// @access  Public
export const verifyJazzCashPayment = async (req, res) => {
  try {
    const paymentData = req.body;
    const isValid = verifyJC(paymentData);

    if (!isValid) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    const booking = await Booking.findOne({ paymentReference: paymentData.pp_TxnRefNo });
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.paymentStatus = 'Completed';
    booking.status = 'Confirmed';
    await booking.save();

    res.json({
      success: true,
      message: 'Payment verified successfully',
      bookingId: booking._id
    });
  } catch (error) {
    console.error('JazzCash verification error:', error);
    res.status(500).json({ message: 'Error verifying payment', error: error.message });
  }
};

// @desc    Verify EasyPaisa payment
// @route   POST /api/payments/easypaisa/verify
// @access  Public
export const verifyEasyPaisaPayment = async (req, res) => {
  try {
    const paymentData = req.body;
    const isValid = verifyEP(paymentData);

    if (!isValid) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    const booking = await Booking.findOne({ paymentReference: paymentData.orderId });
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.paymentStatus = 'Completed';
    booking.status = 'Confirmed';
    await booking.save();

    res.json({
      success: true,
      message: 'Payment verified successfully',
      bookingId: booking._id
    });
  } catch (error) {
    console.error('EasyPaisa verification error:', error);
    res.status(500).json({ message: 'Error verifying payment', error: error.message });
  }
};

// @desc    Upload bank payment receipt
// @route   POST /api/payments/bank/receipt
// @access  Private
export const uploadBankReceipt = async (req, res) => {
  try {
    const { bookingId, receiptImage } = req.body;

    const booking = await Booking.findById(bookingId);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    booking.paymentReceipt = receiptImage;
    booking.paymentStatus = 'Pending Verification';
    await booking.save();

    res.json({
      success: true,
      message: 'Receipt uploaded successfully. Payment will be verified by admin.',
      booking
    });
  } catch (error) {
    console.error('Receipt upload error:', error);
    res.status(500).json({ message: 'Error uploading receipt', error: error.message });
  }
};

// @desc    Admin verify bank payment
// @route   PUT /api/payments/bank/verify/:id
// @access  Private/Admin
export const verifyBankPayment = async (req, res) => {
  try {
    const { approve } = req.body;
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (approve) {
      booking.paymentStatus = 'Completed';
      booking.status = 'Confirmed';
    } else {
      booking.paymentStatus = 'Failed';
      booking.status = 'Cancelled';
    }

    await booking.save();

    res.json({
      success: true,
      message: `Payment ${approve ? 'approved' : 'rejected'} successfully`,
      booking
    });
  } catch (error) {
    console.error('Bank verification error:', error);
    res.status(500).json({ message: 'Error verifying payment', error: error.message });
  }
};

// @desc    Get payment status
// @route   GET /api/payments/status/:bookingId
// @access  Private
export const getPaymentStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json({
      success: true,
      paymentStatus: booking.paymentStatus,
      paymentMethod: booking.paymentMethod,
      paymentReference: booking.paymentReference,
      bookingStatus: booking.status
    });
  } catch (error) {
    console.error('Get payment status error:', error);
    res.status(500).json({ message: 'Error getting payment status', error: error.message });
  }
};
