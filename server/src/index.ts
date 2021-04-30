import bodyParser from "body-parser";
import connectRedis from "connect-redis";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import { createConnection } from "typeorm";
import { Cart } from "./entities/Cart";
import { Product } from "./entities/Product";
import { User } from "./entities/User";

dotenv.config();

const main = async () => {
  const app = express();

  const conn = await createConnection({
    type: "postgres",
    // ssl: {
    //   rejectUnauthorized: false,
    // },
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    entities: [User, Product, Cart],
  });

  app.use(bodyParser.json());
  app.use(
    cors({
      origin: process.env.ORIGIN_URL,
      credentials: true,
    }),
  );

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    session({
      name: "qid",
      store: new RedisStore({ client: redis as any, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      },
      saveUninitialized: false,
      secret: process.env.SECRET as string,
      resave: false,
    }),
  );

  app.use("/", require("./routes/user"));
  app.use("/", require("./routes/product"));
  app.use("/", require("./routes/cart"));
  app.use("/", require("./routes/payment"));

  let port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log("you are on port ", port);
  });
};
main().catch((err) => {
  console.log(err);
});
