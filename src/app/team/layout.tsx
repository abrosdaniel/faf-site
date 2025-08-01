import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Команда агентства",
  description: "Команда агентства футбольного агентства FAF",
  openGraph: {
    title: "Команда агентства",
    description: "Команда агентства футбольного агентства FAF",
    url: "https://f-a-f.ru/team",
  },
  twitter: {
    title: "Команда агентства",
    description: "Команда агентства футбольного агентства FAF",
  },
};

export default function TeamLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
