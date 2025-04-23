import express from 'express';
import cors from 'cors';

// Routes
import authRoutes from './routes/auth.routes.js';
import errorHandler from './middlewares/error.middleware.js';


const app = express();


// // Middleware
// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true
//   }));
// app.use(express.json()); // Parse JSON request bodies

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Auth Service is running');
})


// Routes
app.use('/api/auth', authRoutes);

// Global Error handling middleware
app.use(errorHandler)

export default app;