import "dotenv/config";
import express, { Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import cors from "cors";
import cookieParser from "cookie-parser";
import routers from "./routers/index.ts";
import socketHandlers from "./socket.handlers/index.js";
import errorHandlingMiddleware from "./middleware/error.handling.middleware.ts";

const PORT = process.env.PORT || 5000;
const app: Express = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", routers);
app.use(errorHandlingMiddleware);

io.on("connection", (socket) => {
  socketHandlers(io, socket);
});

httpServer.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
