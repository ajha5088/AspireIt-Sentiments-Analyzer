class HttpException extends Error {
    constructor(message, statusCode, errors) {
        super(message);
        this.statusCode = statusCode || 500;
        this.errors = errors || [];
    }
}

module.exports = HttpException;
