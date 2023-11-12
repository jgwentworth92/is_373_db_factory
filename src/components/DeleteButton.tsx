"use client";
import { DeleteAction } from "@/server/factories";
import { useFormStatus } from "react-dom";

export interface DeleteProp {
  todoId: string;
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
     Delete
    </button>
  );
}
export default function DeleteButton({ todoId, csrfToken }: DeleteProp) {
  return (
    <form action={DeleteAction}>
      <input type="hidden" name="csrf_token" value={csrfToken} />

      <input
      
        value={todoId}
        name="TodoID"
        type="hidden"
      />
      <Submit />
    </form>
  );
}
