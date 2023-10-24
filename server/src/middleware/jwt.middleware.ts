import ApiError from "../error/api.error.ts";
import TokenService from "../services/token.service.ts";
import { NextFunction, Request, Response } from "express";
import { UserDto } from "../dto/user.dto.js";
import { Socket } from "socket.io";

const tokenService = new TokenService();
export const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    req.user = checkJWT(authorizationHeader, next)!;
    next();
  } catch (e) {
    return next(ApiError.unauthorized("The user is not logged in"));
  }
};

export const jwtSocketMiddleware = (socket: Socket, next: any) => {
  try {
    const authorizationHeader = socket.handshake.headers.token as string;
    socket.data = checkJWT(authorizationHeader, next);
    next();
  } catch (e) {
    return next(ApiError.unauthorized("The user is not logged in"));
  }
};
const checkJWT = (authorizationHeader: string | undefined, next: NextFunction) => {
  try {
    if (!authorizationHeader) return next(ApiError.unauthorized("Access token is missing"));
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) return next(ApiError.unauthorized("Access token is missing"));

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) return next(ApiError.unauthorized("The token is not valid"));

    return new UserDto({ id: userData.userId, roleId: userData.roleId });
  } catch (e) {
    return next(ApiError.unauthorized("The user is not logged in"));
  }
};
