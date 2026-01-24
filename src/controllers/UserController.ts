import { NextFunction, Request, Response } from "express";
import { AppError } from "../middlewares/errorHandler";
import { DeleteUserService } from "../services/DeleteUserService";

export class UserController {
  private deleteUserService: DeleteUserService = new DeleteUserService();
  
  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;

      if (!user) {
        throw new AppError("UNAUTHORIZED", 401, "User not found");
      }

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        throw new AppError("UNAUTHORIZED", 401, "User not found");
      }
      
      await this.deleteUserService.execute(userId.toString());

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}