"use client";
import { EditAction } from "@/server/factories";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";

export interface EditProp {
  todoId: string;
  initialName: string;
  csrfToken: string;
}

function Submit() {
  const status = useFormStatus();
  return (
    <button
      className="inline-flex items-center justify-center rounded-full bg-green-600 px-10 py-4 text-center text-base font-normal text-white hover:bg-opacity-90 disabled:bg-gray-500"
      disabled={status.pending}
      type="submit"
    >
      Edit Todo
    </button>
  );
}
export default function EditButton({
  todoId,
  initialName,
  csrfToken,
}: EditProp) {
  return (
    <form action={EditAction}>
      <input type="hidden" name="csrf_token" value={csrfToken} />
      <input type="hidden" name="todoID" value={todoId} />
      <input
        type="text"
        defaultValue={initialName}
        name="editTodo"
        className="rounded-lg border border-gray-300 px-4 py-4 text-base font-normal text-gray-600 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <Submit />
    </form>
  );
}
