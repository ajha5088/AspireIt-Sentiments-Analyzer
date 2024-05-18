const UserSchema = require("../models/userSchema");
const appLogger = require("../../config/appLogger");
const DatabaseError = require("../../exceptions/dbError");
const Not_Found = require("../../exceptions/notFound");

class AuthRepo {
  constructor() {
    this.userSchema = UserSchema;
  }
  async register(body) {
    try {
      appLogger.info("repositories - authRepo - register - start");
      const response = await this.userSchema.create(body);
      appLogger.info("repositories - authRepo - register - end");
      const responseData = { ...response.toObject() };
      delete responseData.password;

      return responseData;
    } catch (error) {
      if (error.code === 11000) {
        // Email address already exists
        throw new DatabaseError("Email address is already registered");
      } else {
        // Other database errors
        appLogger.error("repositories - authRepo - register - error");
        appLogger.error(error.message);
        throw new DatabaseError(error.message);
      }
    }
  }

  findUser = async (email) => {
    try {
      appLogger.info("repositories - authRepo - findUser - start");
      const response = await this.userSchema.findOne({ email }).lean();
      appLogger.info("repositories - authRepo - register - end");
      return response;
    } catch (error) {
      appLogger.error("repositories - authRepo - findUser - error");
      appLogger.error(error.message);
      throw new DatabaseError(error.message);
    }
  };

  updateUserTokens = async (
    userId,
    access_token,
    refresh_token,
    access_token_expires_at,
    refresh_token_expires_at
  ) => {
    try {
      appLogger.info("repositories - authRepo - updateUserTokens - start");
      const response = await this.userSchema.updateOne(
        { userId },
        {
          $set: {
            access_token,
            refresh_token,
            access_token_expires_at,
            refresh_token_expires_at,
          },
        }
      );
      appLogger.info("repositories - authRepo - updateUserTokens - end");
      return response;
    } catch (error) {
      appLogger.error("repositories - authRepo - updateUserTokens - error");
      appLogger.error(error.message);
      throw new DatabaseError(error.message);
    }
  };
}

module.exports = AuthRepo;
