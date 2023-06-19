import { UserRepo } from "../repositories/user.repo.js";
import ApiError from "../error/api.error.js";
import { BcryptUtil } from "../utils/bcrypt.util.js";
import { UserDto } from "../dto/user.dto.js";

export default class UserService {
  private userRepo;

  constructor() {
    this.userRepo = UserRepo;
  }

  async create(userDto: UserDto) {
    userDto.password = await BcryptUtil.hash(userDto.password);
    return await this.userRepo.createUser(userDto);
  }

  async getList() {
    return await this.userRepo.getList();
  }

  async getListByRole(roleId: string) {
    return await this.userRepo.getListByRole(roleId);
  }

  async getById(id: string) {
    const res = await this.userRepo.getById(id);
    if (!res) throw ApiError.badRequest("There is no user under this id");
    return res;
  }

  async updateById(userDto: UserDto) {
    userDto.password = await BcryptUtil.hash(userDto.password);
    const res = await this.userRepo.updateById({ ...userDto });
    if (!res) throw ApiError.badRequest("There is no user under this id");
    return await this.userRepo.getById(userDto.id!);
  }

  async deleteById(id: string) {
    const res = await this.userRepo.deleteById(id);
    if (!res) throw ApiError.badRequest("There is no user under this id");
    return "User deleted!";
  }
}
