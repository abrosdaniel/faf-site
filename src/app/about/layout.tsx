import type { Metadata } from "next";

const meta = {
  title: "О нас | Надежное футбольное агентство с международным опытом",
  description:
    "FAF Football Agency - современное футбольное агентство с инновационным подходом. Наша миссия, ценности и принципы работы. Профессиональные услуги для футболистов и клубов.",
};

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: "https://f-a-f.ru/about",
  },
  twitter: {
    title: meta.title,
    description: meta.description,
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
