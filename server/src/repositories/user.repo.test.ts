import { UpdateResult } from "typeorm";
import { UserDto } from "../dto/user.dto.ts";
import { UserEntity } from "../db/entities/user.entity.ts";
import ApiError from "../error/api.error.ts";
import { UserRepo } from "./user.repo.ts";

jest.mock("./user.repo.ts");

describe("User repository", () => {
  const userRepo = UserRepo;
  const goodUpdateResult = new UpdateResult();
  let baseUsers: UserDto[];
  goodUpdateResult.affected = 1;

  beforeEach(async () => {
    baseUsers = [
      new UserDto({ id: "1", email: "email1", roleId: "1" }),
      new UserDto({ id: "2", email: "email2", roleId: "1" }),
      new UserDto({ id: "3", email: "email3", roleId: "2" }),
      new UserDto({ id: "4", email: "email4", roleId: "3" })
    ];
    await userRepo.clear();
  });

  describe("createUser", () => {
    const newUsers = [
      new UserDto({ id: "5", email: "email5", roleId: "4" }),
      new UserDto({ id: "6", email: "email6", roleId: "5" }),
      new UserDto({ id: "7", email: "email7", roleId: "5" })
    ];

    it("should return new user", async () => {
      expect(await userRepo.createUser(newUsers[0])).toEqual(newUsers[0] as UserEntity);
      expect(userRepo.create).toHaveBeenCalledWith(newUsers[0]);
      expect(await userRepo.getList()).toEqual([...baseUsers, newUsers[0]]);
      expect(userRepo.save).toHaveBeenCalledWith(newUsers[0] as UserEntity);
    });

    it("should return new users", async () => {
      expect(await userRepo.createUsers(newUsers)).toEqual(newUsers as UserEntity[]);
      expect(userRepo.create).toHaveBeenCalledWith(newUsers);
      expect(await userRepo.getList()).toEqual([...baseUsers, ...newUsers]);
      expect(userRepo.save).toHaveBeenCalledWith(newUsers as UserEntity[]);
    });
  });

  describe("getList", () => {
    it("should return all users", async () => {
      expect(await userRepo.getList()).toEqual(baseUsers);
      expect(userRepo.find).toHaveBeenCalledWith({ relations: { role: true } });
    });
  });

  describe("getById", () => {
    it("should return founded user by id", async () => {
      expect(await userRepo.getById(baseUsers[1].id!)).toEqual(baseUsers[1]);
      expect(userRepo.findOneBy).toHaveBeenCalledWith({ id: baseUsers[1].id });
    });

    it("should return null", async () => {
      expect(await userRepo.getById("invalid id")).toBeNull();
      expect(userRepo.findOneBy).toHaveBeenCalledWith({ id: "invalid id" });
    });
  });

  describe("getByEmail", () => {
    it("should return founded user by email", async () => {
      expect(await userRepo.getByEmail(baseUsers[1].email)).toEqual(baseUsers[1]);
      expect(userRepo.findOneBy).toHaveBeenCalledWith({ email: baseUsers[1].email });
    });

    it("should return null", async () => {
      expect(await userRepo.getByEmail(baseUsers[0].id!)).toBeNull();
      expect(userRepo.findOneBy).toHaveBeenCalledWith({ email: baseUsers[0].id });
    });
  });

  describe("getListByRole", () => {
    it("should return values with roleId = 1", async () => {
      const users = await userRepo.getList();
      expect(await userRepo.getListByRole("1")).toEqual(users.slice(0, 2));
      expect(userRepo.find).toHaveBeenCalledWith({ relations: { role: true }, where: { roleId: "1" } });
    });

    it("should return empty array", async () => {
      expect((await userRepo.getListByRole("5")).length).toBe(0);
      expect(userRepo.find).toHaveBeenCalledWith({ relations: { role: true }, where: { roleId: "5" } });
    });
  });

  describe("updateById", () => {
    it("should update values with id = 4", async () => {
      const users = await userRepo.getList();
      let updateUser = new UserDto({ id: "4", email: "email4", roleId: "4" });
      expect(await userRepo.updateById(updateUser)).toEqual(goodUpdateResult);
      baseUsers[3] = updateUser;
      expect(users).toEqual(baseUsers);
      expect(userRepo.update).toHaveBeenCalledWith(updateUser.id, { ...updateUser });
    });

    it("should throw exception", async () => {
      const users = await userRepo.getList();
      let updateUser = new UserDto({ id: "5", email: "email5", roleId: "5" });
      await expect(userRepo.updateById(updateUser)).rejects.toThrow(ApiError);
      expect(users).toEqual(baseUsers);
      expect(userRepo.update).toHaveBeenCalledWith(updateUser.id, { ...updateUser });
    });
  });

  describe("deleteById", () => {
    it("should return values with roleId = 1", async () => {
      const users = await userRepo.getList();
      expect(await userRepo.deleteById("1")).toEqual(goodUpdateResult);
      baseUsers[0] = {...baseUsers[0], deleted_at: new Date("July 1, 2023, 12:00:00")};
      expect(users).toEqual(baseUsers);
      expect(userRepo.softDelete).toHaveBeenCalledWith("1");
    });

    it("should throw exception", async () => {
      const users = await userRepo.getList();
      await expect(userRepo.deleteById("5")).rejects.toThrow(ApiError);
      expect(users).toEqual(baseUsers);
      expect(userRepo.softDelete).toHaveBeenCalledWith("5");
    });
  });
});
