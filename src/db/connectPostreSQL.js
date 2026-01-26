import { neon } from "@neondatabase/serverless";
import { env } from "../utils/env.js";

const user = env("PGUSER");
const password = env("PGPASSWORD");
const host = env("PGHOST");
const database = env("PGDATABASE");

export const sql = neon(`postgresql://${user}:${password}@${host}/${database}`);

export const connectPostreSQL = async () => {
  try {
    await sql`
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
            updated_at TIMESTAMP WITH TIME ZONE
        )
      `;
    await sql`
      CREATE TABLE IF NOT EXISTS sessions(
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
          accessToken VARCHAR(512) NOT NULL,
          refreshToken VARCHAR(512) NOT NULL,
          accessTokenValidUntil DATE NOT NULL,
          refreshTokenValidUntil DATE NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
          updated_at TIMESTAMP WITH TIME ZONE
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS products(
        id SERIAL PRIMARY KEY,
        image VARCHAR(255),
        title VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        category_id INTEGER REFERENCES category(id) ON DELETE CASCADE
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS carts(
        id SERIAL PRIMARY KEY,
        image VARCHAR(255),
        title VARCHAR(255) NOT NULL,
        quantity INTEGER NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS category(
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        image VARCHAR(255)
      );
    `;

    console.log("Successfully connected to PostgreSQL");
  } catch (error) {
    console.log("Could not connect to PostgreSQL ", error);
    throw error;
  }
};
