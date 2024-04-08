import express from "express";
import logger from "morgan";
import dotenv from "dotenv";
import mongoose from "./lib/db";
import webtoon_router from "./route/webtoon";
import user_router from "./route/user";
import cors from "cors";
import compression from "compression";

dotenv.config();

const port = process.env.PORT;
const server = express();

server.use(logger("dev"));

server.use(compression());

server.use("/webtoon", webtoon_router); //웹툰 라우팅
server.use("/user", user_router);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
