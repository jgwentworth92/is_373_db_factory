import { useState, useEffect } from "react";

import DeleteButton from "@/components/DeleteButton";
import { GetToDo } from "@/server/factories";
import { headers } from "next/headers";
import EditButton from "@/components/EditButton";
import AddButton from "@/components/addToDo";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

export default async function Page() {
  type Todo = {
    id: string;
    name: string;
  };
  const todosFromDb = await GetToDo();
  const csrfToken = headers().get("X-CSRF-Token") || "missing";
  const user = await getSession();
  console.log(user)
  if (!user) {
    redirect("/api/auth/login");
  }
  return (
    <div className="container mx-auto rounded-md p-2 dark:bg-gray-900 dark:text-gray-100 sm:p-4">
      <AddButton csrfToken={csrfToken} />
      <h2 className="leading mb-3 text-2xl font-semibold">To Do Delete</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead className="rounded-t-lg dark:bg-gray-700">
            <tr className="text-right">
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Todo</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todosFromDb?.map((todo, index) => (
              <tr
                key={todo.id}
                className="border-b border-opacity-20 text-right dark:border-gray-700 dark:bg-gray-800"
              >
                <td className="px-3 py-2 text-left">{index + 1}</td>
                <td className="px-3 py-2 text-left">{todo.id}</td>
                <td className="px-3 py-2">{todo.name}</td>
                <td className="flex items-center space-x-2 px-3 py-2">
                  <EditButton
                    todoId={todo.id}
                    initialName={todo.name}
                    csrfToken={csrfToken}
                  />
                  <DeleteButton todoId={todo.id} csrfToken={csrfToken} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
