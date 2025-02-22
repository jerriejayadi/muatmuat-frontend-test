"use client";
import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Pokeball from "../../../public/images/pokeball-pokemon-catch-svgrepo-com";

export default function Layout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <div className="flex items-start justify-start min-h-screen">
      <div className="hidden flex-grow md:flex flex-col max-w-[280px] border-r border-neutral-300 h-screen sticky top-0 p-4">
        <p className="text-2xl font-bold">MuatMuat Test</p>
        <div className="mt-8 flex flex-col">
          <Link
            href="/"
            className={`px-4 py-3 rounded-lg ${
              path === "/" && "bg-blue-100 text-blue-600"
            }`}
          >
            Home
          </Link>
          <Link
            href="/pokemon"
            className={`px-4 py-3 rounded-lg ${
              path === "/pokemon" && "bg-blue-100 text-blue-600"
            }`}
          >
            Pokemon
          </Link>
        </div>
      </div>
      <div className="w-full">{children}</div>
      <div className="fixed bottom-0 flex items-center justify-around bg-white w-full border-t border-neutral-300 md:hidden">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center size-20 ${
            path === "/" && "text-blue-600"
          }`}
        >
          <Home className="size-6" />
          <span className="text-sm">Home</span>
        </Link>
        <Link
          href="/pokemon"
          className={`flex flex-col items-center justify-center size-20 ${
            path === "/pokemon" && "text-blue-600"
          }`}
        >
          <Pokeball className="size-7" />
          <span className="text-sm">Pokemon</span>
        </Link>
      </div>
    </div>
  );
}
