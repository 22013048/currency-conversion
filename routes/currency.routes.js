import { Router } from 'express';
import { convert, getRates, getCurrencies } from '../controllers/currency.controller.js';
import  validate from '../middleware/validate.js';


const router = Router();

router.get('/convert', validate.convertQuery, convert);
router.get('/rates', getRates);
router.get('/currencies', getCurrencies);

export default router;
