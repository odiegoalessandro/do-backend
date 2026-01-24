import { Request, Response } from "express";
import { CreateCategoryService } from "../services/CreateCategoryService";
import { DeleteCategoryService } from "../services/DeleteCategoryService";
import { GetCategoryService } from "../services/GetCategoryService";
import { UpdateCategoryService } from "../services/UpdateCategoryService";

export class CategoryController {
  private createCategoryService: CreateCategoryService;
  private deleteCategoryService: DeleteCategoryService;
  private updateCategoryService: UpdateCategoryService;
  private getCategoryService: GetCategoryService;

  constructor() {
    this.createCategoryService = new CreateCategoryService();
    this.deleteCategoryService = new DeleteCategoryService();
    this.updateCategoryService = new UpdateCategoryService();
    this.getCategoryService = new GetCategoryService();
  }

  create = async (req: Request, res: Response) => {
    try {
      const { name, color, userId } = req.body;

      const category = await this.createCategoryService.execute({ name, color, userId });
      
      return res.status(201).json(category);
    } catch (error) {
      throw (error);
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      const categoryId: string = String(req.params.id);      

      await this.deleteCategoryService.execute(categoryId);

      return res.status(204).send();
    } catch (error) {
      throw (error);
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      const { color, name } = req.body;
      const  categoryId: string = String(req.params.id);      

      const updatedCategory = await this.updateCategoryService.execute(categoryId, {
        name,
        color
      });
    
      return res.status(200).json(updatedCategory);
    } catch (error) {
      throw (error);
    }
  }

  get = async (req: Request, res: Response) => {
    try {
      const categoryId: string = String(req.params.id);      

      const category = await this.getCategoryService.execute(categoryId);
    
      return res.status(200).json(category);
    } catch (error) {
      throw (error);
    }
  }
}