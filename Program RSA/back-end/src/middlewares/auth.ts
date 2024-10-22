import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "../utils/jwt";

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return next({
      status: StatusCodes.UNAUTHORIZED,
      message: "No token provided",
    });

  try {
    const data = jwt.verify(token);
    res.locals.payload = data;

    if (req.params.id) {
      if (parseInt(res.locals.payload.id) !== parseInt(req.params.id)) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .json({ message: "You are not authorized to access this resource." });
      }
    }

    return next();
  } catch {
    return next({ status: StatusCodes.UNAUTHORIZED, message: "Unauthorized" });
  }
};
