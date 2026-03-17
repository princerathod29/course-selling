import express from 'express';
import { protectRoute } from '../middleware/user.middleware.js';
import { checkoutSuccess, createCheckOutSession } from '../controllers/payment.controller.js';

const paymentRoute = express.Router()

paymentRoute.post('/checkout',protectRoute, createCheckOutSession)
paymentRoute.post('/checkout-success', protectRoute, checkoutSuccess)

export default paymentRoute