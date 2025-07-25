import type { Metadata } from "next";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Arrow } from "@/assets/icons/Icons";

import { LogoBall } from "@/assets/icons/Logo";

export const metadata: Metadata = {
  title: "Упс! 404",
  description:
    "Кажется, страница попала в офсайд, попробуйте вернуться на главную и начать сначала",
  openGraph: {
    title: "Упс! 404",
    description:
      "Кажется, страница попала в офсайд, попробуйте вернуться на главную и начать сначала",
  },
  twitter: {
    title: "Упс! 404",
    description:
      "Кажется, страница попала в офсайд, попробуйте вернуться на главную и начать сначала",
  },
};

export default function NotFound() {
  return (
    <div className="h-screen w-screen bg-foreground text-background flex flex-col items-center justify-center font-unbounded font-black">
      <div className="flex flex-row items-center gap-2.5 md:gap-6">
        <h2 className="text-[96px] md:text-[216px] leading-none">4</h2>
        <LogoBall
          className="size-20 md:size-48"
          rotation={10}
          animate="linear"
        />
        <h2 className="text-[96px] md:text-[216px] leading-none">4</h2>
      </div>
      <p className="text-primary uppercase text-base md:text-xl mt-2 md:mt-5">
        Страница попала в офсайд
      </p>
      <Link href="/">
        <Button icon="arrow" className="px-11 py-4 mt-10 md:mt-20 md:text-base">
          <span>Вернуться в игру</span>
          <Arrow className="size-4" />
        </Button>
      </Link>
    </div>
  );
}
