import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Анкета для игроков",
  description: "Анкета для игроков футбольного агентства FAF",
  openGraph: {
    title: "Анкета для игроков",
    description: "Анкета для игроков футбольного агентства FAF",
    url: "https://f-a-f.ru/form",
  },
  twitter: {
    title: "Анкета для игроков",
    description: "Анкета для игроков футбольного агентства FAF",
  },
};

export default function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
