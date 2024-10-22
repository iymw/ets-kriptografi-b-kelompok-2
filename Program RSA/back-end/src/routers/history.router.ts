import { Router } from "express";
// import rescue from "express-rescue";
import historyController from "../controllers/history.controller";
// import authMiddleware from "../middlewares/auth";

const historyRouter = Router();

// historyRouter
//   .route("/")
//   .get(authMiddleware, rescue(historyController.getAllId));
// historyRouter
//   .route("/")
//   .post(authMiddleware, rescue(historyController.createHistory));
historyRouter.route("/").get(historyController.getAllId);
historyRouter.route("/").post(historyController.createHistory);

export default historyRouter;
