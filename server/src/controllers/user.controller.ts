import UserService from "../services/user.service.js";
import { Request, Response, NextFunction } from "express";
import { UserDto } from "../dto/user.dto.js";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userDto = new UserDto(req.body);
      const result = await this.userService.create(userDto);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  };

  getList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.userService.getList();
      return res.json(result);
    } catch (e) {
      next(e);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.userService.getById(id);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  };

  getListByRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { roleId } = req.params;
      const result = await this.userService.getListByRole(roleId);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  };

  updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userDto = new UserDto(req.body);
      userDto.id = req.params.id;
      const result = await this.userService.updateById(userDto);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  };

  deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.userService.deleteById(id);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  };
}

export default new UserController();
