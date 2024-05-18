const HttpException = require("./root");

class Bad_Request extends HttpException{
    constructor(message){
        super(message, 400 , null)
    }
}

module.exports = Bad_Request;