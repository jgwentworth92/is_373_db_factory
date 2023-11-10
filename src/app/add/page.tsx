"use client";

import { useState, useEffect } from "react";


import { GetToDo, AddToDo } from "@/server/factories"; // Import the necessary functions

export default function AddTodoPage() {
  const [todos, setTodos] = useState([]);
  const [newTodoName, setNewTodoName] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      const todosFromDb = await GetToDo();
      setTodos(todosFromDb);
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async (event) => {
    event.preventDefault();
    const addedTodo = await AddToDo(newTodoName);
    setTodos([...todos, addedTodo]); // Update local state to include new todo
    setNewTodoName(""); // Reset the input field
  };

  return (
    <div className="container mx-auto rounded-md p-2 dark:bg-gray-900 dark:text-gray-100 sm:p-4">
      <h2 className="leadi mb-3 text-2xl font-semibold">To Dos</h2>
      <form onSubmit={handleAddTodo} className="mb-4">
        <input
          type="text"
          value={newTodoName}
          onChange={(e) => setNewTodoName(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-4 text-base font-normal text-gray-600 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Enter todo name"
          required
        />
        <button
          type="submit"
          className="ml-2 inline-flex items-center justify-center rounded-full bg-blue-600 px-10 py-4 text-center text-base font-normal text-white hover:bg-opacity-90 disabled:bg-gray-500 lg:px-8 xl:px-10"
        >
          Add Todo
        </button>
      </form>
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
            {todos.map((todo, index) => (
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
