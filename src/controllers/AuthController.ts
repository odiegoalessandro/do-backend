import { NextFunction, Request, Response } from "express";
import { LoginService } from "../services/LoginService";
import { RegisterService } from "../services/RegisterService";

export class AuthController {
  private registerService: RegisterService;
  private loginService: LoginService;

  constructor(
    registerService: RegisterService = new RegisterService(),
    loginService: LoginService = new LoginService()
  ) {
    this.registerService = registerService;
    this.loginService = loginService;
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, name, password } = req.body;
      const tokens = await this.registerService.execute(email, name, password);
  
      return res.status(201).json(tokens);
    } catch (error) {
      next(error);
    }
  }
  
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const tokens = await this.loginService.execute(email, password);
   
      return res.status(200).json(tokens);
    } catch (error) {
      next(error);
    }
  }
}