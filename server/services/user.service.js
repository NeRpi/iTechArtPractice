import UserRepo from "../repositories/user.repo.js";

export default class UserService {
  constructor() {
    this._userRepo = new UserRepo();
  }

  async create(name, surname, DoB, email, password, roleId) {
    const res = await this._userRepo.create(
      name,
      surname,
      DoB,
      email,
      password,
      roleId
    );
    if (res?.error) return { error: res.error };
    return { value: res.value };
  }

  async getList() {
    const res = await this._userRepo.getList();
    if (res?.error) return { error: res.error };
    return { value: res.value };
  }

  async getListByRole(roleId) {
    const res = await this._userRepo.getListByRole(roleId);
    if (res?.error) return { error: res.error };
    return { value: res.value };
  }

  async getById(id) {
    const res = await this._userRepo.getById(id);
    if (res?.error) return { error: res.error };
    else if (!res.value) return { error: "There is no user under this id" };
    return { value: res.value };
  }

  async updateById(id, name, surname, DoB, email, password) {
    const res = await this._userRepo.updateById(
      id,
      name,
      surname,
      DoB,
      email,
      password
    );
    if (res?.error) return { error: res.error };
    else if (!res.value) return { error: "There is no user under this id" };
    else return { value: res.value };
  }

  async deleteById(id) {
    const res = await this._userRepo.deleteById(id);
    if (res?.error) return { error: res.error };
    else if (!res.value)
      return {
        error: "There is no user under this id",
      };
    else return { value: res.value };
  }
}
