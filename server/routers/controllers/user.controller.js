const { sequelize } = require("../../db/entities");
const { DataTypes } = require("sequelize");
const User = require("../../db/entities/user")(sequelize, DataTypes);

class UserController {
  async createUser(req, res) {
    try {
      const { name, surname, DoB, email, password } = req.body;
      const user = await User.create({
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
    const users = await User.findAll();
    return res.json(users);
  }

  async getUserById(req, res) {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    return res.json(user);
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, surname, DoB, email, password } = req.body;
      const user = await User.update(
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
    const user = await User.destroy({ where: { id } });
    return res.json(user);
  }
}

module.exports = new UserController();
