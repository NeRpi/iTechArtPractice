import { UserRepo } from "../repositories/user.repo.js";
import ApiError from "../error/api.error.js";
import TokenService from "./token.service.js";
import { BcryptUtil } from "../utils/bcrypt.util.js";
import { UserEntity } from "../db/entities/user.entity.js";
import { UserDto } from "../dto/user.dto.js";

export default class AuthService {
  private tokenService;
  private userRepo;

  constructor() {
    this.tokenService = new TokenService();
    this.userRepo = UserRepo;
  }

  async registration(email: string, password: string) {
    if (await this.userRepo.getByEmail(email))
      throw ApiError.internal("The mail is already registered");
    const hashPassword = await BcryptUtil.hash(password);
    const userDto = new UserDto({ email, password: hashPassword });
    const user = await this.userRepo.createUser(userDto);

    return this.generateToken(user);
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.getByEmail(email);
    if (!user) throw ApiError.internal("The user is not registered");
    const isPassEquals = await BcryptUtil.compare(password, user.password);
    if (!isPassEquals) throw ApiError.badRequest("Invalid email or password");

    return this.generateToken(user);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) throw ApiError.unauthorized("The user is not logged in");
    const userData = this.tokenService.validateRefreshToken(refreshToken);
    if (!userData) throw ApiError.unauthorized("The user is not logged in");
    const user = await this.userRepo.getById(userData.userId);

    return this.generateToken(user!);
  }

  generateToken(userDto: UserEntity) {
    const payload = {
      userId: userDto.id,
      roleId: userDto.roleId,
    };

    const tokens = this.tokenService.generateTokens(payload);
    return { ...tokens, user: payload };
  }
}
