import { getSession } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
export default async function Home() {
  const prisma = new PrismaClient();
  const todos = await prisma.toDo.findMany();
  const session = await getSession();

  return (
    <div className="container mx-auto rounded-md p-2 dark:bg-gray-900 dark:text-gray-100 sm:p-4">
      {session?.user ? (
        <Link href="/api/auth/logout">Logout</Link>
      ) : (
        <Link href="/api/auth/login">Login</Link>
      )}
      <h2 className="leadi mb-3 text-2xl font-semibold">To Do list</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead className="rounded-t-lg dark:bg-gray-700">
            <tr className="text-right">
              <th title="Ranking" className="p-3 text-left">
                #
              </th>
              <th title="id" className="p-3 text-left">
                ID
              </th>
              <th title="name" className="p-3">
                todo
              </th>
            </tr>
          </thead>
          <tbody>
            {todos?.map((todo, index) => (
              <tr
                key={index}
                className="border-b border-opacity-20 text-right dark:border-gray-700 dark:bg-gray-800"
              >
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
