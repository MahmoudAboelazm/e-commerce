import { NextFunction, Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { Redis } from "ioredis";
export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: any };
  };
  redis: Redis;
  res: Response;
  next: NextFunction;
};
export type MyRequest = Request & {
  session: Session & Partial<SessionData> & { userId?: any; cartId?: any };
};
