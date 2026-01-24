import { Router } from "express";
import { errorHandler } from "../middlewares/errorHandler";
import { categoryRouter } from "../routers/CategoryRouter";
import { todoRouter } from "../routers/TodoRouter";
import { userRouter } from "../routers/UserRouter";

const globalRouter = Router();


globalRouter.use('/user', userRouter);
globalRouter.use('/category', categoryRouter);
globalRouter.use('/todo', todoRouter);

globalRouter.use(errorHandler);

export { globalRouter };
