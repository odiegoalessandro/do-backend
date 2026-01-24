import { NextFunction, Request, Response } from "express"
import { AppError } from "../middlewares/errorHandler"
import { CreateTodoService } from "../services/CreateTodoService"
import { DeleteTodoService } from "../services/DeleteTodoService"
import { GetTodosByCategoryService } from "../services/GetTodosByCategoyService"
import { UpdateTodoService } from "../services/UpdateTodoService"

export class TodoController {
  private getTodosByCategoryService: GetTodosByCategoryService = new GetTodosByCategoryService()
  private createTodoService: CreateTodoService = new CreateTodoService()
  private updateTodoService: UpdateTodoService = new UpdateTodoService()
  private deleteTodoService: DeleteTodoService = new DeleteTodoService()

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id

      if (!userId) {
        throw new AppError("UNAUTHORIZED", 401, "User not found")
      }

      const newTodo = await this.createTodoService.execute({
        description: req.body.description,
        categoryId: req.body.categoryId,
        userId
      })

      return res.status(201).json(newTodo)
    } catch (error) {
      next(error)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id

      if (!userId) {
        throw new AppError("UNAUTHORIZED", 401, "User not found")
      }

      const todoId = String(req.params.id)
      const updateData = {
        status: req.body.status,
      }

      const updatedTodo = await this.updateTodoService.execute(todoId, userId, updateData)

      return res.status(200).json(updatedTodo)
    } catch (error) {
      next(error)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id

      if (!userId) {
        throw new AppError("UNAUTHORIZED", 401, "User not found")
      }

      const todoId = String(req.params.id)

      await this.deleteTodoService.execute(todoId)

      return res.status(204).send()
    } catch (error) {
      next(error)
    }
  }

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryId = String(req.params.categoryId)
      const userId = req.user?.id

      if (!categoryId || !userId) {
        return res.status(400).json({ message: "Category ID and User ID are required" })
      }

      const todos = await this.getTodosByCategoryService.execute(categoryId, userId)

      return res.status(200).json(todos)
    } catch (error) {
      next(error)
    }
  }
}