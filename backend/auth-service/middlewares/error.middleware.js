
const errorHandler = (err, req, res, next) => {
    // Use the status code from the error or default to 500
    let statusCode = err.statusCode || 500; 
    // Use the message from the error or default to a generic message
    let message = err.message || 'Something went wrong'; 

    // Handle MongoDB validation errors
    if (err.message === 'ValidationError') {
        message = Object.values(err.errors).map((val) => val.message).join(', ');
        statusCode = 400; // Bad Request
    }

    // Handle CastError for invalid ObjectId
    if (err.name === 'CastError') {
        message = `Resource not found. Invalid: ${err.path}`;
        statusCode = 404; // Not Found
    }

    // Handle duplicate key errors
    if (err.code === 11000) {
        message = `Duplicate field value entered: ${Object.keys(err.keyValue).join(', ')}`;
        statusCode = 400; // Bad Request
    }

    res.status(statusCode).json({
        success : false,
        message,
        stack : process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

export default errorHandler;