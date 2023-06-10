import RoleModel from "./role.js";
import UserModel from "./user.js";
import dbConnector from "../dbConnector.js";
import { DataTypes } from "sequelize";

const Role = RoleModel(dbConnector, DataTypes);
const User = UserModel(dbConnector, DataTypes);

Role.associate(dbConnector.models);
User.associate(dbConnector.models);

export { Role, User };
