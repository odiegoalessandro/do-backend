import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";
import { createCategorySchema, updateCategorySchema } from "../interfaces/category";
import { validate } from "../middlewares/validate";

export const categoryRouter = Router()

const categoryController = new CategoryController();

categoryRouter.get("/:id", categoryController.get);
categoryRouter.post("/", validate(createCategorySchema), categoryController.create);
categoryRouter.delete("/:id", categoryController.delete);
categoryRouter.put("/:id", validate(updateCategorySchema), categoryController.update); 