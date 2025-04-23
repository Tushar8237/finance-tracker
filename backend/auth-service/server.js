import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5001;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Auth Service is running on port http://localhost:${PORT}`);
    })
})