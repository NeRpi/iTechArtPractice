import { Role } from "../db/entities/index.js";

export default class RoleRepo {
  constructor() {
    this._roleEntity = Role;
  }

  async create(roleName) {
    try {
      const role = await this._roleEntity.create({ role: roleName });
      return { value: role };
    } catch (e) {
      return { error: "Failed to create a new role" };
    }
  }

  async getList() {
    try {
      const roles = await this._roleEntity.findAll();
      return { value: roles };
    } catch (e) {
      return { error: "Failed to get a list of roles" };
    }
  }

  async getById(id) {
    try {
      const user = await this._roleEntity.findOne({ where: { id } });
      return { value: user };
    } catch (e) {
      return { error: "Failed to get roles by id" };
    }
  }

  async updateById(id, roleName) {
    try {
      const res = await this._roleEntity.update(
        { role: roleName },
        { where: { id } }
      );
      return { value: res };
    } catch (e) {
      return { error: "Failed to update role" };
    }
  }

  async deleteById(id) {
    try {
      const res = await this._roleEntity.destroy({ where: { id } });
      return { value: res };
    } catch (e) {
      return { error: "Failed to delete role" };
    }
  }
}
