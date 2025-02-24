import dotenv from "dotenv";
import pg from "pg";

dotenv.config({
  path: "./dotenv/env/config.env",
});

const { Pool } = pg;

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PG_PORT,
  database: process.env.DATABASE,
});

export default pool;
