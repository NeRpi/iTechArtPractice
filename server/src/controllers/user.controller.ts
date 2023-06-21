import UserService from "../services/user.service.ts";
import MinioService from "../services/minio.service.ts";
import { Request, Response, NextFunction } from "express";
import { UserDto } from "../dto/user.dto.ts";
import path from "path";

class UserController {
  private userService: UserService;
  private minioService: MinioService;

  constructor() {
    this.userService = new UserService();
    this.minioService = new MinioService();
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

  importUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req.file;
      this.minioService.uploadFile(file?.path as string, {
        "Content-type": "text/csv",
      });
      return res.json(await this.userService.importUsers(file?.path as string));
    } catch (e) {
      next(e);
    }
  };
  exportUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.sendFile(path.resolve(await this.userService.exportUsers()));
    } catch (e) {
      next(e);
    }
  };
}

export default new UserController();
