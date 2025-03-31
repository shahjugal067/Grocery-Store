import express from 'express'
import formidable from 'express-formidable'
import checkId from '../middleware/checkid.js'
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';
import { addProduct } from '../controllers/product.controller.js';

const router = express.Router()

router.route('/').post(authenticate,authorizeAdmin,formidable(),addProduct)


export default router