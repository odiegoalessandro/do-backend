import { NextFunction, Request, Response } from "express";
import { RegisterCredentials } from "../interfaces/user";
import { CreateUserService } from "../services/CreateUserService";
import { DeleteUserService } from "../services/DeleteUserService";

export class UserController {
  private createUserService: CreateUserService = new CreateUserService();
  private deleteUserService: DeleteUserService = new DeleteUserService();
  
  public async getUser(req: Request, res: Response) {
    throw new Error("Method not implemented.");
  }

   create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const registerUser: RegisterCredentials = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
      }

      const newUser = await this.createUserService.execute(registerUser);

      return res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
      
      await this.deleteUserService.execute(userId.toString());

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      throw new Error("Method not implemented.");
    } catch (error) {
      next(error);
    }
  }
}