import express from 'express';

import { createOrder } from '../controllers/order.controller.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router()

router.route('/').post(authenticate,createOrder)

export default router


