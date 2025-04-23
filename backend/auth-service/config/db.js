import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const DB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/auth-service';

const connectDB = async () => {
   try {
    await mongoose.connect(DB_URI)
    console.log('MongoDB connected successfully');
   } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit process with failure
   }
}

export default connectDB;