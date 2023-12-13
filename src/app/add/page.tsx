
import AddButton from "@/components/addToDo";
import { AddToDo, GetToDo } from "@/server/factories";
import { headers } from "next/headers";
import { getSession } from '@auth0/nextjs-auth0';
import { useState, useEffect } from "react";

; // Import the necessary functions

export default async function AddTodoPage() {

  type Todo = {
    id: string;
    name: string;
  };
  
  const todosFromDb = await GetToDo();
  const csrfToken = headers().get('X-CSRF-Token') || 'missing';

  return (
    <div className="container mx-auto rounded-md p-2 dark:bg-gray-900 dark:text-gray-100 sm:p-4">
      <h2 className="leadi mb-3 text-2xl font-semibold">To Dos</h2>
      <AddButton csrfToken={csrfToken}/>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead className="rounded-t-lg dark:bg-gray-700">
            <tr className="text-right">
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">ID</th>
              <th className="p-3">Todo</th>
              
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
      );
}
