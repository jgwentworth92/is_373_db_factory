"use server";

import { revalidatePath } from "next/cache";
import { editToDo, AddToDo, deleteToDo } from "./factories";
import { getSession } from "@auth0/nextjs-auth0";

export async function EditAction(formData: FormData) {
 
    console.log("passed csrf validation");
  
    // Ensure todoId is a string
    const todoId = formData.get("todoID");
    if (typeof todoId !== 'string') {
      console.error('todoID is missing or not a string');
      return;
    }
  
    // Ensure todoName is a string
    const todoName = formData.get("editTodo");
    if (typeof todoName !== 'string') {
      console.error('editTodo is missing or not a string');
      return;
    }
  
    // Proceed with update
    await editToDo(todoId, todoName);
    revalidatePath('/');
  }
  
  export async function AddAction(formData: FormData) {

    console.log("passed csrf validation");
    const user = await getSession();

    // Ensure todoName is a string
    const todoName = formData.get("addTodo");
    if (typeof todoName !== 'string') {
      console.error('addTodo is missing or not a string');
      return;
    }
  
    // Proceed with addition
    await AddToDo(todoName,user?.user.sub);
    revalidatePath('/');
  }
  
  
  
  export async function DeleteAction(formData: FormData) {
  
    console.log("passed csrf validation");
  
    // Extract TodoID from formData and ensure it is a string
    const todoID = formData.get('TodoID');
    if (typeof todoID !== 'string') {
      console.error('TodoID is missing or not a string');
      return;
    }
  
    // Proceed with deletion
    await deleteToDo(todoID);
    revalidatePath('/');
  }