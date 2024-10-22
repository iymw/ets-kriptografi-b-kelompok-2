import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "../lib/prisma";

class UserController {
  async getById(req: Request, res: Response, next: NextFunction) {
    console.log(res.locals.payload); // just to see the payload

    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
      include: { history: true },
    });

    if (!user)
      return next({ status: StatusCodes.NOT_FOUND, message: "User not found" });

    res
      .status(StatusCodes.OK)
      .json({ name: user.name, email: user.email, history: user.history });
  }

  async getAllId(req: Request, res: Response, next: NextFunction) {
    console.log(res.locals.payload); // just to see the payload

    const user = await prisma.user.findMany();

    if (!user)
      return next({ status: StatusCodes.NOT_FOUND, message: "User is empty" });

    res.status(StatusCodes.OK).json({ user });
  }
}

export default new UserController();
