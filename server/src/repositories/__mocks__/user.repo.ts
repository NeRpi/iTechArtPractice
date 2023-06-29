import { UpdateResult } from "typeorm";
import { UserDto } from "../../dto/user.dto.ts";
import { UserEntity } from "../../db/entities/user.entity.ts";
import ApiError from "../../error/api.error.ts";

const goodUpdateResult = new UpdateResult();
goodUpdateResult.affected = 1;

let users = [
  new UserDto({ id: "1", email: "email1", roleId: "1" }),
  new UserDto({ id: "2", email: "email2", roleId: "1" }),
  new UserDto({ id: "3", email: "email3", roleId: "2" }),
  new UserDto({ id: "4", email: "email4", roleId: "3" })
];

export const { UserRepo } = jest.createMockFromModule<typeof import("../user.repo.ts")>("../user.repo.ts");

UserRepo.save = jest.fn(async (newUserEntities: any) => {
  if (Array.isArray(newUserEntities)) {
    newUserEntities.forEach((newUserEntity) => {
      const index = users.findIndex((user) => user.id === newUserEntity.id);
      if (index !== -1) users[index] = newUserEntity;
      else users.push(newUserEntity as UserDto);
    });
  } else users.push(newUserEntities);

  return newUserEntities;
});

UserRepo.create = jest.fn().mockImplementation((newUsers) => {
  if (Array.isArray(newUsers)) return newUsers as UserEntity[];
  else return newUsers as UserEntity;
});

UserRepo.find = jest.fn().mockImplementation(async (options: any) => {
  if (!options.where) return users as UserEntity[];
  return users.filter((user) => user.roleId === options.where.roleId) as UserEntity[];
});

UserRepo.findOneBy = jest.fn().mockImplementation(async (where: any) => {
  const { id, email } = where;
  return (users.find((user) => user.id === id || user.email === email) as UserEntity) || null;
});

UserRepo.update = jest.fn().mockImplementation(async (id, updateUser: any) => {
  const index = users.findIndex((user) => user.id === (id as string));
  if (index !== -1) {
    users[index] = updateUser;
    return goodUpdateResult;
  } else throw ApiError.internal("Failed to delete user");
});

UserRepo.softDelete = jest.fn().mockImplementation(async (id) => {
  const index = users.findIndex((user) => user.id === (id as string));
  if (index !== -1) {
    users[index].deleted_at = new Date("July 1, 2023, 12:00:00");
    return goodUpdateResult;
  } else throw ApiError.internal("Failed to delete user");
});

UserRepo.createUser = async (userDto: UserDto) => {
  try {
    const user = UserRepo.create(userDto);
    await UserRepo.save(user);
    return user;
  } catch (e) {
    throw ApiError.internal("Failed to create a new user");
  }
};

UserRepo.createUsers = async (usersDto: UserDto[]) => {
  try {
    const users = UserRepo.create(usersDto);
    await UserRepo.save(users);
    return users;
  } catch (e) {
    throw ApiError.internal("Failed to create a new users");
  }
};

UserRepo.getList = async () => {
  try {
    return await UserRepo.find({ relations: { role: true } });
  } catch (e) {
    console.log(e);
    throw ApiError.internal("Failed to get a list of users");
  }
};

UserRepo.getById = async (id: string) => {
  try {
    return await UserRepo.findOneBy({ id });
  } catch (e) {
    throw ApiError.internal("Failed to get user by id");
  }
};

UserRepo.getByEmail = async (email: string) => {
  try {
    return await UserRepo.findOneBy({ email });
  } catch (e) {
    throw ApiError.internal("Failed to get user by email");
  }
};

UserRepo.getListByRole = async (roleId: string) => {
  try {
    return await UserRepo.find({ relations: { role: true }, where: { roleId } });
  } catch (e) {
    throw ApiError.internal("Failed to get a list of users by role");
  }
};

UserRepo.updateById = async (userDto: UserDto) => {
  try {
    return await UserRepo.update(userDto.id!, { ...userDto });
  } catch (e) {
    throw ApiError.internal("Failed to update user");
  }
};

UserRepo.deleteById = async (id: string) => {
  try {
    return await UserRepo.softDelete(id);
  } catch (e) {
    throw ApiError.internal("Failed to delete user");
  }
};

UserRepo.clear = async () => {
  users = [
    new UserDto({ id: "1", email: "email1", roleId: "1" }),
    new UserDto({ id: "2", email: "email2", roleId: "1" }),
    new UserDto({ id: "3", email: "email3", roleId: "2" }),
    new UserDto({ id: "4", email: "email4", roleId: "3" })
  ];
};
