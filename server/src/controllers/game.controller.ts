import { Request, Response, NextFunction } from "express";
import GameService from "../services/game.service.js";

class GameController {
  private gameService = new GameService();
  async create(req: Request, res: Response, next: NextFunction) {

  }
}