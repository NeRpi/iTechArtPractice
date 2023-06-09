import { DataTypes } from "sequelize";
import dbConnector from "../dbConnector.js";

const UserEntity = dbConnector.define("user", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: true, maxLength: 30 },
  surname: { type: DataTypes.STRING, allowNull: true, maxLength: 30 },
  DoB: { type: DataTypes.DATEONLY },
  email: { type: DataTypes.STRING, allowNull: true, unique: true },
  password: { type: DataTypes.STRING, minLength: 15, maxLength: 30 },
});

export default UserEntity;
