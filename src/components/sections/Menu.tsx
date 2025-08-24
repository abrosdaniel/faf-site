"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { useScroll } from "@/hooks/use-scroll-screen";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTitle,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { CircleLine } from "../shared/FootballField";
import { RotateText } from "../shared/Text";

import {
  Arrow,
  MenuBurger,
  Cross,
  Telegram,
  Whatsapp,
} from "@/assets/icons/Icons";
import { LogoIcon } from "@/assets/icons/Logo";

export default function Menu() {
  const isMobile = useMediaQuery("(max-width: 1280px)");
  const isTablet = useMediaQuery("(max-width: 768px)");
  const isBottom = useScroll("y>64");
  const pathname = usePathname();

  const isCurrentPage = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-30 border-b transition-all ${
        isBottom ? "bg-background border-foreground" : "bg-transparent"
      }`}
    >
      <div className="absolute h-1/2 border-r border-inherit bottom-0 left-[30%] xl:left-[35%]" />
      <div className="absolute h-1/2 border-r border-inherit bottom-0 right-[30%] xl:right-[35%]" />
      <div
        className={`flex py-1.5 md:py-2.5 px-4 md:px-10 flex-row items-center justify-between ${
          isBottom
            ? "[&_a]:text-foreground [&_a]:hover:text-foreground"
            : "[&_a]:hover:text-primary"
        }`}
      >
        <div className="flex w-[30%] xl:w-[35%] flex-row items-center gap-8 justify-start">
          {!isMobile && (
            <>
              <Button variant="link">
                <Link href="/">
                  <RotateText
                    title="Главная"
                    className={
                      isCurrentPage("/")
                        ? isBottom
                          ? "text-foreground"
                          : "text-primary"
                        : ""
                    }
                    classLine={isBottom ? "bg-foreground" : "bg-primary"}
                  />
                </Link>
              </Button>
              <Button variant="link">
                <Link href="/players">
                  <RotateText
                    title="Игроки"
                    className={
                      isCurrentPage("/players")
                        ? isBottom
                          ? "text-foreground"
                          : "text-primary"
                        : ""
                    }
                    classLine={isBottom ? "bg-foreground" : "bg-primary"}
                  />
                </Link>
              </Button>
              <Button variant="link">
                <Link href="/about">
                  <RotateText
                    title="О нас"
                    className={
                      isCurrentPage("/about")
                        ? isBottom
                          ? "text-foreground"
                          : "text-primary"
                        : ""
                    }
                    classLine={isBottom ? "bg-foreground" : "bg-primary"}
                  />
                </Link>
              </Button>
              <Button variant="link">
                <Link href="/news">
                  <RotateText
                    title="Новости"
                    className={
                      isCurrentPage("/news")
                        ? isBottom
                          ? "text-foreground"
                          : "text-primary"
                        : ""
                    }
                    classLine={isBottom ? "bg-foreground" : "bg-primary"}
                  />
                </Link>
              </Button>
            </>
          )}
        </div>
        <div className="flex w-[40%] xl:w-[30%] items-center justify-center">
          <Link href="/">
            <LogoIcon className="size-14" />
          </Link>
        </div>
        <div className="flex w-[30%] xl:w-[35%] flex-row items-center gap-8 justify-end">
          {!isMobile ? (
            <>
              <Button variant="link">
                <Link href="/team">
                  <RotateText
                    title="Команда"
                    className={
                      isCurrentPage("/team")
                        ? isBottom
                          ? "text-foreground"
                          : "text-primary"
                        : ""
                    }
                    classLine={isBottom ? "bg-foreground" : "bg-primary"}
                  />
                </Link>
              </Button>
              <Button variant="link">
                <Link href="#footer">
                  <RotateText
                    title="Контакты"
                    className={
                      isCurrentPage("#footer")
                        ? isBottom
                          ? "text-foreground"
                          : "text-primary"
                        : ""
                    }
                    classLine={isBottom ? "bg-foreground" : "bg-primary"}
                  />
                </Link>
              </Button>
              <Link href="/form">
                <Button icon="arrow" className="p-4">
                  <span>Заполнить анкету</span>
                  <Arrow className="size-4" />
                </Button>
              </Link>
            </>
          ) : (
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" className="size-9">
                  <MenuBurger className="size-6 text-foreground" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-foreground border-0 w-screen font-unbounded flex flex-col gap-14"
              >
                <SheetTitle className="sr-only"></SheetTitle>
                <div className="relative flex flex-col justify-center items-center pt-7 px-4">
                  <div className="w-full h-5 border-t border-x" />
                  <SheetClose asChild>
                    <Link href="/">
                      <LogoIcon className="size-24" />
                    </Link>
                  </SheetClose>
                  <div className="absolute right-9 top-12">
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="size-9">
                        <Cross className="text-primary size-6" />
                      </Button>
                    </SheetClose>
                  </div>
                </div>
                <div className="text-background flex flex-col gap-4 [&_a]:text-2xl [&_a]:font-bold">
                  <SheetClose asChild>
                    <Button variant="link" asChild>
                      <Link href="/">главная</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="link" asChild>
                      <Link href="/players">игроки</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="link" asChild>
                      <Link href="/about">о нас</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="link" asChild>
                      <Link href="/news">новости</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="link" asChild>
                      <Link href="/team">команда</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="link" asChild>
                      <Link href="#footer">контакты</Link>
                    </Button>
                  </SheetClose>
                </div>
                <div className="flex flex-col gap-6">
                  <CircleLine
                    className="flex justify-center items-center pt-12"
                    classNameCircle={cn(
                      isTablet ? "w-[calc(100vw*1.9)]" : "w-[calc(100vw*0.7)]"
                    )}
                  >
                    <div className="flex flex-row gap-3">
                      <Button size="icon" icon="svg">
                        <Link href="/">
                          <Telegram />
                        </Link>
                      </Button>
                      <Button size="icon" icon="svg">
                        <Link href="/">
                          <Whatsapp />
                        </Link>
                      </Button>
                    </div>
                  </CircleLine>
                  <div className="text-background flex flex-col items-center font-bold text-base">
                    <Link href="mailto:info@f-a-f.ru">info@f-a-f.ru</Link>
                    <Link href="tel:+79161234567">+7 (916) 123-45-67</Link>
                  </div>
                  <SheetClose asChild>
                    <Link href="/form" className="mx-auto">
                      <Button icon="arrow" className="px-11 py-4">
                        <span>Заполнить анкету</span>
                        <Arrow className="size-4" />
                      </Button>
                    </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </nav>
  );
}
