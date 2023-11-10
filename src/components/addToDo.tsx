/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useRef, useState, useTransition } from "react";
import { PrismaClient } from "@prisma/client";
import { createtoDo } from "@/server/factories";
const prisma = new PrismaClient();
export default function AddButton() {
  const [pending, startTransition] = useTransition();
  const todoRef = useRef<HTMLInputElement>(null);
  const [todos, settodo] = useState("");
  const handleClick = async () => {
    const test = await createtoDo(todoRef.current!.value);
    settodo(test.name);
    console.log(test)
  };
  return (
    <div>
      <input
        ref={todoRef}
        type="text"
        name="todo"
        className="rounded-lg border border-gray-300 px-4 py-4 text-base font-normal text-gray-600 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <button
        disabled={pending}
        onClick={async () => startTransition(handleClick)}
        className="inline-flex items-center justify-center rounded-full bg-blue-600 px-10 py-4 text-center text-base font-normal text-white hover:bg-opacity-90 disabled:bg-gray-500 lg:px-8 xl:px-10"
      >
        Add Todo
      </button>
    </div>
  );
}
