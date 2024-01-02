import express from 'express';
import { getPriceOfSpecificCrypto } from '../controllers/price.controller.js';
const router = express.Router();

router.get('/price/crypto',getPriceOfSpecificCrypto)

export default router;