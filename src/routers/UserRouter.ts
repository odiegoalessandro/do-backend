import { Request, Response, Router } from "express"
import { UserController } from "../controllers/UserController"

export const userRouter = Router()
const controller = new UserController()

userRouter.post("/", (req: Request, res: Response) => {
  /*
    #swagger.tags = ['User']
    #swagger.summary = 'Criar usuário'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/CreateUserInput" }
        }
      }
    }
    #swagger.responses[201] = {
      schema: { $ref: "#/components/schemas/User" }
    }
    #swagger.responses[400] = {
      schema: { $ref: "#/components/schemas/ErrorResponse" }
    }
  */
  return controller.create(req, res, () => {})
})

userRouter.delete("/:id", (req: Request, res: Response) => {
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
  return controller.delete(req, res, () => {})
})

userRouter.put("/:id", (req: Request, res: Response) => {
  /*
    #swagger.tags = ['User']
    #swagger.summary = 'Atualizar usuário'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'string'
    }
    #swagger.responses[501] = {
      description: 'Não implementado'
    }
  */
  return controller.update(req, res, () => {})
})
