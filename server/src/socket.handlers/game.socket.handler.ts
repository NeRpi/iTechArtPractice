import { Namespace, Socket } from "socket.io";
import GameService, { gameMap } from "../services/game.service.js";
import { randomUUID } from "crypto";
import Board from "../helpers/Board.ts";

const gameService = new GameService();

const handleChangeState = (socket: Namespace, gameBoard: Board, gameId: string) => {
  socket.in(`game:${gameId}`).emit("game:change:state", {
    fen: gameBoard.fen,
    moves: gameBoard.getMoves().reduce(
      (a, v) => ({
        ...a,
        [v.cellFrom.toString()]: [...(a[v.cellFrom.toString()] ?? []), v.cellTo.x * 8 + v.cellTo.y]
      }),
      {} as { [key: string]: number[] }
    )
  });
};

export default function gameSocketHandler(game: Namespace, socket: Socket) {
  const createGame = async () => {
    const sockets = (await game.in(`game:search`).fetchSockets()).filter((s) => s.id !== socket.id);
    if (sockets.length === 0) {
      socket.join(`game:search`);
    } else {
      const socketEnemy = sockets[0];
      socketEnemy.leave(`game:search`);
      const id = randomUUID();
      socket.join(`game:${id}`);
      socketEnemy.join(`game:${id}`);
      gameMap.set(id, new Board());
      game.in(`game:${id}`).emit("game:start", { id });
    }
  };

  const runGame = async (data: any) => {
    const { gameId } = data;
    const gameBoard = gameMap.get(gameId);

    if (gameBoard) {
      handleChangeState(game, gameBoard, gameId);
      socket.on("game:make:move", (data: any) => {
        const { move } = data;
        gameService?.makeMove(gameBoard, move);
        handleChangeState(game, gameBoard, gameId);
      });
    }
  };

  socket.on("game:search", createGame);
  socket.on("game:run", runGame);
}
