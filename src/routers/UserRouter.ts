import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { registerCredentialsSchema } from "../interfaces/user";
import { validate } from "../middlewares/validate";

export const userRouter = Router();

const userController = new UserController();

userRouter.post("/", validate(registerCredentialsSchema), userController.create);
userRouter.delete("/:id", userController.delete);
userRouter.put("/:id", userController.update);