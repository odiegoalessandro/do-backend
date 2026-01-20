import { Router } from "express";
import { errorHandler } from "../middlewares/errorHandler";
import { userRouter } from "../routers/UserRouter";

const globalRouter = Router();

globalRouter.use(errorHandler);
globalRouter.use(userRouter);

export { globalRouter };
