import { MetadataRoute } from "next";
import directus from "@/services/directus";
import { readItem } from "@directus/sdk";

export const revalidate = 0;

const baseUrl = process.env.NEXT_PUBLIC_FRONT_URL || "https://f-a-f.ru";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const news = await directus.request(
    readItem("news", 1, {
      fields: ["posts.*"],
      deep: {
        posts: {
          sort: ["-date_created"],
        },
      },
    })
  );

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/players`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "hourly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/form`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/term`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.4,
    },
  ];

  const newsPages = news.posts.map((post: any) => ({
    url: `${baseUrl}/news/${post.id}`,
    lastModified: post.date_updated ? new Date(post.date_updated) : new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...newsPages];
}
