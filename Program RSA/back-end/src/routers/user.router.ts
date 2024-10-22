import { Router } from "express";
import rescue from "express-rescue";
import userController from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth";

const userRouter = Router();

userRouter.route("/").get(userController.getAllId);
userRouter.route("/:id").get(authMiddleware, rescue(userController.getById));

export default userRouter;
