import express from 'express';
import { getAllCryptoSupported } from '../controllers/crypto.controller.js';
const router = express.Router();

router.get('/crypto/all',getAllCryptoSupported)

export default router;