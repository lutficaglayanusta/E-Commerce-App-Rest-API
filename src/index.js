import startServer from "./server.js";
import { connectPostreSQL } from "./db/connectPostreSQL.js";

const boostrap = async () => {
  await connectPostreSQL();
  startServer();
};
boostrap();
