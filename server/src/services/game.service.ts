import { UserEntity } from "../db/entities/user.entity.js";
import { GameRepo } from "../repositories/game.repo.ts";
import { UserRepo } from "../repositories/user.repo.ts";
import { GameTypeEnum } from "../db/enums/game.type.enum.js";
import ApiError from "../error/api.error.js";

export default class GameService {
  private gameRepo = GameRepo;
  private userRepo = UserRepo;

  async createGame(firstUserId: string, secondUserId: string, type: GameTypeEnum) {
    const firstUser = await this.userRepo.getById(firstUserId);
    const secondUser = await this.userRepo.getById(secondUserId);
    if (!firstUser || !secondUser || firstUserId === secondUserId) throw ApiError.badRequest("Users is not valid!");
    return await this.gameRepo.createGame(firstUser, secondUser, type);
  }

  async getById(id: string) {
    return await this.gameRepo.getById(id);
  }

  async makeMove() {}

  async calculationElo(self: UserEntity, opponent: UserEntity, result: number) {
    const ea = 1 / (1 + Math.pow(10, (self.elo - opponent.elo) / 400));
    self.elo = ea + 20 * (result - ea);

    await this.userRepo.updateById(self);
    return await this.userRepo.getById(self.id);
  }

  async getMoves() {}
}
