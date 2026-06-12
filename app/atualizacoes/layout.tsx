import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atualizações - Unfalou",
  description:
    "Veja as novidades, melhorias e novos recursos do Unfalou para acompanhar seus seguidores no Instagram.",

  keywords: [
    "atualizações unfalou",
    "novidades instagram",
    "melhorias unfalou",
    "controle seguidores instagram",
  ],

  openGraph: {
    title: "Atualizações - Unfalou",
    description:
      "Confira as novidades e melhorias do Unfalou.",
    url: "https://unfalou.com/atualizacoes",
    siteName: "Unfalou",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/logo-lateral.png",
        width: 1200,
        height: 630,
        alt: "Atualizações Unfalou",
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