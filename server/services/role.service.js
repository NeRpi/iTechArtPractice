import RoleRepo from "../repositories/role.repo.js";

export default class RoleService {
  constructor() {
    this._roleRepo = new RoleRepo();
  }

  async create(roleName) {
    const res = await this._roleRepo.create(roleName);
    if (res?.error) return { error: res.error };
    return { value: res.value };
  }

  async getList() {
    const res = await this._roleRepo.getList();
    if (res?.error) return { error: res.error };
    return { value: res.value };
  }

  async getById(id) {
    const res = await this._roleRepo.getById(id);
    if (res?.error) return { error: res.error };
    else if (!res.value) return { error: "Роли под таким id отсутствует" };
    return { value: res.value };
  }

  async updateById(id, roleName) {
    const res = await this._roleRepo.updateById(id, roleName);
    if (res?.error) return { error: res.error };
    else if (!res.value)
      return { error: "Не удалось произвести обновление роли" };
    else return { value: res.value };
  }

  async deleteById(id) {
    const res = await this._roleRepo.deleteById(id);
    if (res?.error) return { error: res.error };
    else if (!res.value)
      return {
        error:
          "Не удалось произвести удаление роли, роли под таким id отсутвует",
      };
    else return { value: res.value };
  }
}
