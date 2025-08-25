import type { Metadata } from "next";

const meta = {
  title: "Политика конфиденциальности | Защита персональных данных",
  description:
    "Политика конфиденциальности. Принципы обработки и защиты персональных данных клиентов. Прозрачность и безопасность информации.",
};

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: "https://f-a-f.ru/term",
  },
  twitter: {
    title: meta.title,
    description: meta.description,
  },
};

export default function TermLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
