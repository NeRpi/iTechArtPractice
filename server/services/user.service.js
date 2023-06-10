const UserRepo = require("../repositories/user.repo");

class UserService {
  constructor() {
    this._userRepo = new UserRepo();
  }

  async create(name, surname, DoB, email, password) {
    const res = await this._userRepo.create(
      name,
      surname,
      DoB,
      email,
      password
    );
    if (res?.error) return { error: res.error };
    return { value: res.value };
  }

  async getList() {
    const res = await this._userRepo.getList();
    if (res?.error) return { error: res.error };
    return { value: res.value };
  }

  async getById(id) {
    const res = await this._userRepo.getById(id);
    if (res?.error) return { error: res.error };
    else if (!res.value)
      return { error: "Пользователь под таким id отсутствует" };
    return { value: res.value };
  }

  async updateById(id, name, surname, DoB, email, password) {
    const res = await this._userRepo.updateById(
      id,
      name,
      surname,
      DoB,
      email,
      password
    );
    if (res?.error) return { error: res.error };
    else if (!res.value)
      return { error: "Не удалось произвести обновление пользователя" };
    else return { value: res.value };
  }

  async deleteById(id) {
    const res = await this._userRepo.deleteById(id);
    if (res?.error) return { error: res.error };
    else if (!res.value)
      return {
        error:
          "Не удалось произвести удаление пользователя, пользователь под таким id отсутвует",
      };
    else return { value: res.value };
  }
}

module.exports = UserService;
