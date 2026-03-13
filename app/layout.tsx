
import { Metadata } from "next";
import "./globals.css";
import { Header } from "./components/header";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata ={
  title:'Unfollow Instagram Brazilian - Veja quem parou de te seguir',
  description:"Veja quem parou de te seguir"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={cn("font-sans", geist.variable)}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
