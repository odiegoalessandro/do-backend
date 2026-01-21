import { prisma } from "../config/prisma"
import { PrismaClient } from "../generated/prisma/client"
import { CategoryCreateInput } from "../generated/prisma/models"
import { CreateCategoryData } from "../interfaces/category"

export class CreateCategoryService {
  private prisma: PrismaClient
  
  constructor(prismaClient: PrismaClient = prisma) {
    this.prisma = prismaClient
  }
 
  public async execute({ name, color, userId }: CreateCategoryData): Promise<void> {
    const newCategory: CategoryCreateInput = {
      name,
      user: { connect: { id: userId } },
      color: color ? color : this.getRandomColor()
    }

    await this.prisma.category.create({
      data: newCategory
    })
  }

  private getRandomColor(): string {
    const colors = [  
    '#FFCDD2', '#F8BBD0', '#E1BEE7', 
    '#D1C4E9', '#C5CAE9', '#BBDEFB', 
    '#B3E5FC', '#B2EBF2', '#B2DFDB', 
    '#C8E6C9', '#DCEDC8', '#FFF9C4', 
    '#FFECB3', '#FFE0B2'
    ]

    const randomIndex = Math.floor(Math.random() * colors.length)
    
    return colors[randomIndex]
  }
}