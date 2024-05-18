const jwt = require("jsonwebtoken");
const UserSchema = require("../../modules/models/userSchema");
const constants = require("../constants/appConstants");
const appLogger = require("../../config/appLogger");

async function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // Verify the access token
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        // If token has expired or is invalid
        if (err.name === "TokenExpiredError") {
          // Check if there's a refresh token in the request
          const refreshToken = req.headers.refresh_token;
          if (!refreshToken) {
            return res
              .status(401)
              .json({
                error:
                  "Unauthorized: Access token expired and no refresh token provided",
              });
          }

          try {
            // Verify the refresh token
            const decodedRefreshToken = jwt.verify(
              refreshToken,
              process.env.REFRESH_TOKEN_SECRET
            );
            // If refresh token is valid, issue a new access token and proceed
            const newAccessToken = jwt.sign(
              { userId: decodedRefreshToken.userId },
              process.env.SECRET_KEY,
              { expiresIn: constants.TOKENS.ACCESS_TOKEN_EXPIRY }
            );
            req.headers.authorization = `Bearer ${newAccessToken}`;
            decoded = decodedRefreshToken;
          } catch (refreshTokenError) {
            // If refresh token is invalid or expired
            return res
              .status(401)
              .json({
                error: "Unauthorized: Refresh token invalid or expired",
              });
          }
        } else {
          // Other token verification errors
          return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }
      }

      // Token is valid, extract user data and proceed
      const { userId } = decoded;
      const userData = await UserSchema.findOne({ userId });

      if (!userData) {
        return res.status(401).json({ error: "Unauthorized: User not found" });
      }

      req.user = decoded;
      req.userData = userData;
      return next();
    });
  } catch (error) {
    appLogger.error("Middleware error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = authMiddleware;
