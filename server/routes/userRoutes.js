import express from 'express';
import {
  getUsers,
  updateUser,
  deleteUser
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, admin, getUsers);

router.route('/:id')
  .put(protect, updateUser)
  .delete(protect, admin, deleteUser);

export default router;
