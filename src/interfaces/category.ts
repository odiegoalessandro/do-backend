import { Todo } from "./todo"

export interface Category {
  id: string
  name: string
  color: string
  userId: string
  createdAt: string
  updatedAt: string
  todos?: Todo[]
}

export interface CreateCategoryData {
  name: string
  color?: string
}

export interface UpdateCategoryData {
  name?: string
  color?: string
}