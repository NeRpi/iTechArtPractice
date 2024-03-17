import { UserEntity } from "../db/entities/user.entity.js";
import { GameRepo } from "../repositories/game.repo.ts";
import { UserRepo } from "../repositories/user.repo.ts";
import { GameTypeEnum } from "../db/enums/game.type.enum.js";
import ApiError from "../error/api.error.js";
import Board from "../helpers/Board.ts";
import Move from "../helpers/move/Move.ts";

export const gameMap = new Map<string, Board>();

export default class GameService {
  private gameRepo = GameRepo;
  private userRepo = UserRepo;

  async createGame(firstUserId: string, secondUserId: string, type: GameTypeEnum) {
    const firstUser = await this.userRepo.getById(firstUserId);
    const secondUser = await this.userRepo.getById(secondUserId);
    if (!firstUser || !secondUser || firstUserId === secondUserId) throw ApiError.badRequest("Users is not valid!");
    const gameEntity = await this.gameRepo.createGame(firstUser, secondUser, type);
    const game = new Board();
    gameMap.set(gameEntity.id, game);
    game.startGame();
    return gameEntity;
  }

  async makeMove(game: Board, moveData: any) {
    const { fromX, fromY, toX, toY } = moveData;
    const cellFrom = game.getCell(fromX, fromY);
    if (!cellFrom) return false;
    const cellTo = game.getCell(toX, toY);
    if (!cellTo) return false;
    const piece = cellFrom.piece;
    if (!piece) return false;
    const move = new Move(piece, cellFrom, cellTo);
    const isPossibleMove = game
      .getMoves()
      .map((m) => m.toString())
      .includes(move.toString());
    if (!isPossibleMove) return false;
    game.movePiece(move);
    return true;
  }

  async getById(id: string) {
    return await this.gameRepo.getById(id);
  }

  async calculationElo(self: UserEntity, opponent: UserEntity, result: number) {
    const ea = 1 / (1 + Math.pow(10, (self.elo - opponent.elo) / 400));
    self.elo = ea + 20 * (result - ea);

    await this.userRepo.updateById(self);
    return await this.userRepo.getById(self.id);
  }

  async getBoardFEN(game: Board) {
    return game.fen;
  }

  async getMoves(game: Board) {
    return game.getMoves();
  }
}
