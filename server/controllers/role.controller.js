import RoleService from "../services/role.service.js";

class RoleController {
  constructor() {
    this._roleService = new RoleService();
  }

  create = async (req, res) => {
    const { role } = req.body;
    const result = await this._roleService.create(role);
    return res.json(result);
  };

  getList = async (req, res) => {
    const result = await this._roleService.getList();
    return res.json(result);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const result = await this._roleService.getById(id);
    return res.json(result);
  };

  updateById = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    const result = await this._roleService.updateById(id, role);
    return res.json(result);
  };

  deleteById = async (req, res) => {
    const { id } = req.params;
    const result = await this._roleService.deleteById(id);
    return res.json(result);
  };
}

export default new RoleController();
