import "dotenv/config";
import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routers from "./routers/index.js";
import errorHandlingMiddleware from "./middleware/error.handling.middleware.js";

const PORT = process.env.PORT || 5000;
const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", routers);

app.use(errorHandlingMiddleware);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
