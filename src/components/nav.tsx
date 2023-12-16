import Link from "next/link";
import React from "react";

import { Button } from "./ui/button";
import { getSession } from "@auth0/nextjs-auth0";

export async function Header() {
  const user = await getSession();
  return (
    <>
      <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
        <div className="flex items-center text-lg font-medium">
          <Button variant="secondary"  asChild className="ml-2 ">
            <Link href="/">To-Do List</Link>
          </Button>
          <Button variant="secondary" asChild className="ml-2">
            <Link href="/todoActions">To-Do Actions</Link>
          </Button>
        </div>
        <div className="flex items-center justify-end space-x-2">
          {user?.user ? (
            <Button  variant="secondary" asChild className="ml-2">
              <Link href="/api/auth/logout">Logout</Link>
            </Button>
          ) : (
            <Button variant="link" asChild className="-ml-2">
              <Link href="/api/auth/login">Login</Link>
            </Button>
          )}
        </div>
      </header>
    </>
  );
}
