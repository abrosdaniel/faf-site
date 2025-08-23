import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Игроки агентства",
  description: "Игроки футбольного агентства FAF",
  openGraph: {
    title: "Игроки агентства",
    description: "Игроки футбольного агентства FAF",
    url: "https://f-a-f.ru/players",
  },
  twitter: {
    title: "Игроки агентства",
    description: "Игроки футбольного агентства FAF",
  },
};

export default function PlayersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
