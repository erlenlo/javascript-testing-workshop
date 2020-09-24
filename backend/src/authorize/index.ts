import { NextFunction, Request, Response } from "express";
import { validateUsername } from "../articles/validation";

export default () => (req: Request, res: Response, next: NextFunction): void =>
  validateUsername(req.headers.authorization, res, () => next());
