const HttpException = require("./root")

class Not_Found extends HttpException{
    constructor(message ){
        super(message, 404 , null)
    }
}

module.exports = Not_Found;