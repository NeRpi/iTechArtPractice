import dbConnector from "../db/dbConnector.js";
import { DataTypes } from "sequelize";
import User from "../db/entities/user.js";

export default class UserRepo {
  constructor() {
    this._userEntity = User(dbConnector, DataTypes);
  }

  async create(name, surname, DoB, email, password) {
    try {
      const user = await this._userEntity.create({
        name,
        surname,
        DoB,
        email,
        password,
      });
      return { value: user };
    } catch (e) {
      return { error: "Не удалось сохдать нового пользователя" };
    }
  }

  async getList() {
    try {
      const users = await this._userEntity.findAll();
      return { value: users };
    } catch (e) {
      return { error: "Не удалось полусить список пользователей" };
    }
  }

  async getById(id) {
    try {
      const user = await this._userEntity.findOne({ where: { id } });
      return { value: user };
    } catch (e) {
      return { error: "Не удалось получить пользователя по id" };
    }
  }

  async updateById(id, name, surname, DoB, email, password) {
    try {
      const res = await this._userEntity.update(
        { name, surname, DoB, email, password },
        { where: { id } }
      );
      return { value: res };
    } catch (e) {
      return { error: "Не удалось обновить пользователя" };
    }
  }

  async deleteById(id) {
    try {
      const res = await this._userEntity.destroy({ where: { id } });
      return { value: res };
    } catch (e) {
      return { error: "Неудалось удалить пользователя" };
    }
  }
}
