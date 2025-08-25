import type { Metadata } from "next";

const meta = {
  title: "Наши игроки | Профессиональные футболисты и молодые таланты",
  description:
    "Профессиональные футболисты, молодые таланты и перспективные игроки. Успешные трансферы и карьерное развитие наших подопечных.",
};

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: "https://f-a-f.ru/players",
  },
  twitter: {
    title: meta.title,
    description: meta.description,
  },
};

export default function PlayersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
