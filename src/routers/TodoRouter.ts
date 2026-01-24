import { NextFunction, Request, Response, Router } from "express"
import { TodoController } from "../controllers/TodoController"

export const todoRouter = Router()
const controller = new TodoController()

todoRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Todo']
    #swagger.summary = 'Criar todo'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/CreateTodoInput" }
        }
      }
    }
    #swagger.responses[201] = {
      schema: { $ref: "#/components/schemas/Todo" }
    },
    #swagger.security = [{ "bearerAuth": [] }]
  */
  return controller.create(req, res, next)
})

todoRouter.put("/:id", (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Todo']
    #swagger.summary = 'Atualizar todo'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'string'
    }
    #swagger.requestBody = {
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/UpdateTodoInput" }
        }
      }
    }
    #swagger.responses[200] = {
      schema: { $ref: "#/components/schemas/Todo" }
    },
    #swagger.security = [{ "bearerAuth": [] }]
  */
  return controller.update(req, res, next)
})

todoRouter.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Todo']
    #swagger.summary = 'Deletar todo'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'string'
    }
    #swagger.responses[204] = {
      description: 'Sem conteúdo'
    },
    #swagger.security = [{ "bearerAuth": [] }]
  */
  return controller.delete(req, res, next)
})

todoRouter.get("/category/:categoryId/user/:userId", (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Todo']
    #swagger.summary = 'Listar todos por categoria e usuário'
    #swagger.parameters['categoryId'] = {
      in: 'path',
      required: true,
      type: 'string'
    }
    #swagger.parameters['userId'] = {
      in: 'path',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      schema: {
        type: 'array',
        items: { $ref: "#/components/schemas/Todo" }
      }
    },
    #swagger.security = [{ "bearerAuth": [] }]
  */
  return controller.get(req, res, next)
})
