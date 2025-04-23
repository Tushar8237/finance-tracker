import jwt from 'jsonwebtoken';


export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // check if token is present in header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized, authorization denied' });
    }

    // get token from header
    const token = authHeader.split(' ')[1];

    try {
        // Verify token
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        // Attache user to request object
        req.user = decode;
        next();
        
    } catch (error) {
        console.error("Token verification failed:", err.message);
        return res.status(401).json({ message: 'Unauthorized, authorization denied' });
        
    }
}