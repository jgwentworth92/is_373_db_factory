'use client'

import Link from "next/link";
import React from "react";
import { signIn } from 'next-auth/react'

export function Header() {
  const [isLoading, setIsLoading] = React.useState(false)
  return (
    <header className="p-4 dark:bg-gray-800 dark:text-gray-100">
      <div className="container mx-auto flex h-16 justify-between">
        <ul className="hidden items-stretch space-x-3 md:flex">
          <li className="flex">
            <Link
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-10 py-4 text-center text-base font-normal text-white hover:bg-opacity-90 disabled:bg-gray-500 lg:px-8 xl:px-10"
              href="/"
            >
              toDo list{" "}
            </Link>
          </li>
          <li className="flex">
            <Link
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-10 py-4 text-center text-base font-normal text-white hover:bg-opacity-90 disabled:bg-gray-500 lg:px-8 xl:px-10"
              href="/delete"
            >
              delete{" "}
            </Link>
          </li>
          <li className="flex">
            <Link
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-10 py-4 text-center text-base font-normal text-white hover:bg-opacity-90 disabled:bg-gray-500 lg:px-8 xl:px-10"
              href="/add"
            >
              add to do
            </Link>
          </li>
          <li className="flex">
            <Link
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-10 py-4 text-center text-base font-normal text-white hover:bg-opacity-90 disabled:bg-gray-500 lg:px-8 xl:px-10"
              href="/edit"
            >
              edit{" "}
            </Link>
          </li>
        </ul>
        <button className="flex justify-end p-4 md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
}
