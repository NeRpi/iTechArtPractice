import RoleRepo from "../repositories/role.repo.js";
import ApiError from "../error/api.error.js";

export default class RoleService {
  constructor() {
    this._roleRepo = new RoleRepo();
  }

  async create(roleName) {
    return await this._roleRepo.create(roleName);
  }

  async getList() {
    return await this._roleRepo.getList();
  }

  async getById(id) {
    const res = await this._roleRepo.getById(id);
    if (!res) throw ApiError.badRequest("There are no roles under this id");
    return res;
  }

  async updateById(id, roleName) {
    const res = await this._roleRepo.updateById(id, roleName);
    if (!res) throw ApiError.badRequest("There are no roles under this id");
    else return res;
  }

  async deleteById(id) {
    const res = await this._roleRepo.deleteById(id);
    if (!res) throw ApiError.badRequest("There are no roles under this id");
    else return res;
  }
}
