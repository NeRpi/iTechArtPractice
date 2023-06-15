import "dotenv/config.js";
import express from "express";
import cors from "cors";
import dbConnector from "./db/dbConnector.js";
import routers from "./routers/index.js";
import cookieParser from "cookie-parser";
import errorHandlingMiddleware from "./middleware/error.handling.middleware.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", routers);

app.use(errorHandlingMiddleware);

const start = async () => {
  try {
    await dbConnector.authenticate();
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
