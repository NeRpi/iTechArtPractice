import "dotenv/config.js";
import express from "express";
import cors from "cors";
import dbConnector from "./db/dbConnector.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

const start = async () => {
  try {
    await dbConnector.authenticate();
    await dbConnector.sync({ alter: true });
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
