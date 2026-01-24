import { NextFunction, Request, Response, Router } from 'express'
import { CategoryController } from '../controllers/CategoryController'

export const categoryRouter = Router()
const controller = new CategoryController()

categoryRouter.post('/categories', (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Category']
    #swagger.summary = 'Criar categoria'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/CreateCategoryInput" }
        }
      }
    }
    #swagger.responses[201] = {
      schema: { $ref: "#/components/schemas/Category" }
    },
    #swagger.security = [{ "bearerAuth": [] }]
  */
  return controller.create(req, res, next)
})

categoryRouter.get('/categories/:id', (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Category']
    #swagger.summary = 'Buscar categoria'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      schema: { $ref: "#/components/schemas/Category" }
    },
    #swagger.security = [{ "bearerAuth": [] }]
  */
  return controller.get(req, res, next)
})

categoryRouter.put('/categories/:id', (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Category']
    #swagger.summary = 'Atualizar categoria'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'string'
    }
    #swagger.requestBody = {
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/UpdateCategoryInput" }
        }
      }
    }
    #swagger.responses[200] = {
      schema: { $ref: "#/components/schemas/Category" }
    },
    #swagger.security = [{ "bearerAuth": [] }]
  */
  return controller.update(req, res, next)
})

categoryRouter.delete('/categories/:id', (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Category']
    #swagger.summary = 'Deletar categoria'
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

categoryRouter.get('/categories', (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Category']
    #swagger.summary = 'Listar todas as categorias'
    #swagger.responses[200] = {
      schema: {
        type: 'array',
        items: { $ref: "#/components/schemas/Category" }
      }
    },
    #swagger.security = [{ "bearerAuth": [] }]
  */
  return controller.getAll(req, res, next)
})
