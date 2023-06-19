import { RoleEntity } from "../db/entities/role.entity.js";
import ApiError from "../error/api.error.js";
import dbConnector from "../db/db.connector.js";

export const RoleRepo = dbConnector.getRepository(RoleEntity).extend({
  async createRole(roleName: string) {
    try {
      const role = await this.create({ role: roleName });
      await this.save(role);
      return role;
    } catch (e) {
      throw ApiError.internal("Failed to create a new role");
    }
  },

  async getList() {
    try {
      return await this.find();
    } catch (e) {
      throw ApiError.internal("Failed to get a list of roles");
    }
  },

  async getById(id: string) {
    try {
      return await this.findOneBy({ id });
    } catch (e) {
      throw ApiError.internal("Failed to get roles by id");
    }
  },

  async updateById(id: string, role: string) {
    try {
      return await this.update(id, { role });
    } catch (e) {
      throw ApiError.internal("Failed to update role");
    }
  },

  async deleteById(id: string) {
    try {
      return await this.softDelete(id);
    } catch (e) {
      throw ApiError.internal("Failed to delete role");
    }
  },
});
