import AddButton from "@/components/addToDo";
import { PrismaClient } from '@prisma/client';
export default async function Home() {
  const prisma = new PrismaClient();
  const todos = await prisma.toDo.findMany()
  return (
    <main className="p-5">
      <h1 className="text-4xl font-bold">Todos</h1>
      <AddButton />
      <ul>
        {todos?.map((todo, index) => (
          <li key={index}>{todo.name}</li>
        ))}
      </ul>
    </main>
  );
}
