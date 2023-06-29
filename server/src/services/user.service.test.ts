import { UserDto } from "../dto/user.dto.ts";
import { UserEntity } from "../db/entities/user.entity.ts";
import ApiError from "../error/api.error.ts";

jest.mock("../repositories/user.repo.ts");

import { UserRepo } from "../repositories/user.repo.ts";
import UserService from "./user.service.ts";

describe("User service", () => {
  const userService = new UserService();

  beforeEach(async () => {
    await UserRepo.clear();
  });

  describe("create", () => {
    const newUser = new UserDto({ id: "5", email: "email5", password: "1234", roleId: "4", deleted_at: null });
    const invalidNewUser = new UserDto({ id: "5", email: "email5", roleId: "4", deleted_at: null });

    it("should return new user", async () => {
      expect(await userService.create(newUser)).toEqual(newUser as UserEntity);
      expect(await userService.getList()).toEqual([
        new UserDto({ id: "1", email: "email1", roleId: "1" }),
        new UserDto({ id: "2", email: "email2", roleId: "1" }),
        new UserDto({ id: "3", email: "email3", roleId: "2" }),
        new UserDto({ id: "4", email: "email4", roleId: "3" }),
        newUser
      ]);
    });

    it("should throw ApiError", async () => {
      await expect(userService.create(invalidNewUser)).rejects.toThrow(ApiError);
      expect(await userService.getList()).toEqual([
        new UserDto({ id: "1", email: "email1", roleId: "1" }),
        new UserDto({ id: "2", email: "email2", roleId: "1" }),
        new UserDto({ id: "3", email: "email3", roleId: "2" }),
        new UserDto({ id: "4", email: "email4", roleId: "3" })
      ]);
    });
  });

  describe("getList", () => {
      it("should return all users", async () => {
        expect(await userService.getList()).toEqual([
          new UserDto({ id: "1", email: "email1", roleId: "1" }),
          new UserDto({ id: "2", email: "email2", roleId: "1" }),
          new UserDto({ id: "3", email: "email3", roleId: "2" }),
          new UserDto({ id: "4", email: "email4", roleId: "3" })
        ]);
    });
  });

  describe("getById", () => {
    it("should return founded user by id", async () => {
      const users = await userService.getList();
      expect(await userService.getById(users[1].id!)).toEqual(users[1]);
    });

    it("should throw ApiError", async () => {
      await expect(userService.getById("invalid id")).rejects.toThrow(ApiError);
    });
  });

  describe("getListByRole", () => {
    it("should return values with roleId = 1", async () => {
      expect(await userService.getListByRole("1")).toEqual((await userService.getList()).slice(0, 2));
    });

    it("should return empty array", async () => {
      expect((await userService.getListByRole("5")).length).toBe(0);
    });
  });

  describe("updateById", () => {
    let updateUser = new UserDto({ id: "4", email: "email4", password: "1234", roleId: "4" });

    it("should update values with id = 4", async () => {
      expect(await userService.updateById(updateUser)).toEqual(updateUser as UserEntity);
      expect(await userService.getList()).toEqual([
        new UserDto({ id: "1", email: "email1", roleId: "1" }),
        new UserDto({ id: "2", email: "email2", roleId: "1" }),
        new UserDto({ id: "3", email: "email3", roleId: "2" }),
        updateUser
      ]);
    });

    it("should return bad update result", async () => {
      let updateUser = new UserDto({ id: "5", email: "email5", roleId: "5" });
      await expect(userService.updateById(updateUser)).rejects.toThrow(ApiError);
      expect(await userService.getList()).toEqual([
        new UserDto({ id: "1", email: "email1", roleId: "1" }),
        new UserDto({ id: "2", email: "email2", roleId: "1" }),
        new UserDto({ id: "3", email: "email3", roleId: "2" }),
        new UserDto({ id: "4", email: "email4", roleId: "3" })
      ]);
    });
  });

  describe("deleteById", () => {
    it("should return values with roleId = 1", async () => {
      expect(await userService.deleteById("1")).toEqual("User deleted!");
      expect(await userService.getList()).toEqual([
        new UserDto({ id: "1", email: "email1", roleId: "1", deleted_at: new Date("July 1, 2023, 12:00:00") }),
        new UserDto({ id: "2", email: "email2", roleId: "1" }),
        new UserDto({ id: "3", email: "email3", roleId: "2" }),
        new UserDto({ id: "4", email: "email4", roleId: "3" })
      ]);
    });

    it("should return empty array", async () => {
      await expect(userService.deleteById("5")).rejects.toThrow(ApiError);
      expect(await userService.getList()).toEqual([
        new UserDto({ id: "1", email: "email1", roleId: "1" }),
        new UserDto({ id: "2", email: "email2", roleId: "1" }),
        new UserDto({ id: "3", email: "email3", roleId: "2" }),
        new UserDto({ id: "4", email: "email4", roleId: "3" })
      ]);
    });
  });
});
