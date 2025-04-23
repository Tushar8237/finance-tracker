import express from 'express';
import { validate } from '../middlewares/validate.middleware.js';
import { transactionSchema } from './../validation/transaction.validation.js';
import { createTransaction } from './../controllers/transaction.controllers.js';
import authMiddleware from './../middlewares/auth.middleware.js';


const router = express.Router();


router.post('/create', authMiddleware, validate(transactionSchema), createTransaction)

export default router;