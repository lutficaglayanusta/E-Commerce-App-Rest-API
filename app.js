import express from "express";
import dotenv from "dotenv"
import indexRoute from "./routes/indexRoute.js"

const app = express();

dotenv.config({
    path:"./dotenv/env/config.env"
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api",indexRoute)

app.listen(process.env.PORT, () => {
  console.log(`Sunucu ${process.env.PORT} portunda başlatıldı`);
});
