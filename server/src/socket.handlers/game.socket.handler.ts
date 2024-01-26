import { Server, Socket } from "socket.io";
import GameService, { gameMap } from "../services/game.service.js";
import { GameTypeEnum } from "../db/enums/game.type.enum.js";

const gameService = new GameService();

type CallBack = (data: any) => ReturnType<any>;

export default function gameSocketHandler(io: Server, socket: Socket) {
  const createGame = async (data: any, callBack: CallBack) => {
    const gameType = data.gameType || GameTypeEnum.rapid;
    const sockets = await io.in(`game:search:${gameType}`).fetchSockets();

    if (sockets.length === 0) {
      socket.join(`game:search:${gameType}`);
    } else {
      const socketEnemy = sockets.reduce(
        (prev, curr) =>
          Math.abs(prev.data.elo - socket.data.elo) < Math.abs(curr.data.elo - socket.data.elo) ? prev : curr,
        sockets[0]
      );

      socketEnemy.leave(`game:search:${gameType}`);
      const gameEntity = await gameService.createGame(socket.data.id, socketEnemy.data.id, gameType);
      socket.join(`game:${gameEntity.id}`);
      socketEnemy.join(`game:${gameEntity.id}`);
      io.to(`game:${gameEntity.id}`).emit("game:run");
    }
  };

  const runGame = async (data: any, callBack: CallBack) => {
    const { gameId } = data;
    const game = gameMap.get(gameId);
    console.log("here");
    if (game) {
      socket.on("game:get:moves", (data: any, callBack: CallBack) => {
        const moves = gameService.getMoves(game);
        console.log("here");
        // callBack({ moves });
      });

      socket.on("game:make:move", (data: any, callBack: CallBack) => {
        const { move } = data;
        const isMove = gameService?.makeMove(game, move);
        if (!isMove) callBack("Not valide move");
      });
    }
  };

  socket.on("game:create", createGame);
  socket.on("game:run", runGame);
}
