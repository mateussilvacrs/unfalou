import { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/next";


const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
        metadataBase: new URL("https://unfalou.com"),

  title: "Unfalou - Descubra quem deixou de seguir você no Instagram",
  description:
    "Veja quem não segue você de volta e descubra quem deixou de seguir seu Instagram. Tenha controle dos seus seguidores de forma simples e rápida.",
  keywords: [
    "instagram",
    "seguidores",
    "quem deixou de seguir",
    "unfollow",
    "não segue de volta",
    "analisar seguidores instagram",
    "perdi seguidores",
    "controle instagram",
    "unfalou",
  ],

  openGraph: {
    title: "Unfalou - Veja quem deixou de seguir você no Instagram",
    description:
      "Descubra quem parou de seguir você no Instagram e acompanhe seus seguidores.",
    url: "https://unfalou.com",
    siteName: "Unfalou",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/logo-lateral.png",
        width: 1200,
        height: 630,
        alt: "Unfalou - Controle seus seguidores do Instagram",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Unfalou - Descubra quem deixou de seguir você",
    description:
      "Analise seus seguidores do Instagram e veja quem não segue você de volta.",
    images: ["/logo-lateral.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  creator: "Unfalou",
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
        <Analytics />
      </body>
    </html>
  );
}