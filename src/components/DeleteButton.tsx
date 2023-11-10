"use client";
import { useState, useTransition } from "react";

import { deleteToDo } from "@/server/factories"; // Make sure to import your deleteToDo function

export default function DeleteButton({ todoId, onDelete }) {
  const [pending, startTransition] = useTransition();

  const handleClick = async () => {
    await deleteToDo(todoId);
    onDelete(); // Callback to handle UI update after deletion
  };

  return (
    <button
      disabled={pending}
      onClick={() => startTransition(handleClick)}
      className="inline-flex items-center justify-center rounded-full bg-red-600 px-10 py-4 text-center text-base font-normal text-white hover:bg-opacity-90 disabled:bg-gray-500"
    >
      Delete Todo
    </button>
  );
}