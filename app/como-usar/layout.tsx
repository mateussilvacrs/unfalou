import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Como usar o Unfalou - Veja quem deixou de seguir no Instagram",
  description:
    "Aprenda como usar o Unfalou para analisar seus seguidores e descobrir quem não segue você de volta no Instagram.",

  keywords: [
    "como usar unfalou",
    "tutorial instagram",
    "ver quem deixou de seguir",
    "analisar seguidores",
    "unfollow instagram",
  ],

  openGraph: {
    title: "Como usar o Unfalou",
    description:
      "Aprenda passo a passo como descobrir quem deixou de seguir você no Instagram.",
    url: "https://unfalou.com/como-usar",
    siteName: "Unfalou",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/logo-lateral.png",
        width: 1200,
        height: 630,
        alt: "Como usar o Unfalou",
      },
    ],
  },
};


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}