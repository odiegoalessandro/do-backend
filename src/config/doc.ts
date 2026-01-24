export const doc = {
  info: {
    title: 'Do API',
    description: 'Another todo app API I guess',
    version: '1.0.0'
  },
  components: {
    schemas: {
      Todo: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'uuid' },
          description: { type: 'string', example: 'Buy milk' },
          status: { type: 'string', example: 'PENDING' },
          categoryId: { type: 'string', example: 'uuid' },
          userId: { type: 'string', example: 'uuid' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },

      CreateTodoInput: {
        type: 'object',
        required: ['description', 'categoryId', 'userId'],
        properties: {
          description: { type: 'string' },
          categoryId: { type: 'string' },
          userId: { type: 'string' }
        }
      },

      UpdateTodoInput: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'DONE' }
        }
      },

      User: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'uuid' },
          email: { type: 'string', example: 'user@email.com' },
          name: { type: 'string', example: 'John Doe' },
          createdAt: { type: 'string', format: 'date-time' }
        }
      },

      CreateUserInput: {
        type: 'object',
        required: ['email', 'password', 'name'],
        properties: {
          email: { type: 'string' },
          password: { type: 'string', example: '********' },
          name: { type: 'string' }
        }
      },

      ErrorResponse: {
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      },
      Category: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'uuid' },
          name: { type: 'string', example: 'Food' },
          color: { type: 'string', example: '#FF0000' },
          userId: { type: 'string', example: 'uuid' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },

      CreateCategoryInput: {
        type: 'object',
        required: ['name', 'color', 'userId'],
        properties: {
          name: { type: 'string' },
          color: { type: 'string' },
          userId: { type: 'string' }
        }
      },

      UpdateCategoryInput: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          color: { type: 'string' }
        }
      },
      RegisterInput: {
        type: 'object',
        required: ['email', 'password', 'name'],
        properties: {
          email: { type: 'string', example: 'user@email.com' },
          password: { type: 'string', example: 'StrongPassword123!' },
          name: { type: 'string', example: 'John Doe' }
        }
      },
      LoginInput: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', example: 'user@email.com' },
          password: { type: 'string', example: 'StrongPassword123!' }
        }
      },
      TokenPair: {
        type: 'object',
        properties: {
          accessToken: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
          },
          refreshToken: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
          }
        }
      }
    }
  }
}
