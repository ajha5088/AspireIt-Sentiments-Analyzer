function errorHandler(res, statusCode, message, errors) {
    res.status(statusCode).json({
        success: false,
        error: {
            message: message,
            errors: errors || []
        }
    });
}

module.exports = errorHandler;