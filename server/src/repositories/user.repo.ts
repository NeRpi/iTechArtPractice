import ApiError from "../error/api.error.js";
import { UserEntity } from "../db/entities/user.entity.js";
import dbConnector from "../db/db.connector.js";

export const UserRepo = dbConnector.getRepository(UserEntity).extend({
  async createUser(
    name: string,
    surname: string,
    DoB: string,
    email: string,
    password: string,
    roleId: string
  ) {
    try {
      const user = await this.create({
        name,
        surname,
        DoB,
        email,
        password,
        roleId,
      });

      await this.save(user);
      return user;
    } catch (e) {
      throw ApiError.internal("Failed to create a new user");
    }
  },

  async registrationUser(email: string, password: string) {
    try {
      const user = await this.create({ email, password });
      await this.save(user);
      return user;
    } catch (e) {
      throw ApiError.internal("Failed to create a new user");
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

  async updateById(
    id: string,
    name: string,
    surname: string,
    DoB: string,
    email: string,
    password: string
  ) {
    try {
      return await this.update(id, { name, surname, DoB, email, password });
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
