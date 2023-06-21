import RoleService from "../services/role.service.ts";
import { Request, Response, NextFunction } from "express";

class RoleController {
  private roleService: RoleService;

  constructor() {
    this.roleService = new RoleService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { role } = req.body;
      const result = await this.roleService.create(role);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  };

  getList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.roleService.getList();
      return res.json(result);
    } catch (e) {
      next(e);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.roleService.getById(id);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  };

  updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { role } = req.body;
      const result = await this.roleService.updateById(id, role);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  };

  deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.roleService.deleteById(id);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  };
}

export default new RoleController();
