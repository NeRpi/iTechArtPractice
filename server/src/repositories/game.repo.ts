import dbConnector from "../db/db.connector.ts";
import { GameEntity } from "../db/entities/game.entity.ts";
import { UserEntity } from "../db/entities/user.entity.js";
import { GameTypeEnum } from "../db/enums/game.type.enum.js";
import ApiError from "../error/api.error.js";

export const GameRepo = dbConnector.getRepository(GameEntity).extend({
  async create(firstUser: UserEntity, secondUser: UserEntity, type: GameTypeEnum) {
    try {
      const game = this.create({ users: [firstUser, secondUser], type });
      return await this.save(game);
    } catch (e) {
      throw ApiError.internal("Failed to create game");
    }
  }
});
