import type { Metadata } from "next";

const meta = {
  title: "Заявка в футбольное агентство | Начни карьеру футболиста",
  description:
    "Подай заявку в FAF и получи профессиональное представительство. Анкета игрока для молодых талантов и опытных футболистов.",
};

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: "https://f-a-f.ru/form",
  },
  twitter: {
    title: meta.title,
    description: meta.description,
  },
};

export default function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
