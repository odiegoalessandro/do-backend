import { Request, Response, Router } from "express";
import { authMiddleware } from "../middlewares/authMidleware";
import { errorHandler } from "../middlewares/errorHandler";
import { authRouter } from "../routers/AuthRouter";
import { categoryRouter } from "../routers/CategoryRouter";
import { todoRouter } from "../routers/TodoRouter";
import { userRouter } from "../routers/UserRouter";
import { Env } from "./env";

const globalRouter = Router();

// autheticated routes
globalRouter.use('/user', authMiddleware(Env.JWT_ACCESS_SECRET), userRouter);
globalRouter.use('/category', authMiddleware(Env.JWT_ACCESS_SECRET), categoryRouter);
globalRouter.use('/todo', authMiddleware(Env.JWT_ACCESS_SECRET), todoRouter);


// unauthenticated routes
globalRouter.use('/auth', authRouter);

// default routes
globalRouter.get('/heartbeat', (req: Request, res: Response) => {
  res.status(200).send({
    status: 'ok'
  })
})

globalRouter.use((req: Request, res: Response) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl,
    method: req.method
  })
})

globalRouter.use(errorHandler);

export { globalRouter };
