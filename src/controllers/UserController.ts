import { Request, Response } from "express";
import { RegisterCredentials } from "../interfaces/user";
import { CreateUserService } from "../services/CreateUserService";

export class UserController {
  private createUserService: CreateUserService = new CreateUserService();
  
  public async getUser(req: Request, res: Response) {
    throw new Error("Method not implemented.");
  }

   createUser = async (req: Request, res: Response) => {
    try {
      const registerUser: RegisterCredentials = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
      }

      const newUser = await this.createUserService.execute(registerUser);

      return res.status(201).json(newUser);
    } catch (error) {
      throw error;
    }
  }

  public async deleteUser(req: Request, res: Response) {
    throw new Error("Method not implemented.");
  }

  public async updateUser(req: Request, res: Response) {
    throw new Error("Method not implemented.");
  }
}