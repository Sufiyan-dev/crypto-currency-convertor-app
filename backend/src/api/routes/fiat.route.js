import express from 'express';
import { getAllFiatSupported } from '../controllers/fiat.controller.js';
const router = express.Router();

router.get('/fiat/all',getAllFiatSupported)

export default router;