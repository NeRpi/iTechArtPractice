import UserService from "../services/user.service.js";
import { Request, Response, NextFunction } from "express";

class UserController {
  _userService: UserService;

  constructor() {
    this._userService = new UserService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, surname, DoB, email, password, roleId } = req.body;
      const result = await this._userService.create(
        name,
        surname,
        DoB,
        email,
        password,
        roleId
      );
      return res.json(result);
    } catch (e) {
      next(e);
    }
  };

  getList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this._userService.getList();
      return res.json(result);
    } catch (e) {
      next(e);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this._userService.getById(id);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  };

  getListByRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { roleId } = req.params;
      const result = await this._userService.getListByRole(roleId);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  };

  updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { name, surname, DoB, email, password } = req.body;
      const result = await this._userService.updateById(
        id,
        name,
        surname,
        DoB,
        email,
        password
      );
      return res.json(result);
    } catch (e) {
      next(e);
    }
  };

  deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this._userService.deleteById(id);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  };
}

export default new UserController();
