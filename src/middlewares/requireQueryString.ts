import { Response, Request, NextFunction } from "express";

export const requireQueryString = (queryName: string) => (req: Request, res: Response, next: NextFunction) => {
  if (req.query[queryName]) {
    next();
  } else {
    res.status(400).send(`Query string ${queryName} is missing`);
  }
};
