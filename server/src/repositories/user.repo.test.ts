import { UserRepo } from "./user.repo.ts";
import { UserDto } from "../dto/user.dto.ts";
import { UserEntity } from "../db/entities/user.entity.js";
import { UpdateResult } from "typeorm";

describe("User repository", () => {
  const userRepo = UserRepo;
  let users: UserDto[];

  beforeEach(() => {
    users = [
      new UserDto({ id: "1", email: "email1", roleId: "1" }),
      new UserDto({ id: "2", email: "email2", roleId: "1" }),
      new UserDto({ id: "3", email: "email3", roleId: "2" }),
      new UserDto({ id: "4", email: "email4", roleId: "3" })
    ];

    jest.restoreAllMocks();
  });

  describe("createUser", () => {
    let createSpy: any;
    let saveSpy: any;
    const newUser = new UserDto({ id: "5", email: "email5", roleId: "4", deleted_at: null });
    beforeEach(() => {
      createSpy = jest.spyOn(userRepo, "create").mockReturnValueOnce(newUser as UserEntity);
      saveSpy = jest.spyOn(userRepo, "save").mockImplementation(async (newUserEntity: any) => {
        const index = users.findIndex((user) => user.id === newUser.id);
        if (index !== -1) users[index] = newUser;
        else users.push(newUser);
        return newUserEntity;
      });
    });

    it("should return new user", async () => {
      let createdUser = await userRepo.createUser(newUser);
      expect(createdUser).toEqual(newUser as UserEntity);
      expect(createSpy).toHaveBeenCalledWith(newUser);
      expect(users).toEqual([
        new UserDto({ id: "1", email: "email1", roleId: "1" }),
        new UserDto({ id: "2", email: "email2", roleId: "1" }),
        new UserDto({ id: "3", email: "email3", roleId: "2" }),
        new UserDto({ id: "4", email: "email4", roleId: "3" }),
        newUser
      ]);
      expect(saveSpy).toHaveBeenCalledWith(newUser as UserEntity);
    });
  });

  describe("getList", () => {
    let findSpy: any;
    beforeEach(() => {
      findSpy = jest.spyOn(userRepo, "find").mockResolvedValueOnce(users as UserEntity[]);
    });

    it("should return all users", async () => {
      const foundUser = await userRepo.getList();
      expect(foundUser).toEqual(users as UserEntity[]);
      expect(findSpy).toHaveBeenCalledWith({ relations: { role: true } });
    });
  });

  describe("getById", () => {
    let findOneBySpy: any;
    beforeEach(() => {
      findOneBySpy = jest.spyOn(userRepo, "findOneBy").mockImplementationOnce(async (where: any) => {
        return (users.find((user) => user.id === where.id) as UserEntity) || null;
      });
    });

    it("should return founded user by id", async () => {
      let foundUser = await userRepo.getById(users[1].id!);
      expect(foundUser).toEqual(users[1]);
      expect(findOneBySpy).toHaveBeenCalledWith({ id: users[1].id });
    });

    it("should return null", async () => {
      const foundUser = await userRepo.getById("invalid id");
      expect(foundUser).toBeNull();
      expect(findOneBySpy).toHaveBeenCalledWith({ id: "invalid id" });
    });
  });

  describe("getByEmail", () => {
    let findOneBySpy: any;
    beforeEach(() => {
      findOneBySpy = jest.spyOn(userRepo, "findOneBy").mockImplementationOnce(async (where: any) => {
        return (users.find((user) => user.email === where.email) as UserEntity) || null;
      });
    });

    it("should return founded user by email", async () => {
      const foundUser = await userRepo.getByEmail(users[1].email);
      expect(foundUser).toEqual(users[1]);
      expect(findOneBySpy).toHaveBeenCalledWith({ email: users[1].email });
    });

    it("should return null", async () => {
      const foundUser = await userRepo.getByEmail(users[0].id!);
      expect(foundUser).toBeNull();
      expect(findOneBySpy).toHaveBeenCalledWith({ email: users[0].id });
    });
  });

  describe("getListByRole", () => {
    let findSpy: any;
    beforeEach(() => {
      findSpy = jest.spyOn(userRepo, "find").mockImplementationOnce(async (options: any) => {
        return users.filter((user) => user.roleId === options.where.roleId) as UserEntity[];
      });
    });

    it("should return values with roleId = 1", async () => {
      const foundedUsersByRole = await userRepo.getListByRole("1");
      expect(foundedUsersByRole).toEqual(users.slice(0, 2));
      expect(findSpy).toHaveBeenCalledWith({ relations: { role: true }, where: { roleId: "1" } });
    });

    it("should return empty array", async () => {
      const foundedUsersByRole = await userRepo.getListByRole("5");
      expect(foundedUsersByRole.length).toBe(0);
      expect(findSpy).toHaveBeenCalledWith({ relations: { role: true }, where: { roleId: "5" } });
    });
  });

  describe("Update user by id", () => {
    let updateSpy: any;
    const badUpdateResult = new UpdateResult();
    badUpdateResult.affected = 0;
    const goodUpdateResult = new UpdateResult();
    goodUpdateResult.affected = 1;
    beforeEach(() => {
      updateSpy = jest.spyOn(userRepo, "update").mockImplementationOnce(async (id, updateUser: any) => {
        const index = users.findIndex((user) => user.id === (id as string));
        if (index !== -1) {
          users[index] = updateUser;
          return goodUpdateResult;
        } else return badUpdateResult;
      });
    });

    it("should update values with id = 4", async () => {
      let updateUser = new UserDto({ id: "4", email: "email4", roleId: "4" });
      const updatedUserResult = await userRepo.updateById(updateUser);
      expect(updatedUserResult).toEqual(goodUpdateResult);
      expect(users).toEqual([
        new UserDto({ id: "1", email: "email1", roleId: "1" }),
        new UserDto({ id: "2", email: "email2", roleId: "1" }),
        new UserDto({ id: "3", email: "email3", roleId: "2" }),
        updateUser
      ]);
      expect(updateSpy).toHaveBeenCalledWith(updateUser.id, { ...updateUser });
    });

    it("should return bad update result", async () => {
      let updateUser = new UserDto({ id: "5", email: "email5", roleId: "5" });
      const updatedUserResult = await userRepo.updateById(updateUser);
      expect(updatedUserResult).toEqual(badUpdateResult);
      expect(users).toEqual([
        new UserDto({ id: "1", email: "email1", roleId: "1" }),
        new UserDto({ id: "2", email: "email2", roleId: "1" }),
        new UserDto({ id: "3", email: "email3", roleId: "2" }),
        new UserDto({ id: "4", email: "email4", roleId: "3" })
      ]);
      expect(updateSpy).toHaveBeenCalledWith(updateUser.id, { ...updateUser });
    });
  });

  describe("Delete user by id", () => {
    let softDeleteSpy: any;
    const badUpdateResult = new UpdateResult();
    badUpdateResult.affected = 0;
    const goodUpdateResult = new UpdateResult();
    goodUpdateResult.affected = 1;
    beforeEach(() => {
      softDeleteSpy = jest.spyOn(userRepo, "softDelete").mockImplementationOnce(async (id) => {
        const index = users.findIndex((user) => user.id === (id as string));
        if (index !== -1) {
          users[index].deleted_at = new Date("July 1, 2023, 12:00:00");
          return goodUpdateResult;
        } else return badUpdateResult;
      });
    });

    it("should return values with roleId = 1", async () => {
      const deletedUserResult = await userRepo.deleteById("1");
      expect(deletedUserResult).toEqual(goodUpdateResult);
      expect(users).toEqual([
        new UserDto({ id: "1", email: "email1", roleId: "1", deleted_at: new Date("July 1, 2023, 12:00:00") }),
        new UserDto({ id: "2", email: "email2", roleId: "1" }),
        new UserDto({ id: "3", email: "email3", roleId: "2" }),
        new UserDto({ id: "4", email: "email4", roleId: "3" })
      ]);
      expect(softDeleteSpy).toHaveBeenCalledWith("1");
    });

    it("should return empty array", async () => {
      const deletedUserResult = await userRepo.deleteById("5");
      expect(deletedUserResult).toEqual(badUpdateResult);
      expect(users).toEqual([
        new UserDto({ id: "1", email: "email1", roleId: "1" }),
        new UserDto({ id: "2", email: "email2", roleId: "1" }),
        new UserDto({ id: "3", email: "email3", roleId: "2" }),
        new UserDto({ id: "4", email: "email4", roleId: "3" })
      ]);
      expect(softDeleteSpy).toHaveBeenCalledWith("5");
    });
  });
});
