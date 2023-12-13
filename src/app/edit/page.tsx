import EditButton from "@/components/EditButton";
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import {redirect} from "next/navigation";
import { getSession } from '@auth0/nextjs-auth0';
export default async function Home() {

  // Authentication
  const session = await getSession();
  const isAuthenticated = session?.user.sub;
  if (!isAuthenticated) {
    redirect("/api/auth/login");
  }

  const prisma = new PrismaClient();
  const todos = await prisma.toDo.findMany();
  const csrfToken = headers().get('X-CSRF-Token') || 'missing';
  return (
    <div className="container p-2 mx-auto rounded-md sm:p-4 dark:text-gray-100 dark:bg-gray-900">
    <h2 className="mb-3 text-2xl font-semibold leadi">Edit To Do List</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full text-xs">
        <thead className="rounded-t-lg dark:bg-gray-700">
          <tr className="text-right">
            <th title="Ranking" className="p-3 text-left">#</th>
            <th title="id" className="p-3 text-left">ID</th>
            <th title="name" className="p-3">todo</th>
          </tr>
        </thead>
        <tbody>
        {todos?.map((todo, index) => 
          <tr key={index} className="text-right border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
            <td className="px-3 py-2 text-left">
              <span>{index}</span>
            </td>
            <td className="px-3 py-2 text-left">
              <span>{todo.id}</span>
            </td>
            <td className="px-3 py-2">
            <EditButton todoId={todo.id} initialName={todo.name} csrfToken={csrfToken}/>
            </td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  </div>
  );
}


