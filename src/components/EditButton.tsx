"use client";
import { useRef, useState, useTransition } from "react";

import { editToDo } from "@/server/factories"; // Make sure to import your editToDo function

export default function EditButton({ todoId, initialName }) {
  const [pending, startTransition] = useTransition();
  const newNameRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(initialName); // Initial name of the todo

  const handleClick = async () => {
    const updated = await editToDo(todoId, newNameRef.current!.value);
    setName(updated.name);
    console.log(updated);
  };

  return (
    <div>
      <input
        ref={newNameRef}
        type="text"
        defaultValue={initialName}
        className="rounded-lg border border-gray-300 px-4 py-4 text-base font-normal text-gray-600 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <button
        disabled={pending}
        onClick={async () => startTransition(handleClick)}
        className="inline-flex items-center justify-center rounded-full bg-green-600 px-10 py-4 text-center text-base font-normal text-white hover:bg-opacity-90 disabled:bg-gray-500"
      >
        Edit Todo
      </button>
    </div>
  );
}