import { Request, Response, NextFunction } from "express";
import { SessionData, Session } from "express-session";
import { MyContext } from "../types";

const isAuth = (
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: any };
  },
  res: Response,
  next: NextFunction,
) => {
  // if (!req.session.userId) {
  //   console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}`);

  //   return next("not authenticated");
  // }
  next();
};

export default isAuth;
