import type { Metadata } from "next";

const meta = {
  title: "Наша команда | Профессиональные футбольные агенты и скауты",
  description:
    "Команда экспертов FAF. Опытные футбольные агенты, скауты и специалисты по развитию игроков. Профессионалы с международным опытом работы.",
};

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: "https://f-a-f.ru/team",
  },
  twitter: {
    title: meta.title,
    description: meta.description,
  },
};

export default function TeamLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
