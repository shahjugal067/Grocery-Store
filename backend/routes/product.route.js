import express from 'express'
import formidable from 'express-formidable'
import checkId from '../middleware/checkid.js'
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';
import { addProduct,updateProductDetails,removeProduct,fetchProducts,
    fetchProductById,fetchAllProducts, addProductReview,fetchTopProducts,
    fetchNewProducts,
} from '../controllers/product.controller.js';

const router = express.Router()

router.route('/').post(authenticate,authorizeAdmin,formidable(),addProduct)
router.route('/:id').put(authenticate,authorizeAdmin,formidable(), updateProductDetails)
router.route('/:id').delete(authenticate,authorizeAdmin,removeProduct);
router.route('/').get(fetchProducts);
router.route('/:id').get(fetchProductById)
router.route('/allproducts').get(fetchAllProducts);
router.route('/:id/reviews').post(authenticate,checkId,addProductReview)

router.get('/top',fetchTopProducts)

router.route('/new',fetchNewProducts)

export default router