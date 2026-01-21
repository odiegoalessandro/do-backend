import { Router } from "express";
import { errorHandler } from "../middlewares/errorHandler";
import { categoryRouter } from "../routers/CategoryRouter";
import { userRouter } from "../routers/UserRouter";

const globalRouter = Router();

globalRouter.use(errorHandler);

globalRouter.use('/user', userRouter);
globalRouter.use('/category', categoryRouter);

export { globalRouter };
