const appLogger = require("../../config/appLogger");
const Bad_Request = require("../../exceptions/badRequest");
const Validate_Request = require("../../exceptions/validateRequest");
const errorHandler = require("../../utils/responseHandlers/errorHandler");
const successHandler = require("../../utils/responseHandlers/successHandler");
const AuthService = require("../services/authService");
const { registerSchema, loginSchema } = require("../validations/authValidation");

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  register = async (req,res , next) => {
    try {
        appLogger.info("contollers - authController - register - start")
        const validationResult = registerSchema.validate(req.body)
        if (validationResult.error) {
            throw new Validate_Request('Validation failed', validationResult.error);
        }
        if(req.body.password !== req.body.confirmPassword){
            throw new Bad_Request("passwords do not match")
        }
        const response = await this.authService.register(req.body)
        appLogger.info("contollers - authController - register - end")
        successHandler(res, response)
    } catch (error) {
        appLogger.error("controllers - authController - register - error")
        appLogger.error(error)
        errorHandler(res, error.statusCode || 500, error.message || "Internal Server Error", error.errors || []);
    }
  }

  login = async (req,res) =>{
    try {
        appLogger.info("contollers - authController - login - start")
        const validationResult = loginSchema.validate(req.body)
        if (validationResult.error) {
            throw new Validate_Request('Validation failed', validationResult.error);
        }
        const response = await this.authService.login(req.body)
        appLogger.info("contollers - authController - login - start")
        successHandler(res,response)
    } catch (error) {
        appLogger.error("controllers - authController - login - error")
        appLogger.error(error)
        errorHandler(res, error.statusCode || 500, error.message || "Internal Server Error", error.errors || []);
    }
  }
}

module.exports = AuthController;
