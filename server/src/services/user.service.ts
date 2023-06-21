import { UserRepo } from "../repositories/user.repo.js";
import ApiError from "../error/api.error.js";
import { BcryptUtil } from "../utils/bcrypt.util.js";
import { UserDto } from "../dto/user.dto.js";
import { stringify, parse } from "csv";
import fs from "fs";

export default class UserService {
  private userRepo;
  private parser;

  constructor() {
    this.userRepo = UserRepo;
    this.parser = parse({
      delimiter: ";",
      columns: true,
      cast: (value, context) => {
        if (context.header) return value;
        if (value === "") return undefined;
        else return value;
      },
    });
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

  async importUsers(pathToFile: string) {
    const promise = new Promise<UserDto[]>((resolve) => {
      const usersDto: UserDto[] = [];
      fs.createReadStream(pathToFile)
        .pipe(this.parser)
        .on("data", (row) => usersDto.push(new UserDto(row)))
        .on("end", () => resolve(usersDto));
    });

    return await this.userRepo.createUsers(await promise);
  }

  async exportUsers() {
    const users = await this.userRepo.getList();
    const writableStream = fs.createWriteStream(
      "src/statics/users.export." + Date.now() + ".csv"
    );
    const stringifier = stringify({
      header: true,
      columns: Object.keys(new UserDto({})),
      delimiter: ";",
    });

    users.forEach((userEntity) => stringifier.write(Object.values(userEntity)));
    stringifier.end();

    const promise = new Promise<string>((resolve) => {
      stringifier.pipe(writableStream).on("finish", () => {
        writableStream.end();
        resolve(writableStream.path as string);
      });
    });

    return await promise;
  }
}
