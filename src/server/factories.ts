"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function AddToDo(todo: string) {
  const createTodo = await prisma.toDo.create({
    data: {
      name: todo,
      // Assuming you have additional fields, you can add them here as needed.
    },
  });

  return createTodo;
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

export async function GetToDo() {
  const todosFromDb = await prisma.toDo.findMany();
  return todosFromDb;
}


export async function EditAction(formData: FormData) {
  "use server";
  console.log("passed csrf validation");
  const todoId=formData.get("todoID")
  const todoName = formData.get(`editTodo`)
    ? formData.get(`editTodo`)
    : "missing";
  const updated = await editToDo(todoId, todoName);
  revalidatePath('/edit');
  redirect('/edit');
}