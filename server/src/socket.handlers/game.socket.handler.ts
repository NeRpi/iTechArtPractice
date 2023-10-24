import { Server, Socket } from "socket.io";
import GameService from "../services/game.service.js";
import { GameTypeEnum } from "../db/enums/game.type.enum.js";

const gameService = new GameService();

export default function gameSocketHandler(io: Server, socket: Socket) {
  const createGame = async (gameType: GameTypeEnum) => {
    const sockets = await io.in(`game:search:${gameType}`).fetchSockets();

    console.log(gameType);

    if (sockets.length === 0) {
      socket.join(`game:search:${gameType}`);
    } else {
      const socketEnemy = sockets.reduce(
        (prev, curr) =>
          Math.abs(prev.data.elo - socket.data.elo) < Math.abs(curr.data.elo - socket.data.elo) ? prev : curr,
        sockets[0]
      );
      socketEnemy.leave(`game:search:${gameType}`);
      const game = await gameService.createGame(socket.data.id, socketEnemy.data.id, gameType);
      console.log(game);
    }
  };

  const gameMove = async () => {};

  socket.on("game:create", createGame);
}
