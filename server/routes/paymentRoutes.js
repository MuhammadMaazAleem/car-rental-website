import express from 'express';
const router = express.Router();
import {
  initializePayment,
  verifyJazzCashPayment,
  verifyEasyPaisaPayment,
  uploadBankReceipt,
  verifyBankPayment,
  getPaymentStatus
} from '../controllers/paymentController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.post('/initialize', protect, initializePayment);
router.post('/jazzcash/verify', verifyJazzCashPayment);
router.post('/easypaisa/verify', verifyEasyPaisaPayment);
router.post('/easypaisa/callback', verifyEasyPaisaPayment);
router.post('/bank/receipt', protect, uploadBankReceipt);
router.put('/bank/verify/:id', protect, admin, verifyBankPayment);
router.get('/status/:bookingId', protect, getPaymentStatus);

export default router;
