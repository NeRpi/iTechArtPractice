import { UserEntity } from "../db/entities/user.entity.js";
import { GameTypeEnum } from "../db/enums/game.type.enum.js";

class GameDto {
  moves: string;
  users: UserEntity[];
  type: GameTypeEnum;
  result: number;

  constructor(data: any) {
    ({ moves: this.moves, users: this.users, type: this.type, result: this.result } = data);
  }
}
