import express from "express";
import { env } from "./utils/env.js";

const startServer = () => {
  const app = express();

  const PORT = Number(env("PORT", "3000"));

  app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
  });
};

export default startServer;
