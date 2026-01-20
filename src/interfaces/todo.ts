export interface Todo {
  id: string
  description: string
  status: boolean
  categoryId: string
  userId: string
  createdAt: string
  updatedAt: string
}

export interface CreateTodoData {
  description: string
  categoryId: string
}

export interface UpdateTodoData {
  description?: string
  status?: boolean
  categoryId?: string
}
