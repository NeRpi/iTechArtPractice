import UserEntity from "../db/entitys/user.entity.js";
import userEntity from "../db/entitys/user.entity.js";

class UserController {
  async createUser(req, res) {
    try {
      const { name, surname, DoB, email, password } = req.body;
      const user = await UserEntity.create({
        name,
        surname,
        DoB,
        email,
        password,
      });
      return res.json(user);
    } catch (e) {
      return res.json(e);
    }
  }

  async getUsers(req, res) {
    const users = await UserEntity.findAll();
    return res.json(users);
  }

  async getUserById(req, res) {
    const { id } = req.params;
    const user = await UserEntity.findOne({ where: { id } });
    return res.json(user);
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, surname, DoB, email, password } = req.body;
      const user = await UserEntity.update(
        { name, surname, DoB, email, password },
        { where: { id } }
      );
      res.json(user);
    } catch (e) {
      res.json(e);
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    const user = await userEntity.destroy({ where: { id } });
    return res.json(user);
  }
}

export default new UserController();
