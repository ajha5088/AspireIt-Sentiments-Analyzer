const HttpException = require("./root");

class Validate_Request extends HttpException {
    constructor(message, errors) {
        super(message, 422, errors);
    }
}

module.exports = Validate_Request;
