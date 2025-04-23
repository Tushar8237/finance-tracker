import mongoose from "mongoose";

// Define the user schema
// This schema defines the structure of the user document in the MongoDB database
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim : true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim : true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim : true
    },
    confirmPassword: {
        type: String,
        required: true,
        trim : true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;