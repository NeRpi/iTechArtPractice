import UserService from "../services/user.service.js";

class UserController {
  constructor() {
    this._userService = new UserService();
  }

  create = async (req, res) => {
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
  };

  getList = async (req, res) => {
    const { roleId } = req.query;
    let result;
    if (roleId) result = await this._userService.getListByRole(roleId);
    else result = await this._userService.getList();
    return res.json(result);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const result = await this._userService.getById(id);
    return res.json(result);
  };

  updateById = async (req, res) => {
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
  };

  deleteById = async (req, res) => {
    const { id } = req.params;
    const result = await this._userService.deleteById(id);
    return res.json(result);
  };
}

export default new UserController();
