import { Router } from "express";
import { TodoController } from "../controllers/TodoController";

const todoController = new TodoController();

export const todoRouter = Router();

todoRouter.post("/", todoController.create);
todoRouter.put("/:id", todoController.update);
todoRouter.delete("/:id", todoController.delete);
todoRouter.get("/category/:categoryId/user/:userId", todoController.get);