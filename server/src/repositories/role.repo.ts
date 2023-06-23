import { RoleEntity } from "../db/entities/role.entity.ts";
import ApiError from "../error/api.error.ts";
import { Roles } from "../db/enums/role.enum.js";
import dbConnector from "../db/db.connector.ts";

export const RoleRepo = dbConnector.getRepository(RoleEntity).extend({
  async createRole(roleName: Roles) {
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

  async updateById(id: string, role: Roles) {
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
