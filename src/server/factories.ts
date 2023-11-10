"use server"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createtoDo(todo:string) {
 const createTodo= await prisma.toDo.create({
      data: {
        name:todo,
        // Assuming you have additional fields, you can add them here as needed.
      },
    });
    await prisma.$disconnect();
    return createTodo



  }