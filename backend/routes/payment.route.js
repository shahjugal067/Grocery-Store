import express from 'express'



import {
  getStripeKey,
  createStripeSession} from '../controllers/payment.controller.js'

const router = express.Router();

router.get('/stripe-key', getStripeKey);
router.post('/create-payment-intent', createStripeSession);

export default router
