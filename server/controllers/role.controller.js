import RoleService from "../services/role.service.js";

class RoleController {
  constructor() {
    this._roleService = new RoleService();
  }

  create = async (req, res, next) => {
    try {
      const { role } = req.body;
      const result = await this._roleService.create(role);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  };

  getList = async (req, res, next) => {
    try {
      const result = await this._roleService.getList();
      return res.json(result);
    } catch (e) {
      next(e);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await this._roleService.getById(id);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  };

  updateById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { role } = req.body;
      const result = await this._roleService.updateById(id, role);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  };

  deleteById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await this._roleService.deleteById(id);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  };
}

export default new RoleController();
