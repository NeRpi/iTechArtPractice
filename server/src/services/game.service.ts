import { UserEntity } from "../db/entities/user.entity.js";
import { GameRepo } from "../repositories/game.repo.ts";
import { UserRepo } from "../repositories/user.repo.ts";

export default class GameService {
  private gameRepo = GameRepo;
  private userRepo = UserRepo;

  async createGame() {
    await this.gameRepo.create;
  }

  async calculationElo(self: UserEntity, opponent: UserEntity, result: number) {
    const ea = 1 / (1 + Math.pow(10, (self.elo - opponent.elo) / 400));
    self.elo = ea + 20 * (result - ea);

    await this.userRepo.updateById(self);
    return await this.userRepo.getById(self.id);
  }

  async getById(id: string) {
    return await this.gameRepo.getById(id);
  }

  async motion() {}

  async prevMotion() {}

  async nextMotion() {}

  async getMoves() {}
}
