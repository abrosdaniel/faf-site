import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: "Политика конфиденциальности футбольного агентства FAF",
  openGraph: {
    title: "Политика конфиденциальности",
    description: "Политика конфиденциальности футбольного агентства FAF",
    url: "https://f-a-f.ru/policy",
  },
  twitter: {
    title: "Политика конфиденциальности",
    description: "Политика конфиденциальности футбольного агентства FAF",
  },
};

export default function TermLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
