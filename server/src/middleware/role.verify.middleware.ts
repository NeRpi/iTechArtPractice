import ApiError from "../error/api.error.ts";
import { NextFunction, Request, Response } from "express";
import RoleService from "../services/role.service.js";

const roleService = new RoleService();
const roleVerifyMiddleware = (requiredRole: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user)
        return next(ApiError.unauthorized("The user is not logged in"));

      const userRole = await roleService.getById(user.roleId!);

      if (!userRole || userRole.role !== requiredRole)
        return res.sendStatus(403);

      next();
    } catch (e) {
      return next(ApiError.internal("Unexpected error!"));
    }
  };
};

export default roleVerifyMiddleware;
