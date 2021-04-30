import argon2 from "argon2";
import express from "express";
import { getConnection } from "typeorm";
import { User } from "../entities/User";
import { MyRequest } from "../types";
import { handleRegisterError } from "../utils/LoginOrRegisterError";

const router = express.Router();

export class UserInput {
  username: string;
  password: string;
  email: string;
}

export class UserInputLogin {
  usernameOrEmail: string;
  password: string;
}

router.post("/register", async (req: MyRequest, res) => {
  const input = req.body as UserInput;
  const error = await handleRegisterError(input);
  if (error) {
    return res.send(error);
  }

  const hashedPassword = await argon2.hash(input.password);

  let user;
  try {
    const result = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        username: input.username,
        email: input.email,
        password: hashedPassword,
      })
      .returning("*")
      .execute();
    user = result.raw[0];
    delete (user as any).password;
  } catch (err) {
    if ((err.code = "23505")) {
      return res.send({
        error: {
          field: "username",
          message: "username already exist",
        },
      });
    }
  }

  req.session.userId = user.id;

  res.send(user);
});
router.post("/login", async (req: MyRequest, res) => {
  const { usernameOrEmail, password } = req.body as UserInputLogin;

  const userConnection = getConnection()
    .createQueryBuilder()
    .select("user")
    .from(User, "user")
    .addSelect("user.password");
  usernameOrEmail.includes("@")
    ? userConnection.where("user.email = :email", { email: usernameOrEmail })
    : userConnection.where("user.username = :username", {
        username: usernameOrEmail,
      });

  const user = await userConnection.getOne();

  if (!user) {
    return res.send({
      error: {
        field: "usernameOrEmail",
        message: "usernameOrEmail doesn't exist",
      },
    });
  }

  const validate = await argon2.verify(user.password, password);

  delete (user as any).password;

  if (!validate) {
    return res.send({
      error: {
        field: "password",
        message: "Incorrect password",
      },
    });
  }

  req.session.userId = user.id;

  return res.send(user);
});

router.get("/users", async (_, res) => {
  res.send(await User.find());
});

router.get("/me", async (req: MyRequest, res) => {
  const m = await User.findOne(req.session.userId);
  console.log(req.session);
  req.session.userId
    ? res.send(await User.findOne(req.session.userId))
    : res.send(null);
});

router.get("/logout", async (req: MyRequest, res) => {
  return res.send(
    await new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie("qid");
        if (err) {
          console.log(err);
          return resolve(false);
        }
        return resolve(true);
      }),
    ),
  );
});

module.exports = router;
