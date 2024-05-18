const HttpException = require("./root");

class DatabaseError extends HttpException {
    constructor(message) {
        super(message, 500 , null)
    }
}

module.exports = DatabaseError;
