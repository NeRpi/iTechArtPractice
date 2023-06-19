import ApiError from "../error/api.error.js";
import { Request, Response, NextFunction } from "express";

const errorHandlingMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(500).json({ message: "Unexpected error!" });
};

export default errorHandlingMiddleware;
