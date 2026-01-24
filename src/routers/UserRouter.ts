import { NextFunction, Request, Response, Router } from "express"
import { UserController } from "../controllers/UserController"

export const userRouter = Router()
const controller = new UserController()

userRouter.get("/self", (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['User']
    #swagger.summary = 'Obter dados do usuário autenticado'
    #swagger.responses[200] = {
      description: 'Usuário obtido com sucesso',
      schema: { $ref: "#/components/schemas/UserResponse" }
    }
    #swagger.responses[400] = {
      schema: { $ref: "#/components/schemas/ErrorResponse" }
    }
  */

  return controller.get(req, res, next)
})

userRouter.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['User']
    #swagger.summary = 'Deletar usuário'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'string'
    }
    #swagger.responses[204] = {
      description: 'Sem conteúdo'
    }
    #swagger.responses[400] = {
      schema: { $ref: "#/components/schemas/ErrorResponse" }
    }
  */
  return controller.delete(req, res, next)
})
