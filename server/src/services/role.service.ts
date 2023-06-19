import { RoleRepo } from "../repositories/role.repo.js";
import ApiError from "../error/api.error.js";

export default class RoleService {
  async create(role: string) {
    return await RoleRepo.createRole(role);
  }

  async getList() {
    return await RoleRepo.getList();
  }

  async getById(id: string) {
    const res = await RoleRepo.getById(id);
    if (!res) throw ApiError.badRequest("There are no roles under this id");
    return res;
  }

  async updateById(id: string, role: string) {
    const res = await RoleRepo.updateById(id, role);
    if (!res) throw ApiError.badRequest("There are no roles under this id");
    else return res;
  }

  async deleteById(id: string) {
    const res = await RoleRepo.deleteById(id);
    if (!res) throw ApiError.badRequest("There are no roles under this id");
    return "Role deleted!";
  }
}
