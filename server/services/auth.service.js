import UserRepo from "../repositories/user.repo.js";
import bcrypt from "bcrypt";
import ApiError from "../error/api.error.js";
import TokenService from "./token.service.js";

export default class AuthService {
  constructor() {
    this._userRepo = new UserRepo();
    this._tokenService = new TokenService();
  }

  async registration(email, password) {
    if (await this._userRepo.getByEmail(email))
      throw ApiError.internal("The mail is already registered");
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await this._userRepo.create(
      null,
      null,
      null,
      email,
      hashPassword,
      null
    );

    return this.generateToken(user);
  }

  async login(email, password) {
    const user = await this._userRepo.getByEmail(email);
    if (!user) throw ApiError.internal("The user is not registered");
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) throw ApiError.badRequest("Invalid email or password");

    return this.generateToken(user);
  }

  async refresh(refreshToken) {
    if (!refreshToken) throw ApiError.unauthorized("The user is not logged in");
    const userData = this._tokenService.validateRefreshToken(refreshToken);
    if (!userData) throw ApiError.unauthorized("The user is not logged in");
    const user = await this._userRepo.getById(userData.userId);

    return this.generateToken(user);
  }

  generateToken(userDto) {
    const payload = {
      userId: userDto.id,
      roleId: userDto.roleId,
    };

    const tokens = this._tokenService.generateTokens(payload);
    return { ...tokens, user: payload };
  }
}
