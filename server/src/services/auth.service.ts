import { UserRepo } from "../repositories/user.repo.js";
import ApiError from "../error/api.error.js";
import TokenService from "./token.service.js";
import { BcryptUtil } from "../utils/bcrypt.util.js";
import { UserEntity } from "../db/entities/user.entity.js";

export default class AuthService {
  _tokenService: TokenService;

  constructor() {
    this._tokenService = new TokenService();
  }

  async registration(email: string, password: string) {
    if (await UserRepo.getByEmail(email))
      throw ApiError.internal("The mail is already registered");
    const hashPassword = await BcryptUtil.hash(password);
    const user = await UserRepo.registrationUser(email, hashPassword);

    return this.generateToken(user);
  }

  async login(email: string, password: string) {
    const user = await UserRepo.getByEmail(email);
    if (!user) throw ApiError.internal("The user is not registered");
    const isPassEquals = await BcryptUtil.compare(password, user.password);
    if (!isPassEquals) throw ApiError.badRequest("Invalid email or password");

    return this.generateToken(user);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) throw ApiError.unauthorized("The user is not logged in");
    const userData = this._tokenService.validateRefreshToken(refreshToken);
    if (!userData) throw ApiError.unauthorized("The user is not logged in");
    const user = await UserRepo.getById(userData.userId);

    return this.generateToken(user!);
  }

  generateToken(userDto: UserEntity) {
    const payload = {
      userId: userDto.id,
      roleId: userDto.roleId,
    };

    const tokens = this._tokenService.generateTokens(payload);
    return { ...tokens, user: payload };
  }
}
