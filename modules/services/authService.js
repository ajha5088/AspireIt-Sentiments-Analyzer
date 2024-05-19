const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const appLogger = require("../../config/appLogger");
const AuthRepo = require("../repositories/authRepo");
const DatabaseError = require("../../exceptions/dbError");
const Bad_Request = require("../../exceptions/badRequest");
const appConstants = require("../../utils/constants/appConstants");
const Internal_Exception = require("../../exceptions/internalException");
const Not_Found = require("../../exceptions/notFound");

class AuthService {
  constructor() {
    this.authRepo = new AuthRepo();
  }

  register = async (body) => {
    try {
      appLogger.info("services - authService - register - start");
      body.password = await bcrypt.hash(body.password, 10);
      let params = {
        userId: uuid.v4(),
        email: body.email,
        password: body.password,
      };
      const response = await this.authRepo.register(params);
      appLogger.info("services - authService - register - end");
      return response;
    } catch (error) {
      if (error instanceof DatabaseError) {
        throw error;
      }
      appLogger.error("controllers - authController - register - error");
      throw new Internal_Exception(
        "Internal Error while registring ",
        error.message
      );
    }
  };

  login = async (body) => {
    try {
      appLogger.info("services - authService - login - start");
      const authenticateUser = await this.authRepo.findUser(body.email);
      if (!authenticateUser) {
        throw new Not_Found("user for the provided email not found");
      }
      const passwordMatch = await bcrypt.compare(
        body.password,
        authenticateUser.password
      );
      if (!passwordMatch) {
        throw new Bad_Request("Incorrect password");
      }

      const tokenPayload = {
        userId: authenticateUser.userId,
        email: body.email,
      };

      const refreshTokenPayload = {
        userId: authenticateUser.userId,
        tokenType: "refresh",
      };

      const secretKey = process.env.SECRET_KEY;
      const refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET;
      const expiresIn = appConstants.TOKENS.ACCESS_TOKEN_EXPIRY;
      const refreshTokenExpiresIn = appConstants.TOKENS.REFRESH_TOKEN_EXPIRY;

      const accessToken = jwt.sign(tokenPayload, secretKey, { expiresIn });
      const refreshToken = jwt.sign(
        refreshTokenPayload,
        refreshTokenSecretKey,
        { expiresIn: refreshTokenExpiresIn }
      );

      await this.authRepo.updateUserTokens(
        authenticateUser.userId,
        accessToken,
        refreshToken,
        new Date(Date.now() + expiresIn * 1000),
        new Date(Date.now() + refreshTokenExpiresIn * 1000)
      );
      appLogger.info("services - authService - register - end");
      return {
        email: authenticateUser.email,
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } catch (error) {
      if (error instanceof DatabaseError) {
        throw error;
      }
      appLogger.error("controllers - authController - register - error");
      throw new Internal_Exception(
        "Internal Error while login.",
        error.message
      );
    }
  };
}

module.exports = AuthService;
