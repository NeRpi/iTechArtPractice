import { Role, User } from "../db/entities/index.js";
import ApiError from "../error/api.error.js";

export default class UserRepo {
  constructor() {
    this._userEntity = User;
  }

  async create(name, surname, DoB, email, password, roleId) {
    try {
      return await this._userEntity.create({
        name,
        surname,
        DoB,
        email,
        password,
        roleId,
      });
    } catch (e) {
      throw ApiError.internal("Failed to create a new user");
    }
  }

  async getList() {
    try {
      return await this._userEntity.findAll({ include: Role });
    } catch (e) {
      throw ApiError.internal("Failed to get a list of users");
    }
  }

  async getById(id) {
    try {
      return await this._userEntity.findOne({ where: { id } });
    } catch (e) {
      throw ApiError.internal("Failed to get user by id");
    }
  }

  async getByEmail(email) {
    try {
      return await this._userEntity.findOne({ where: { email } });
    } catch (e) {
      throw ApiError.internal("Failed to get user by email");
    }
  }

  async getListByRole(roleId) {
    try {
      return await this._userEntity.findAll({
        where: { roleId },
        include: Role,
      });
    } catch (e) {
      throw ApiError.internal("Failed to get a list of users by role");
    }
  }

  async updateById(id, name, surname, DoB, email, password) {
    try {
      return await this._userEntity.update(
        { name, surname, DoB, email, password },
        { where: { id } }
      );
    } catch (e) {
      throw ApiError.internal("Failed to update user");
    }
  }

  async deleteById(id) {
    try {
      return await this._userEntity.destroy({ where: { id } });
    } catch (e) {
      throw ApiError.internal("Failed to delete user");
    }
  }
}
