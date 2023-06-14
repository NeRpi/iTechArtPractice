import UserRepo from "../repositories/user.repo.js";
import ApiError from "../error/api.error.js";
import bcrypt from "bcrypt";

export default class UserService {
  constructor() {
    this._userRepo = new UserRepo();
  }

  async create(name, surname, DoB, email, password, roleId) {
    const hashPassword = await bcrypt.hash(password, 3);
    return await this._userRepo.create(
      name,
      surname,
      DoB,
      email,
      hashPassword,
      roleId
    );
  }

  async getList() {
    return await this._userRepo.getList();
  }

  async getListByRole(roleId) {
    return await this._userRepo.getListByRole(roleId);
  }

  async getById(id) {
    const res = await this._userRepo.getById(id);
    if (!res) throw ApiError.badRequest("There is no user under this id");
    return res;
  }

  async updateById(id, name, surname, DoB, email, password) {
    const hashPassword = bcrypt.hash(password, 3);
    const res = await this._userRepo.updateById(
      id,
      name,
      surname,
      DoB,
      email,
      hashPassword
    );
    if (!res) throw ApiError.badRequest("There is no user under this id");
    return "User updated!";
  }

  async deleteById(id) {
    const res = await this._userRepo.deleteById(id);
    if (!res) throw ApiError.badRequest("There is no user under this id");
    return "User deleted!";
  }
}
