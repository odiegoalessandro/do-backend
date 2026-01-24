import { NextFunction, Request, Response } from "express";
import { AppError } from "../middlewares/errorHandler";
import { CreateCategoryService } from "../services/CreateCategoryService";
import { DeleteCategoryService } from "../services/DeleteCategoryService";
import { GetAllCategoriesService } from "../services/GetAllCategoriesService";
import { GetCategoryService } from "../services/GetCategoryService";
import { UpdateCategoryService } from "../services/UpdateCategoryService";

export class CategoryController {
  private createCategoryService: CreateCategoryService;
  private deleteCategoryService: DeleteCategoryService;
  private updateCategoryService: UpdateCategoryService;
  private getCategoryService: GetCategoryService;
  private getAllCategoriesService: GetAllCategoriesService;

  constructor() {
    this.createCategoryService = new CreateCategoryService();
    this.deleteCategoryService = new DeleteCategoryService();
    this.updateCategoryService = new UpdateCategoryService();
    this.getCategoryService = new GetCategoryService();
    this.getAllCategoriesService = new GetAllCategoriesService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, color } = req.body;
      const user = req.user;

      if (!user) {
        throw new AppError("UNAUTHORIZED", 401, "User not found");  
      }

      const category = await this.createCategoryService.execute({ name, color, userId: user.id });
      
      return res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      const categoryId: string = String(req.params.id);      

      if (!userId || !categoryId) {
        throw new AppError("BAD_REQUEST", 400, "Category ID are required");  
      }

      await this.deleteCategoryService.execute(categoryId, userId);

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { color, name } = req.body;
      const  categoryId: string = String(req.params.id);      
      const userId = req.user?.id;

      if (!userId || !categoryId) {
        throw new AppError("BAD_REQUEST", 400, "Category ID are required");  
      }

      const updatedCategory = await this.updateCategoryService.execute(categoryId, userId, {
        name,
        color
      });
    
      return res.status(200).json(updatedCategory);
    } catch (error) {
      next(error);
    }
  }

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryId: string = String(req.params.id);
      const userId = req.user?.id;

      if (!userId || !categoryId) {
        throw new AppError("BAD_REQUEST", 400, "Category ID are required");  
      }

      const category = await this.getCategoryService.execute(categoryId, userId);
    
      return res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        throw new AppError("UNAUTHORIZED", 401, "User not found");  
      }

      const categories = await this.getAllCategoriesService.execute(userId);
    
      return res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }
}