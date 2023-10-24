import { Request, Response, NextFunction } from "express";
import GameService from "../services/game.service.js";

class GameController {
  private gameService: GameService;

  constructor() {
    this.gameService = new GameService();
  }

  getById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const game = await this.gameService.getById(id);
    return res.json(game);
  }
}

export default new GameController();
