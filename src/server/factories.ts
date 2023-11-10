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

    return createTodo



  }


  export async function editToDo(id: string, newName: string) {
    const updatedTodo = await prisma.toDo.update({
      where: {
        id: id, // Assumes 'id' is the unique identifier for your Todo model
      },
      data: {
        name: newName, // Update the name of the Todo
        // You can add more fields here if needed
      },
    });
  
    return updatedTodo;
  }

  export async function deleteToDo(id: string) {
    const deletedTodo = await prisma.toDo.delete({
      where: {
        id: id, // Again, assumes 'id' is the unique identifier
      },
    });
  
    return deletedTodo;
  }
  