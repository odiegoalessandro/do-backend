import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const authController = new AuthController();

export const authRouter = Router();

authRouter.post("/register", (req, res, next) => {
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Register a new user'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/RegisterInput" },
          example: {
            email: "user@email.com",
            name: "John Doe",
            password: "StrongPassword123!"
          }
        }
      }
    }
    #swagger.responses[201] = {
      description: 'User registered successfully',
      schema: { $ref: "#/components/schemas/TokenPair" }
    }
  */

  authController.register(req, res, next)
});

authRouter.post("/login", (req, res, next) => {
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Login a user'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/LoginInput" },
          example: {
            email: "user@email.com",
            password: "StrongPassword123!"
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: 'User logged in successfully',
      schema: { $ref: "#/components/schemas/TokenPair" }
    }
  */

  authController.login(req, res, next)
});