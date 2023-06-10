"use strict";
import { Model } from "sequelize";

const model = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init(
    {
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      DoB: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "User",
      paranoid: true,
    }
  );
  return User;
};

export default model;