
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
export default async function Home() {
  const prisma = new PrismaClient();
  const todos = await prisma.toDo.findMany();
 

  return (
      <div className="container p-2 mx-auto rounded-md sm:p-4 dark:text-gray-100 dark:bg-gray-900">
        <Link href="/api/auth/login">Login</Link>
        <br></br>
        <Link href="/api/auth/logout">Logout</Link>
        <h2 className="mb-3 text-2xl font-semibold leadi">To Do list</h2>
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
                    <span>{todo.name}</span>
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
  );
}