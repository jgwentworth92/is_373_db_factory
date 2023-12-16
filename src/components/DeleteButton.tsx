"use client";

import { DeleteAction } from "@/server/formHandlers";
import { useFormStatus } from "react-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
export interface DeleteProp {
  todoId: string;
  csrfToken: string;
}

function Submit() {
  const status = useFormStatus();
  return (
    <Button
      disabled={status.pending}
      type="submit"
      variant="destructive"
      className="mb-2 mt-2"
    >
      Delete
    </Button>
  );
}
export default function DeleteButton({ todoId, csrfToken }: DeleteProp) {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        asChild
        className="ml-2 mt-4 flex w-32 items-center justify-center py-2"
      >
        <Button variant={"destructive"}>delete me</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 h-full w-full bg-black opacity-40" />
        <Dialog.Content className="fixed left-[50%] top-[50%] w-full max-w-lg translate-x-[-50%] translate-y-[-50%] px-4">
          <div className="rounded-md bg-white px-4 py-6 shadow-lg sm:flex">
            <div className="mx-auto flex h-12 w-12 flex-none items-center justify-center rounded-full bg-red-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="mt-2 text-center sm:ml-4 sm:text-left">
              <Dialog.Title className="text-lg font-medium text-gray-800">
                {" "}
                Delete ToDo
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm leading-relaxed text-gray-500">
                Are you sure that you want delete this very important ToDo
              </Dialog.Description>
              <div className="mt-3 items-center gap-2 text-sm sm:flex">
                <form action={DeleteAction}>
                  <input type="hidden" name="csrf_token" value={csrfToken} />
                  <input value={todoId} name="TodoID" type="hidden" />
                  <Submit />
                </form>
                <Dialog.Close asChild>
                  <Button aria-label="Close" variant={"secondary"}>
                    Cancel
                  </Button>
                </Dialog.Close>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
