import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "../lib/prisma";
import { RSALogic } from "../lib/rsa";

class HistoryController {
  async getAllId(req: Request, res: Response, next: NextFunction) {
    console.log(res.locals.payload); // just to see the payload

    const history = await prisma.history.findMany();

    if (!history)
      return next({
        status: StatusCodes.NOT_FOUND,
        message: "History is empty",
      });

    res.status(StatusCodes.OK).json({ history });
  }

  async createHistory(req: Request, res: Response, next: NextFunction) {
    let { nominal, asal, tujuan, userId } = req.body;

    if (!nominal || !asal || !tujuan || !userId) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: "Some required fields are missing",
      });
    }

    nominal = RSALogic(nominal);

    const createHistory = await prisma.history.create({
      data: {
        nominal,
        asal,
        tujuan,
        userId,
      },
    });

    res.status(StatusCodes.CREATED).json({ createHistory });
  }
}

export default new HistoryController();
