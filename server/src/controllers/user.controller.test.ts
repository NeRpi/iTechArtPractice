import ApiError from "../error/api.error.ts";
import { BcryptUtil } from "../utils/bcrypt.util.ts";
import { UserDto } from "../dto/user.dto.ts";
import { UserEntity } from "../db/entities/user.entity.ts";
import { UserRepo } from "../repositories/user.repo.ts";
import userController from "./user.controller.ts";

jest.mock("../repositories/user.repo.ts");

const mockRequest = () => {
  const req: any = {};
  req.body = jest.fn().mockReturnValue(req);
  req.params = jest.fn().mockReturnValue(req);
  return req;
};

const mockResponse = () => {
  const res: any = {};
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("User controller", () => {
  let req: any, res: any, next: any;
  beforeEach(async () => {
    req = mockRequest();
    res = mockResponse();
    next = jest.fn();
    await UserRepo.clear();
  });

  describe("create", () => {
    const newUser = new UserDto({ id: "5", email: "email5", password: "1234", roleId: "4", deleted_at: null });
    const invalidNewUser = new UserDto({ id: "5", email: "email5", roleId: "4", deleted_at: null });

    it("should return new user", async () => {
      req.body = newUser;

      await userController.create(req, res, next);
      const getUser = res.json.mock.calls[0][0];
      const compare = jest.fn().mockReturnValueOnce(await BcryptUtil.compare(newUser.password, getUser.password));
      expect(await compare()).toBe(true);
      newUser.password = getUser.password;
      expect(getUser).toEqual(newUser as UserEntity);

      await userController.getList(req, res, next);
      expect(res.json).toHaveBeenCalledWith([
        new UserDto({ id: "1", email: "email1", roleId: "1" }),
        new UserDto({ id: "2", email: "email2", roleId: "1" }),
        new UserDto({ id: "3", email: "email3", roleId: "2" }),
        new UserDto({ id: "4", email: "email4", roleId: "3" }),
        newUser
      ]);
    });

    it("should throw ApiError", async () => {
      req.body = invalidNewUser;
      await userController.create(req, res, next);
      expect(next).toHaveBeenCalledWith(ApiError.badRequest("Password required field!"));
      expect(res.json).not.toHaveBeenCalled();

      await userController.getList(req, res, next);
      expect(res.json).toHaveBeenCalledWith([
        new UserDto({ id: "1", email: "email1", roleId: "1" }),
        new UserDto({ id: "2", email: "email2", roleId: "1" }),
        new UserDto({ id: "3", email: "email3", roleId: "2" }),
        new UserDto({ id: "4", email: "email4", roleId: "3" })
      ]);
    });
  });

  describe("getList", () => {
    it("should return all users", async () => {
      await userController.getList(req, res, next);

      expect(res.json).toHaveBeenCalledWith([
        new UserDto({ id: "1", email: "email1", roleId: "1" }),
        new UserDto({ id: "2", email: "email2", roleId: "1" }),
        new UserDto({ id: "3", email: "email3", roleId: "2" }),
        new UserDto({ id: "4", email: "email4", roleId: "3" })
      ]);
    });
  });

  describe("getById", () => {
    it("should return founded user by id", async () => {
      req.params.id = "1";
      await userController.getById(req, res, next);
      expect(res.json).toHaveBeenCalledWith(new UserDto({ id: "1", email: "email1", roleId: "1" }));
    });

    it("should throw ApiError('There is no user under this id')", async () => {
      req.params.id = "5";
      await userController.getById(req, res, next);
      expect(next).toHaveBeenCalledWith(ApiError.badRequest("There is no user under this id"));
    });
  });

  describe("getListByRole", () => {
    it("should return values with roleId = 1", async () => {
      req.params.roleId = "1";
      await userController.getListByRole(req, res, next);
      expect(res.json).toHaveBeenCalledWith([
        new UserDto({ id: "1", email: "email1", roleId: "1" }),
        new UserDto({ id: "2", email: "email2", roleId: "1" })
      ]);
    });

    it("should return empty array", async () => {
      await userController.getListByRole(req, res, next);
      expect(res.json).toHaveBeenCalledWith([]);
    });
  });

  describe("updateById", () => {
    it("should update values with id = 4", async () => {
      const updateUser = new UserDto({ id: "4", email: "email4", password: "1234", roleId: "4" });
      req.body = updateUser;
      req.params.id = updateUser.id;

      await userController.updateById(req, res, next);
      const getUser = res.json.mock.calls[0][0];
      const compare = jest.fn().mockReturnValueOnce(await BcryptUtil.compare(updateUser.password, getUser.password));
      expect(await compare()).toBe(true);
      updateUser.password = getUser.password;
      expect(getUser).toEqual(updateUser as UserEntity);

      await userController.getList(req, res, next);
      expect(res.json).toHaveBeenCalledWith([
        new UserDto({ id: "1", email: "email1", roleId: "1" }),
        new UserDto({ id: "2", email: "email2", roleId: "1" }),
        new UserDto({ id: "3", email: "email3", roleId: "2" }),
        updateUser
      ]);
    });

    it("should throw ApiError('Failed to update user')", async () => {
      req.body = new UserDto({ id: "5", email: "email5", password: "1234", roleId: "5" });
      await userController.updateById(req, res, next);

      expect(next).toHaveBeenCalledWith(ApiError.badRequest("Failed to update user"));
      expect(res.json).not.toHaveBeenCalled();

      await userController.getList(req, res, next);
      expect(res.json).toHaveBeenCalledWith([
        new UserDto({ id: "1", email: "email1", roleId: "1" }),
        new UserDto({ id: "2", email: "email2", roleId: "1" }),
        new UserDto({ id: "3", email: "email3", roleId: "2" }),
        new UserDto({ id: "4", email: "email4", roleId: "3" })
      ]);
    });

    it("should throw ApiError('Password required field!')", async () => {
      req.body = new UserDto({ id: "5", email: "email5", roleId: "5" });
      await userController.updateById(req, res, next);

      expect(next).toHaveBeenCalledWith(ApiError.badRequest("Password required field!"));
      expect(res.json).not.toHaveBeenCalled();

      await userController.getList(req, res, next);
      expect(res.json).toHaveBeenCalledWith([
        new UserDto({ id: "1", email: "email1", roleId: "1" }),
        new UserDto({ id: "2", email: "email2", roleId: "1" }),
        new UserDto({ id: "3", email: "email3", roleId: "2" }),
        new UserDto({ id: "4", email: "email4", roleId: "3" })
      ]);
    });
  });

  describe("deleteById", () => {
    it("should return values with roleId = 1", async () => {
      req.params.id = "1";
      await userController.deleteById(req, res, next);

      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith("User deleted!");

      await userController.getList(req, res, next);
      expect(res.json).toHaveBeenCalledWith([
        new UserDto({ id: "1", email: "email1", roleId: "1", deleted_at: new Date("July 1, 2023, 12:00:00") }),
        new UserDto({ id: "2", email: "email2", roleId: "1" }),
        new UserDto({ id: "3", email: "email3", roleId: "2" }),
        new UserDto({ id: "4", email: "email4", roleId: "3" })
      ]);
    });

    it("should return empty array", async () => {
      req.body.id = "5";
      await userController.deleteById(req, res, next);

      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(ApiError.badRequest("Failed to delete user"));

      await userController.getList(req, res, next);
      expect(res.json).toHaveBeenCalledWith([
        new UserDto({ id: "1", email: "email1", roleId: "1" }),
        new UserDto({ id: "2", email: "email2", roleId: "1" }),
        new UserDto({ id: "3", email: "email3", roleId: "2" }),
        new UserDto({ id: "4", email: "email4", roleId: "3" })
      ]);
    });
  });
});
