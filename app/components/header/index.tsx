import Link from "next/link";

export function Header() {
  return (
    <header>
      <div className=" text-white h-20 bg-linear-to-r from-amber-500 to-pink-500 flex">
        <div className="txt-title-site font-bold flex items-center px-12 justify-between w-full">
          <div>
            <h1 className="text-2xl">Parou de Seguir?</h1>
          </div>
          <nav className="menu-links text-[18px]">
            <ul className="flex gap-8 ">
              <li>
                <Link href={"/"}
                  className=" transition-all duration-700 hover:opacity-80 hover:text-black"
>                  Home
                </Link>
              </li>
                            <li>
                <Link href={"/tutorial"}
className=" transition-all duration-700 hover:opacity-80 hover:text-black">
                  Tutorial
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
