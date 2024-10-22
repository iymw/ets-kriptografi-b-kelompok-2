import { Router } from "express";
import authRouter from "../routers/auth.router";
import userRouter from "../routers/user.router";
import historyRouter from "../routers/history.router";

const router = Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/history", historyRouter);

export default router;
