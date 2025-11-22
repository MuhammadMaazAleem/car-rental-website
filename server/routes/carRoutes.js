import express from 'express';
import {
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar
} from '../controllers/carController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getCars)
  .post(protect, admin, upload.array('images', 5), createCar);

router.route('/:id')
  .get(getCar)
  .put(protect, admin, upload.array('images', 5), updateCar)
  .delete(protect, admin, deleteCar);

export default router;
