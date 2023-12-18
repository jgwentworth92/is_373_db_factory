"use client";

import { EditAction } from "@/server/formHandlers";
import { useFormStatus } from "react-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
export interface EditProp {
  todoId: string;
  initialName: string;
  csrfToken: string;
}

function Submit() {
  const status = useFormStatus();
  return (
    <Button
      disabled={status.pending}
      type="submit"
      variant="default"
      className="mb-2 mt-2"
    >
      Submit
    </Button>
  );
}
export default function EditButton({
  todoId,
  initialName,
  csrfToken,
}: EditProp) {
  return (
    <>
      <Dialog.Root className="fixed inset-0 z-10 overflow-y-auto">
        <Dialog.Trigger
          asChild
          className="ml-2 mt-4 flex w-16  items-center justify-center rounded-md  py-2 "
        >
          <Button variant={"default"}> edit</Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 h-full w-full bg-black opacity-40" />
          <Dialog.Content className="fixed left-[50%] top-[50%] mx-auto w-full max-w-lg translate-x-[-50%] translate-y-[-50%] px-4">
            <div className="rounded-md bg-white px-4 py-6 shadow-lg">
              <div className="flex items-center justify-end">
                <Dialog.Close className="rounded-md p-2 text-gray-400 hover:bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Dialog.Close>
              </div>
              <div className="mx-auto max-w-sm space-y-3 text-center ">
                <Dialog.Title className="text-lg font-medium text-gray-800 ">
                  Todo Edit
                </Dialog.Title>

                <Dialog.Description className=" text-sm text-gray-600">
                  <p>Edit Your To Do</p>
                </Dialog.Description>

                <form action={EditAction} className="Fieldset relative">
                  <input type="hidden" name="csrf_token" value={csrfToken} />
                  <input type="hidden" name="todoID" value={todoId} />
                  <input
                    type="text"
                    defaultValue={initialName}
                    name="editTodo"
                    className="w-full rounded-lg border bg-transparent py-2 pl-12 pr-3 text-gray-500 shadow-sm outline-none focus:border-indigo-600"
                  />
                  <Submit />
                </form>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
