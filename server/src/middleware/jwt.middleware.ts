import ApiError from "../error/api.error.ts";
import TokenService from "../services/token.service.ts";
import { NextFunction, Request, Response } from "express";

const tokenService = new TokenService();
const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader)
      return next(ApiError.unauthorized("Access token is missing"));

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken)
      return next(ApiError.unauthorized("Access token is missing"));

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) return next(ApiError.unauthorized("The token is not valid"));

    // req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.unauthorized("The user is not logged in"));
  }
};

export default jwtMiddleware;
