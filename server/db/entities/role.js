"use strict";
import { Model } from "sequelize";

const model = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role.hasMany(models.User, { foreignKey: { name: "roleId" } });
    }
  }

  Role.init(
    {
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Role",
      paranoid: true,
    }
  );
  return Role;
};
export default model;
