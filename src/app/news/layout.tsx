import type { Metadata } from "next";

const meta = {
  title: "Новости футбола | Трансферы, события и аналитика",
  description:
    "Актуальные новости футбольного мира. Трансферы игроков, события в футболе, аналитика рынка и инсайды из мира профессионального футбола.",
};

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: "https://f-a-f.ru/news",
  },
  twitter: {
    title: meta.title,
    description: meta.description,
  },
};

export default function NewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
