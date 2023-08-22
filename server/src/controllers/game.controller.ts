import { Request, Response, NextFunction } from "express";
import GameService from "../services/game.service.js";

class GameController {
  private gameService = new GameService();

  async create(req: Request, res: Response, next: NextFunction) {}

  async motions(req: Request, res: Response, next: NextFunction) {

  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;
    return await this.gameService.getById(id);
  }
}

export default new GameController();
