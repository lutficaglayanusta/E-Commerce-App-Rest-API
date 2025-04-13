import dotenv from "dotenv";
import pg from "pg";

dotenv.config({
  path: "./dotenv/env/config.env",
});

const { Pool } = pg;

const { USER, PASSWORD, HOST, PG_PORT, DATABASE } = process.env;

const pool = new Pool({
  user: USER,
  password: PASSWORD,
  host: HOST,
  port: PG_PORT,
  database: DATABASE,
});

export default pool;
