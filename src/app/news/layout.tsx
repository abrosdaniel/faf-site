import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Новости агентства",
  description: "Новости футбольного агентства FAF",
  openGraph: {
    title: "Новости агентства",
    description: "Новости футбольного агентства FAF",
    url: "https://f-a-f.ru/news",
  },
  twitter: {
    title: "Новости агентства",
    description: "Новости футбольного агентства FAF",
  },
};

export default function NewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
