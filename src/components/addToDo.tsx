"use client";

import { AddAction } from "@/server/formHandlers";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export interface addProp {
  csrfToken: string;
}

function Submit() {
  const status = useFormStatus();
  return (
    <Button
      className="mt-3 flex w-full items-center justify-center gap-x-2 px-4 py-2.5 text-sm font-medium  sm:mt-0 sm:w-auto"
      disabled={status.pending}
      type="submit"
    >
      add Todo
    </Button>
  );
}
export default function AddButton({ csrfToken }: addProp) {
  return (
    <form
      action={AddAction}
      className="items-center justify-center gap-x-3 sm:flex"
    >
      <input type="hidden" name="csrf_token" value={csrfToken} />
      <input
        type="text"
        placeholder="Enter your new To-Do"
        name="addTodo"
        className="w-full rounded-lg px-3   py-2.5 shadow sm:w-auto sm:max-w-sm"
      />

      <Submit />
    </form>
  );
}
