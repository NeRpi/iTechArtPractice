import { Role } from "../db/entities/index.js";
import ApiError from "../error/api.error.js";

export default class RoleRepo {
  constructor() {
    this._roleEntity = Role;
  }

  async create(roleName) {
    try {
      return await this._roleEntity.create({ role: roleName });
    } catch (e) {
      throw ApiError.internal("Failed to create a new role");
    }
  }

  async getList() {
    try {
      return await this._roleEntity.findAll();
    } catch (e) {
      throw ApiError.internal("Failed to get a list of roles");
    }
  }

  async getById(id) {
    try {
      return await this._roleEntity.findOne({ where: { id } });
    } catch (e) {
      throw ApiError.internal("Failed to get roles by id");
    }
  }

  async updateById(id, roleName) {
    try {
      return await this._roleEntity.update(
        { role: roleName },
        { where: { id } }
      );
    } catch (e) {
      throw ApiError.internal("Failed to update role");
    }
  }

  async deleteById(id) {
    try {
      return await this._roleEntity.destroy({ where: { id } });
    } catch (e) {
      throw ApiError.internal("Failed to delete role");
    }
  }
}
