import { Role } from "../db/entities/index.js";

export default class RoleRepo {
  constructor() {
    this._roleEntity = Role;
  }

  async create(roleName) {
    try {
      const role = await this._roleEntity.create({ role: roleName });
      return { value: role };
    } catch (e) {
      return { error: "Не удалось сохдать нового пользователя" };
    }
  }

  async getList() {
    try {
      const roles = await this._roleEntity.findAll();
      return { value: roles };
    } catch (e) {
      return { error: "Не удалось полусить список пользователей" };
    }
  }

  async updateById(id, roleName) {
    try {
      const res = await this._roleEntity.update(
        { role: roleName },
        { where: { id } }
      );
      return { value: res };
    } catch (e) {
      return { error: "Не удалось обновить пользователя" };
    }
  }

  async deleteById(id) {
    try {
      const res = await this._roleEntity.destroy({ where: { id } });
      return { value: res };
    } catch (e) {
      return { error: "Неудалось удалить пользователя" };
    }
  }
}
