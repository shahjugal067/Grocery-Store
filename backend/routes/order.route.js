import express from 'express';

import { createOrder,getAllOrders ,getUsersOrders,countTotalOrders,calculateTotalSales,
    calculateTotalSalesByDate,findOrderById,markOrderAsPaid,markOrderAsDelivered,
} from '../controllers/order.controller.js';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';

const router = express.Router()

router.route('/').post(authenticate,createOrder)
router.route('/').get(authenticate,authorizeAdmin,getAllOrders)
router.route('/mine').get(authenticate,getUsersOrders)

router.route('/total-orders').get(countTotalOrders);

router.route('/total-sales').get(calculateTotalSales)
router.route('/total-sales-by-date').get(calculateTotalSalesByDate)

router.route('/:id').get(authenticate,findOrderById)
router.route('/:id/pay').put(authenticate,markOrderAsPaid)
router.route('/:id/deliver').put(authenticate,markOrderAsDelivered)


export default router


