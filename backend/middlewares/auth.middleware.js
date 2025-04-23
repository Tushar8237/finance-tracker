import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// Middleware to protect routes
const authMiddleware = async ( req, res, next ) => {
    let token;

    // Check if token is sent in headers
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            //  Get token and decode
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user and attach to request object
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401);
            next(new Error('Not authorized, invalid token'));
        }
    }

    if (!token) {
        res.status(401);
        next(new Error('Not authorized, no token'));
    }
}

export default authMiddleware;