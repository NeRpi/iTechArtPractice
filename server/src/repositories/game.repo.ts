import dbConnector from "../db/db.connector.ts";
import { GameEntity } from "../db/entities/game.entity.ts";
import { UserEntity } from "../db/entities/user.entity.js";
import { GameTypeEnum } from "../db/enums/game.type.enum.js";
import ApiError from "../error/api.error.js";

export const GameRepo = dbConnector.getRepository(GameEntity).extend({
  async createGame(firstUser: UserEntity, secondUser: UserEntity, type: GameTypeEnum) {
    try {
      const game = this.create({ type });
      game.users = [firstUser, secondUser];
      return await this.save(game);
    } catch (e) {
      console.log(e);
      throw ApiError.internal("Failed to create game");
    }
  },

  async getById(id: string) {
    try {
      return await this.findOneBy({ id });
    } catch (e) {
      throw ApiError.internal("Failed get game by id");
    }
  }
});
