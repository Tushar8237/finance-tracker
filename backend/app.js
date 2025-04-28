import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Routes
import authRoutes from './routes/auth.routes.js';
import transactionRoues from './routes/transaction.routes.js';

import errorHandler from './middlewares/error.middleware.js';

dotenv.config();
const app = express();

// Middlewares
const allowedOrigins = [process.env.FRONTEND_URL_1, process.env.FRONTEND_URL_2];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // if you're using cookies / JWT tokens
}));

app.use(express.json()); // Parse JSON request bodies

// Middleware
// app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Auth Service is running');
})


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoues);


// Global Error handling middleware
app.use(errorHandler)

export default app;