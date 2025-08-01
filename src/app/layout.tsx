import type { Metadata } from "next";
import { unbounded, golosText } from "@/assets/fonts/fonts";
import "@/assets/styles/globals.css";
import { Providers } from "./providers";

import Menu from "@/components/sections/Menu";
import Footer from "@/components/sections/Footer";
import Loader from "@/components/sections/Loader";

export const metadata: Metadata = {
  title: "Главная",
  description: "Футбольное агентство FAF",
  applicationName: "FAF Football Agency",
  generator: "Next.js",
  keywords: [],
  authors: [
    { name: "FAF Agency", url: "https://f-a-f.ru" },
    { name: "Daniel Abros", url: "https://abros.dev" },
  ],
  creator: "FAF Agency",
  publisher: "FAF Agency",
  metadataBase: new URL("https://f-a-f.ru"),
  openGraph: {
    title: "Главная",
    description: "Футбольное агентство FAF",
    url: "https://f-a-f.ru",
    siteName: "FAF Football Agency",
    images: [
      {
        url: "https://f-a-f.ru/assets/img/og-players.png",
        width: 1200,
        height: 630,
        alt: "Футбольное агентство FAF",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Главная",
    description: "Футбольное агентство FAF",
    images: ["https://f-a-f.ru/assets/img/og-players.png"],
  },
  icons: {
    icon: "/assets/icons/logo/logo.png",
    shortcut: "/assets/icons/logo/logo.png",
    apple: "/assets/icons/logo/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    noimageindex: false,
    nosnippet: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${unbounded.variable} ${golosText.variable} antialiased font-golos-text text-foreground`}
      >
        <Providers>
          <Loader />
          <Menu />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
