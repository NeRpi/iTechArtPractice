import "dotenv/config.js";
import express from "express";
import cors from "cors";
import dbConnector from "./db/dbConnector.js";
import routers from "./routers/index.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routers);

const start = async () => {
  try {
    await dbConnector.authenticate();
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
