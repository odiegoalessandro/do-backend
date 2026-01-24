import { Router } from "express";
import { errorHandler } from "../middlewares/errorHandler";
import { authRouter } from "../routers/AuthRouter";
import { categoryRouter } from "../routers/CategoryRouter";
import { todoRouter } from "../routers/TodoRouter";
import { userRouter } from "../routers/UserRouter";

const globalRouter = Router();


globalRouter.use('/user', userRouter);
globalRouter.use('/category', categoryRouter);
globalRouter.use('/todo', todoRouter);
globalRouter.use('/auth', authRouter);

globalRouter.use(errorHandler);

export { globalRouter };
