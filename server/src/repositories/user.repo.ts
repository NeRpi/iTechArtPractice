import ApiError from "../error/api.error.ts";
import { UserEntity } from "../db/entities/user.entity.ts";
import dbConnector from "../db/db.connector.ts";
import { UserDto } from "../dto/user.dto.ts";

export const UserRepo = dbConnector.getRepository(UserEntity).extend({
  async createUser(userDto: UserDto) {
    try {
      const user = this.create(userDto);
      await this.save(user);
      return user;
    } catch (e) {
      throw ApiError.internal("Failed to create a new user");
    }
  },

  async createUsers(usersDto: UserDto[]) {
    try {
      const users = this.create(usersDto);
      await this.save(users);
      return users;
    } catch (e) {
      throw ApiError.internal("Failed to create a new users");
    }
  },

  async getList() {
    try {
      return await this.find({ relations: { role: true } });
    } catch (e) {
      console.log(e);
      throw ApiError.internal("Failed to get a list of users");
    }
  },

  async getById(id: string) {
    try {
      return await this.findOneBy({ id });
    } catch (e) {
      throw ApiError.internal("Failed to get user by id");
    }
  },

  async getByEmail(email: string) {
    try {
      return await this.findOneBy({ email });
    } catch (e) {
      throw ApiError.internal("Failed to get user by email");
    }
  },

  async getListByRole(roleId: string) {
    try {
      return await this.find({ relations: { role: true }, where: { roleId } });
    } catch (e) {
      throw ApiError.internal("Failed to get a list of users by role");
    }
  },

  async updateById(userDto: UserDto) {
    try {
      return await this.update(userDto.id!, { ...userDto });
    } catch (e) {
      throw ApiError.internal("Failed to update user");
    }
  },

  async deleteById(id: string) {
    try {
      return await this.softDelete(id);
    } catch (e) {
      throw ApiError.internal("Failed to delete user");
    }
  },
});
