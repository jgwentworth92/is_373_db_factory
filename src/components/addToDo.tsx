"use client";

import { AddAction } from "@/server/factories";
import { useFormStatus } from "react-dom";

export interface addProp {
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
     add Todo
    </button>
  );
}
export default function AddButton({
  csrfToken,
}: addProp) {
  return (
    <form action={AddAction}>
      <input type="hidden" name="csrf_token" value={csrfToken} />
    
      <input
        type="text"
       
        name="addTodo"
        className="rounded-lg border border-gray-300 px-4 py-4 text-base font-normal text-gray-600 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <Submit />
    </form>
  );
}
