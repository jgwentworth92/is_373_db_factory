
import { useState, useEffect } from "react";

import DeleteButton from "@/components/DeleteButton";
import { GetToDo } from "@/server/factories";
import { headers } from "next/headers";


export default async function Page() {
  type Todo = {
    id: string;
    name: string;
  };
  const todosFromDb = await GetToDo();
  const csrfToken = headers().get('X-CSRF-Token') || 'missing';
    return (
      <div className="container p-2 mx-auto rounded-md sm:p-4 dark:text-gray-100 dark:bg-gray-900">
        <h2 className="mb-3 text-2xl font-semibold leadi">To Do Delete</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead className="rounded-t-lg dark:bg-gray-700">
              <tr className="text-right">
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">ID</th>
                <th className="p-3">Todo</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {todosFromDb?.map((todo, index) => (
                <tr key={todo.id} className="text-right border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-3 py-2 text-left">{index + 1}</td>
                  <td className="px-3 py-2 text-left">{todo.id}</td>
                  <td className="px-3 py-2">{todo.name}</td>
                  <td className="px-3 py-2">
                    <DeleteButton todoId={todo.id}  csrfToken={csrfToken } />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }