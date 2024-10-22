import express from "express";
import errorMiddleware from "../middlewares/error";
import routes from "./routes";
import cors from "cors";

const app = express();

export const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json()).use(routes).use(errorMiddleware);

export default app;
