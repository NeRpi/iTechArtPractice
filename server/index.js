require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./db/entities/index");
const routers = require("./routers/index.js");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routers);

const start = async () => {
  try {
    await sequelize.authenticate();
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
