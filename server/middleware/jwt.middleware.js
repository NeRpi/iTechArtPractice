import ApiError from "../error/api.error.js";
import TokenService from "../services/token.service.js";

const tokenService = new TokenService();
const jwtMiddleware = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader)
      return next(ApiError.unauthorized("Access token is missing"));

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken)
      return next(ApiError.unauthorized("Access token is missing"));

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) return next(ApiError.unauthorized("The token is not valid"));

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.unauthorized("The user is not logged in"));
  }
};

export default jwtMiddleware;
