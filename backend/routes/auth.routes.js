import express from 'express';
import { validate } from './../middlewares/validate.middleware.js';
import { loginSchema, registerSchema } from './../validation/auth.validation.js';
import { loginUser, logoutUser, refreshAccessToken, registerUser } from '../controllers/auth.controllers.js';



const router = express.Router();

// Register route
router.post('/register', validate(registerSchema), registerUser)
// Login route
router.post('/login', validate(loginSchema), loginUser)
// Refresh token route
router.post('/refresh', refreshAccessToken);
// Logout route
router.post('/logout', logoutUser);

export default router;
