import jwt, { JwtPayload } from "jsonwebtoken";
import ApiError from "../error/api.error.ts";

export default class TokenService {
  generateTokens(payload: object) {
    try {
      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
        expiresIn: "30m",
      });
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
        expiresIn: "30d",
      });

      return { accessToken, refreshToken };
    } catch (e) {
      throw ApiError.internal("Failed to generate tokens!");
    }
  }

  validateAccessToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as JwtPayload;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as JwtPayload;
    } catch (e) {
      return null;
    }
  }
}
