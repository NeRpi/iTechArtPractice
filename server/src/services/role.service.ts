import { RoleRepo } from "../repositories/role.repo.ts";
import ApiError from "../error/api.error.ts";
import { Roles } from "../db/enums/role.enum.js";

export default class RoleService {
  private roleRepo;

  constructor() {
    this.roleRepo = RoleRepo;
  }

  async create(role: string) {
    return await this.roleRepo.createRole(role);
  }

  async getList() {
    return await this.roleRepo.getList();
  }

  async getById(id: string) {
    const res = await this.roleRepo.getById(id);
    if (!res) throw ApiError.badRequest("There are no roles under this id");
    return res;
  }

  async updateById(id: string, role: Roles) {
    const res = await this.roleRepo.updateById(id, role);
    if (!res) throw ApiError.badRequest("There are no roles under this id");
    else return res;
  }

  async deleteById(id: string) {
    const res = await this.roleRepo.deleteById(id);
    if (!res) throw ApiError.badRequest("There are no roles under this id");
    return "Role deleted!";
  }
}
