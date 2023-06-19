import { UserRepo } from "../repositories/user.repo.js";
import ApiError from "../error/api.error.js";
import { BcryptUtil } from "../utils/bcrypt.util.js";

export default class UserService {
  async create(
    name: string,
    surname: string,
    DoB: string,
    email: string,
    password: string,
    roleId: string
  ) {
    const hashPassword = await BcryptUtil.hash(password);
    return await UserRepo.createUser(
      name,
      surname,
      DoB,
      email,
      hashPassword,
      roleId
    );
  }

  async getList() {
    return await UserRepo.getList();
  }

  async getListByRole(roleId: string) {
    return await UserRepo.getListByRole(roleId);
  }

  async getById(id: string) {
    const res = await UserRepo.getById(id);
    if (!res) throw ApiError.badRequest("There is no user under this id");
    return res;
  }

  async updateById(
    id: string,
    name: string,
    surname: string,
    DoB: string,
    email: string,
    password: string
  ) {
    const hashPassword = await BcryptUtil.hash(password);
    const res = await UserRepo.updateById(
      id,
      name,
      surname,
      DoB,
      email,
      hashPassword
    );
    if (!res) throw ApiError.badRequest("There is no user under this id");
    return await UserRepo.getById(id);
  }

  async deleteById(id: string) {
    const res = await UserRepo.deleteById(id);
    if (!res) throw ApiError.badRequest("There is no user under this id");
    return "User deleted!";
  }
}
