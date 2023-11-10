"use client"

import { useState, useEffect } from "react";

import DeleteButton from "@/components/DeleteButton";
import { GetToDo } from "@/server/factories";


export default function Page() {
    const [todos, setTodos] = useState([]);
  
    useEffect(() => {
   
      const fetchTodos = async () => {
        const todosFromDb = await GetToDo();
        setTodos(todosFromDb);
      };
      fetchTodos();
    }, []);
  
    const handleDelete = (deletedTodoId: string) => {
      setTodos(todos.filter(todo => todo?.id !== deletedTodoId));
    };
  
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
              {todos?.map((todo, index) => (
                <tr key={todo.id} className="text-right border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-3 py-2 text-left">{index + 1}</td>
                  <td className="px-3 py-2 text-left">{todo.id}</td>
                  <td className="px-3 py-2">{todo.name}</td>
                  <td className="px-3 py-2">
                    <DeleteButton todoId={todo.id} onDelete={() => handleDelete(todo.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }