const HttpException = require("./root")

class Internal_Exception extends HttpException{
    constructor(message , errors ){
        super(message, 500 , errors)
    }
}

module.exports = Internal_Exception;