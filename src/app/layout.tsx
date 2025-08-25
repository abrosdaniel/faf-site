import type { Metadata } from "next";
import type { Viewport } from "next";
import { unbounded, golosText } from "@/assets/fonts/fonts";
import "@/assets/styles/globals.css";
import { Providers } from "./providers";

import Menu from "@/components/sections/Menu";
import Footer from "@/components/sections/Footer";
import Loader from "@/components/sections/Loader";
import YandexMetrika from "@/components/yandex/YandexMetrika";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    default: "Главная | FAF Football Agency",
    template: "%s | FAF Football Agency",
  },
  description: "Футбольное агентство FAF",
  applicationName: "FAF Football Agency",
  generator: "Next.js",
  keywords: [
    // Основные брендовые
    "FAF Football Agency",
    "Football Agency of Future",
    "FAF агентство",
    "футбольное агентство FAF",
    // Основные услуги
    "футбольное агентство",
    "спортивное агентство",
    "агентство футболистов",
    "футбольный агент",
    "спортивный агент",
    "агентство по футболу",
    // Поиск талантов
    "поиск футболистов",
    "скаутинг футболистов",
    "поиск молодых талантов",
    "футбольный скаутинг",
    "поиск игроков",
    "талант-скаутинг",
    "футбольные таланты",
    // Продвижение игроков
    "продвижение футболистов",
    "карьера футболиста",
    "развитие футболистов",
    "трансферы футболистов",
    "контракты футболистов",
    "представительство игроков",
    // Сотрудничество и партнерство
    "сотрудничество с клубами",
    "партнерство футбольных клубов",
    "агентские услуги",
    "футбольное представительство",
    "спортивное представительство",
    // Географические
    "футбольное агентство Москва",
    "футбольное агентство Россия",
    "международное футбольное агентство",
    "европейское футбольное агентство",
    "футбольное агентство СНГ",
    // Целевая аудитория
    "молодые футболисты",
    "профессиональные футболисты",
    "юниорские футболисты",
    "женский футбол",
    "детский футбол",
    // Услуги и процессы
    "трансферное окно",
    "футбольные трансферы",
    "контрактные переговоры",
    "спортивная карьера",
    "футбольная карьера",
    "профессиональный футбол",
    // Будущее и инновации
    "будущее футбола",
    "инновации в футболе",
    "современное футбольное агентство",
    "цифровое футбольное агентство",
    "технологии в футболе",
    // Длинные фразы (long-tail keywords)
    "как стать профессиональным футболистом",
    "футбольное агентство для молодых игроков",
    "поиск футбольного агента",
    "лучшее футбольное агентство",
    "надежное футбольное агентство",
  ],
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
        url: "https://f-a-f.ru/assets/images/preview.png",
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
    images: ["https://f-a-f.ru/assets/images/preview.png"],
  },
  icons: {
    icon: "/assets/icons/logo-small.png",
    shortcut: "/assets/icons/logo-small.png",
    apple: "/assets/icons/logo-small.png",
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
          <YandexMetrika />
        </Providers>
      </body>
    </html>
  );
}
