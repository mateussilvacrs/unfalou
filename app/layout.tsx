import { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Footer from "@/components/footer";


const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Unfalou - Veja quem parou de te seguir",
  description: "Veja quem parou de te seguir",
  keywords: ["instagram", "seguidores", "quem deixou de seguir"],
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={geist.variable}>
      <body className={cn("min-h-screen flex  flex-col font-sans antialiased")}>
        <Header />

        <main className="flex-1">

          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}