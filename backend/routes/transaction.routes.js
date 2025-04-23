import express from 'express';
import { validate } from '../middlewares/validate.middleware.js';
import { transactionSchema } from './../validation/transaction.validation.js';
import { createTransaction, deleteTransaction, getAllTransactions, getPieChartData, getTotalIncomeExpense, updateTransaction } from './../controllers/transaction.controllers.js';
import authMiddleware from './../middlewares/auth.middleware.js';


const router = express.Router();

// Create a new transaction
router.post('/create', authMiddleware, validate(transactionSchema), createTransaction)

// Get all transactions filter + search + pagination
router.get('/', authMiddleware, getAllTransactions);

// Update a transaction
router.put('/:id', authMiddleware, validate(transactionSchema), updateTransaction)

// Delete a transaction
router.delete('/:id', authMiddleware, deleteTransaction);

// Get summary of transactions
router.get('/summary', authMiddleware, getTotalIncomeExpense);

// Get summary of transactions
router.get('/pie-summary', authMiddleware, getPieChartData);

export default router;