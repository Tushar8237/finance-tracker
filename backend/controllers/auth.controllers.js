import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

// Register a new user
export const registerUser = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hashSync(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        // Generate tokens
        const accessToken = generateAccessToken(newUser);
        const refreshToken = generateRefreshToken(newUser);

        // Remove the password and confirmPassword form the response
        const userWithoutPassword = newUser.toObject();

        delete userWithoutPassword.password;
        delete userWithoutPassword.confirmPassword;

        // Return the user data without password
        return res.status(201).json({
            success: true,
            user: userWithoutPassword,
            accessToken,
            refreshToken,
        });
    } catch (error) {
        console.error("Register Error:", error.message);
        res.status(500).json({ message: "Server error during registration" });
    }
};

// Login a user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Remove the password and confirmPassword form the response
        // Remove the password and confirmPassword form the response
        const userWithoutPassword = user.toObject();

        delete userWithoutPassword.password;
        delete userWithoutPassword.confirmPassword;

        // Return the user data without password
        return res.status(201).json({
            success: true,
            user: userWithoutPassword,
            accessToken,
            refreshToken,
        });
    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ message: "Server error during login" });
    }
};

// Refresh access token
export const refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token is required" });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        // Verify the refresh token
        const user = await User.findOne({ refreshToken });

        if (!user) {
            return res.status(403).json({ message: "User not found" });
        }

        // Generate a new access token
        const newAccessToken = generateAccessToken(user);

        return res.status(200).json({ newAccessToken });
    } catch (error) {
        console.error("Refresh Token Error:", error.message);
        res.status(500).json({ message: "Server error during token refresh" });
    }
};

// Logout a user
export const logoutUser = async (req, res, next) => {
    try {
        res.status(200).json({
            message: "User Logged out successfully",
        });
    } catch (error) {
        console.error("Logout Error:", error.message);
        res.status(500).json({ message: "Server error during logout" });
    }
};
