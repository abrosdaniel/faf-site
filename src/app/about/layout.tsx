import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "О нас",
  description: "О футбольном агентстве FAF",
  openGraph: {
    title: "О нас",
    description: "О футбольном агентстве FAF",
    url: "https://f-a-f.ru/about",
  },
  twitter: {
    title: "О нас",
    description: "О футбольном агентстве FAF",
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
