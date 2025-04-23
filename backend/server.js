import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5001;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Auth Service is running on port http://localhost:${PORT}`);
    })
}).catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1); // Exit the process with failure
});
