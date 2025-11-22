import express from 'express';
import {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking
} from '../controllers/bookingController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getBookings)
  .post(protect, createBooking);

router.route('/:id')
  .get(protect, getBooking)
  .put(protect, updateBooking)
  .delete(protect, admin, deleteBooking);

export default router;
