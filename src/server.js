import express from "express";
import { env } from "./utils/env.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import indexRoute from "./routers/index.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const startServer = () => {
  const app = express();

  app.use(express.json());

  app.use(cors());

  app.use(cookieParser());

  app.use(indexRoute);

  app.use(notFoundHandler);
  app.use(errorHandler);

  const PORT = Number(env("PORT", "3000"));

  app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
  });
};

export default startServer;
