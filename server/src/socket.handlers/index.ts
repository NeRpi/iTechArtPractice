import { Server, Socket } from "socket.io";
import { jwtSocketMiddleware } from "../middleware/jwt.middleware.js";
import gameSocketHandler from "./game.socket.handler.js";

export default function socketHandlers(io: Server, socket: Socket) {
  io.use(jwtSocketMiddleware);
  gameSocketHandler(io, socket);
}
