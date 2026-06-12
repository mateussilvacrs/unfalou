import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://unfalou.com",
      lastModified: new Date(),
    },
    {
      url: "https://unfalou.com/como-usar",
      lastModified: new Date(),
    },
    {
      url: "https://unfalou.com/atualizacoes",
      lastModified: new Date(),
    },
  ];
}