const HttpException = require("./root");

class Unauthorized extends HttpException {
    constructor(message , errorCode , errors){
        super(message, errorCode, 422 , errors )

    }
}

module.exports = Unauthorized;