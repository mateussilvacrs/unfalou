"use client"

import Image from "next/image";
import Link from "next/link";
import { Menu } from 'lucide-react';
import { useState } from "react";
import { Analytics } from "@vercel/analytics/next"


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    
    <header className="bg-linear-90 from-[#000000] to-[#010b97] text-white">
      <Analytics />
<div className="max-w-7xl mx-auto px-4 flex h-20 items-center justify-between w-full">
    <Link href="/">

    <Image
      alt="logo"
      src="/logo-lateral.png"
      width={220}
      height={100}
      priority
      unoptimized
          className="h-10 w-auto sm:h-12 md:h-14 lg:h-14"

    />
  </Link>


        {/* Menu */}
        <div className="hidden sm:block menu-desktop">
        <nav className="text-[18px] font-semibold">
          <ul className="flex gap-8">
            <li className="transition duration-200 hover:scale-105">
              <Link
                href="/"
              >
                Home
              </Link>
            </li>

            <li className="transition duration-200 hover:scale-105">
              <Link
                href="/como-usar"
              >
                Como usar
              </Link>
            </li>

            <li className="transition duration-200 hover:scale-105">
              <Link
                href="/atualizacoes"
              >
                Atualizações
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="transition-all duration-1000 sm:hidden menu-mobile">
        <Menu onClick={()=>
          setMenuOpen(!menuOpen)
        } className="cursor-pointer" />
      </div>
      </div>
<div
  className={`sm:hidden overflow-hidden transition-all duration-500 ${
    menuOpen ? "max-h-40" : "max-h-0"
  } bg-linear-90 from-[#000000] to-[#010b97] border-t shadow-xl`}
>                <nav className="text-sm font-semibold">
          <ul className="flex flex-col gap-2 items-center my-4">
            <li>
              <Link
                href="/"
                className="transition duration-300 hover:text-black hover:opacity-80"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/como-usar"
                className="transition duration-300 hover:text-black hover:opacity-80"
                onClick={() => setMenuOpen(false)}
              >
                Como usar
              </Link>
            </li>
            <li>
              <Link
                href="/atualizacoes"
                className="transition duration-300 hover:text-black hover:opacity-80"
                onClick={() => setMenuOpen(false)}
              >
                Atualizações
              </Link>
            </li>
            
          </ul>
        </nav>
      </div>
      
    </header>
  );
}