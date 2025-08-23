"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { useQuery } from "@tanstack/react-query";
import directus from "@/services/directus";
import { readItem } from "@directus/sdk";
import { notFound, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import PlayersCard from "@/components/sections/Players";
import { PageTopLine, CircleLine } from "@/components/shared/FootballField";
import Link from "next/link";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import TeamAgency from "@/components/sections/TeamAgency";
import { Button } from "@/components/ui/button";

import { Arrow } from "@/assets/icons/Icons";

export default function Home() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  const { data: home, isLoading: isLoadingHome } = useQuery({
    queryKey: ["home"],
    queryFn: async () =>
      await directus.request(
        readItem("home", 1, {
          fields: [
            "*",
            "partners.*",
            "players.*",
            "players.team.*",
            "personal.*",
          ],
        })
      ),
    staleTime: 1000 * 60 * 5,
  });

  const { data: news, isLoading: isLoadingNews } = useQuery({
    queryKey: ["news"],
    queryFn: async () =>
      await directus.request(
        readItem("news", 1, {
          fields: ["*", "posts.*"],
        })
      ),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoadingHome || isLoadingNews) {
    return (
      <div className="w-full md:max-w-6xl md:mx-auto opacity-30">
        <div className="min-w-full min-h-full space-y-4">
          <Skeleton className="w-80 h-10 mx-auto" />
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-10/12 h-5" />
              <br />
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-10/12 h-5" />
              <br />
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-2/12 h-5" />
              <br />
              <Skeleton className="w-11/12 h-5" />
              <br />
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-10/12 h-5" />
            </div>
          ))}
          <div className="flex flex-row justify-between items-start text-xs md:text-sm text-muted-foreground mt-24">
            <Skeleton className="w-1/5 h-5" />
            <Skeleton className="w-1/5 h-5" />
          </div>
        </div>
      </div>
    );
  }

  if (!home || !news) {
    notFound();
  }

  const MarqueeItems = ({
    variant,
    text,
    logo,
  }: {
    variant: "text" | "logo";
    text?: string;
    logo?: string;
  }) => {
    return (
      <>
        {variant === "text" && (
          <div className="text-primary-foreground text-sm md:text-xl font-unbounded font-bold uppercase flex flex-row items-center gap-3 md:gap-5 px-6 md:px-20 py-5.5 md:py-6">
            <div className="size-3 bg-primary" />
            <span>{text ?? ""}</span>
          </div>
        )}
        {variant === "logo" && (
          <div className="h-12.5 md:h-15 w-auto border-r border-white md:px-7 flex items-center">
            <div className="relative h-full aspect-video">
              <Image
                src={logo ?? ""}
                alt="Logo"
                fill
                sizes="100%"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        )}
      </>
    );
  };

  const AccordionItems = ({
    variant,
    numeric,
    text,
    className,
  }: {
    variant: "text" | "content";
    numeric: string;
    text: string;
    className?: string;
  }) => {
    return (
      <>
        {variant === "text" && (
          <div
            className={cn(
              "flex flex-row items-center justify-between text-sm md:text-xl font-bold font-unbounded uppercase hover:[&_svg]:rotate-45 gap-3 py-3 md:py-6",
              className
            )}
          >
            <div className="flex flex-row items-center gap-3">
              <div className="text-primary min-w-6 md:min-w-9">
                {numeric ?? ""}
              </div>
              <div className="border-l border-white h-14" />
              <div className="text-white">{text ?? ""}</div>
            </div>
            <Arrow className="size-6 md:size-7 min-w-6 md:min-w-7 text-primary" />
          </div>
        )}
      </>
    );
  };

  const NewsItems = ({
    id,
    created_at,
    updated_at,
    src,
    title,
    description,
    className,
    classImage,
  }: {
    id: string;
    created_at: string;
    updated_at: string;
    src: string;
    title: string;
    description: string;
    className?: string;
    classImage?: string;
  }) => {
    const postDate = updated_at ? updated_at : created_at;
    const currentDate = new Date();
    const postDateTime = new Date(postDate);
    const daysDifference = Math.floor(
      (currentDate.getTime() - postDateTime.getTime()) / (1000 * 60 * 60 * 24)
    );
    const isNew = daysDifference <= 3;

    return (
      <Link
        href={`/news/${id}`}
        className={cn("group flex flex-col gap-3 md:gap-5 relative", className)}
      >
        {isNew && (
          <div className="absolute top-3 right-3 z-20 bg-primary text-primary-foreground p-1.5 text-xs font-unbounded font-semibold uppercase flex flex-row items-center gap-1.5">
            <div className="size-2 bg-primary-foreground" />
            <span>Новое</span>
          </div>
        )}
        <div className={cn("relative w-full", classImage)}>
          <div className="absolute inset-0 w-full h-full bg-transparent group-hover:bg-primary/40 transition-colors duration-300 z-20" />
          <Image
            src={src}
            alt={title}
            fill
            sizes="100%"
            className="object-cover z-10"
          />
        </div>
        <div className="flex flex-col gap-3 justify-between h-full">
          <div className="flex flex-col gap-3">
            <h2 className="text-sm md:text-base font-bold uppercase line-clamp-3">
              {title}
            </h2>
            <p className="hidden md:line-clamp-6">{description}</p>
          </div>
          <p className="text-xs text-muted-foreground">
            {new Date(created_at).toLocaleDateString()}
          </p>
        </div>
      </Link>
    );
  };

  const TabsItem = ({ value, title }: { value: string; title: string }) => {
    return (
      <ToggleGroupItem
        value={value}
        aria-label={title}
        className="group p-0 h-full md:min-w-48 bg-foreground text-background data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:bg-foreground hover:text-background hover:opacity-90 cursor-pointer"
      >
        <div className="flex flex-row items-center justify-center gap-2.5 w-full px-11 py-4 uppercase font-unbounded font-semibold text-sm md:text-xl">
          <Arrow className="size-4 group-hover:rotate-45 group-data-[state=off]:hidden" />
          <span>{title}</span>
        </div>
      </ToggleGroupItem>
    );
  };

  return (
    <main>
      <div className="h-screen flex flex-col">
        {isMobile ? (
          <>
            <div className="relative w-full flex-1">
              <div className="absolute top-0 left-0 bg-gradient-to-b from-foreground/90 via-transparent to-transparent z-10 w-full h-1/5" />
              <div className="absolute bottom-0 left-0 bg-gradient-to-t from-foreground/90 via-transparent to-transparent z-10 w-full h-4/5 md:h-2/5" />
              <Image
                src={`${directus.url}assets/${home.cover_mob}`}
                alt="Terms"
                fill
                sizes="100%"
                className="w-full h-auto object-cover"
              />
              <h3 className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center font-unbounded font-bold uppercase text-base w-full z-20">
                футбольное агентство
                <br />
                нового поколения
              </h3>
            </div>
            <div className="px-4 md:px-10 py-14 bg-foreground flex-shrink-0 font-unbounded text-background flex flex-col gap-6">
              <h1 className="text-5xl font-black uppercase text-center">
                Football Agency of Future
              </h1>
              <div className="flex flex-row items-end gap-10">
                <p className="text-sm font-semibold">
                  Индивидуальный подход, цифровые инструменты и стратегическое
                  мышление
                </p>
                <div className="animate-bounce">
                  <Arrow className="size-8 text-primary rotate-135" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="relative w-full flex-1">
              <div className="absolute top-0 left-0 bg-gradient-to-b from-foreground/90 via-transparent to-transparent z-10 w-full h-1/5" />
              <div className="absolute bottom-0 left-0 bg-gradient-to-t from-foreground/90 via-transparent to-transparent z-10 w-full h-4/5 md:h-2/5" />
              <Image
                src={`${directus.url}assets/${home.cover_desk}`}
                alt="Terms"
                fill
                sizes="100%"
                className="w-full h-auto object-cover"
              />
              <div className="flex flex-col gap-16 absolute bottom-20 left-0 w-full px-10 font-unbounded text-white z-20">
                <div className="flex flex-row font-bold justify-between">
                  <p className="text-2xl uppercase">
                    футбольное агентство
                    <br />
                    нового поколения
                  </p>
                  <p className="text-base">
                    Индивидуальный подход,
                    <br />
                    цифровые инструменты
                    <br />и стратегическое мышление
                  </p>
                </div>
                <div className="flex flex-row items-end justify-between">
                  <h1 className="text-8xl font-black uppercase">
                    Football
                    <br />
                    Agency of Future
                  </h1>
                  <div className="animate-bounce">
                    <Arrow className="size-13 text-primary rotate-135" />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Marquee speed={25}>
        <MarqueeItems variant="text" text="Честность и прозрачность" />
        <MarqueeItems variant="text" text="Этика и партнёрство" />
        <MarqueeItems variant="text" text="Стратегические решения" />
        <MarqueeItems variant="text" text="Долгосрочная перспектива" />
        <MarqueeItems variant="text" text="Комплексная поддержка" />
      </Marquee>
      <section className="bg-foreground py-14 space-y-10 px-4 md:px-10">
        <PageTopLine numeric="01" />
        <h3 className="text-white text-center md:text-left text-xl md:text-4xl font-unbounded font-bold uppercase">
          Мы верим, что <span className="text-primary">будущее футбола</span> —
          за умными решениями, этикой и партнёрством
        </h3>
        <div className="flex flex-col gap-10 md:flex-row text-white">
          <p className="md:w-1/3">
            Football Agency of Future — это агентство нового поколения, которое
            ставит в центр внимания развитие игрока и его карьеру в долгосрочной
            перспективе.
            <br />
            <br />
            Мы объединяем человеческий подход и цифровые технологии, чтобы
            принимать стратегически выверенные решения.
          </p>
          <hr className="md:hidden" />
          <div className="hidden md:flex justify-center items-center w-1/3">
            <div className="border-l border-white h-full" />
          </div>
          <p className="md:w-1/3">
            Наша работа строится на честности, прозрачности и уважении к каждому
            клиенту.
            <br />
            <br />
            Мы создаём индивидуальные маршруты роста, учитывая цели, потенциал и
            личные ценности футболиста, и сопровождаем на каждом этапе — от
            первых шагов до выхода за пределы поля.
          </p>
        </div>
      </section>
      <section className="py-14 space-y-10 px-4 md:px-10">
        <PageTopLine numeric="02" className="border-accent" />
        <div className="space-y-6 md:space-y-10">
          <h2
            id="plrs"
            className="text-4xl md:text-7xl font-bold font-unbounded uppercase text-foreground text-center md:text-left"
          >
            Игроки FAF
          </h2>
          <PlayersCard
            data={home.players}
            type="more"
            count={isMobile ? "6" : "8"}
          />
        </div>
      </section>
      <Marquee speed={25} className="bg-foreground py-14">
        {home.partners.map((item: any) => (
          <MarqueeItems
            key={item.id}
            variant="logo"
            logo={`${directus.url}assets/${item.directus_files_id}`}
          />
        ))}
      </Marquee>
      <section className="bg-foreground pb-14 space-y-10 px-4 md:px-10">
        <div className="space-y-10 md:space-y-14">
          <h3 className="text-white text-center md:text-left text-xl md:text-4xl font-unbounded font-bold uppercase">
            Мы не просто подписываем контракты —
            <span className="text-primary">мы помогаем футболисту</span>{" "}
            выстроить осознанную карьеру
          </h3>
          <div className="flex flex-col gap-6 md:gap-20 md:flex-row text-white">
            <p className="md:w-1/3">
              Каждое решение — стратегически выверено и согласовано с игроком.
              <br />
              Наши услуги охватывают все этапы:
            </p>
            <div className="md:w-2/3">
              <AccordionItems
                variant="text"
                numeric="01"
                text="Анализ потенциала и постановка целей"
                className="border-t border-white"
              />
              <AccordionItems
                variant="text"
                numeric="02"
                text="Индивидуальный план развития"
                className="border-t border-white"
              />
              <AccordionItems
                variant="text"
                numeric="03"
                text="Поиск и сопровождение трансферов"
                className="border-t border-white"
              />
              <AccordionItems
                variant="text"
                numeric="04"
                text="Юридическая и финансовая поддержка"
                className="border-t border-white"
              />
              <AccordionItems
                variant="text"
                numeric="05"
                text="PR и медиасопровождение"
                className="border-y border-white"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-14 space-y-10 px-4 md:px-10">
        <PageTopLine numeric="03" className="border-accent" />
        <div className="space-y-6 md:space-y-10">
          <h2
            id="plrs"
            className="text-4xl md:text-7xl font-bold font-unbounded uppercase text-foreground text-center md:text-left"
          >
            новости агентства
          </h2>
        </div>
        {isMobile ? (
          <div className="grid grid-cols-2 gap-5">
            <ToggleGroup
              value="all"
              onValueChange={(value) => {
                router.push(`/news?filter=${value}`);
              }}
              type="single"
              className="grid grid-cols-2 gap-3 w-full col-span-2"
            >
              <TabsItem value="all" title="Все" />
              <TabsItem value="Новости" title="Новости" />
              <TabsItem value="Сделки" title="Сделки" />
              <TabsItem value="Медиа" title="Медиа" />
            </ToggleGroup>
            <NewsItems
              id={news.posts[0].id}
              created_at={news.posts[0].date_created}
              updated_at={news.posts[0].date_updated}
              src={`${directus.url}assets/${news.posts[0].cover}`}
              title={news.posts[0].title}
              description={news.posts[0].description}
              classImage="aspect-video"
              className="col-span-2"
            />
            <NewsItems
              id={news.posts[1].id}
              created_at={news.posts[1].date_created}
              updated_at={news.posts[1].date_updated}
              src={`${directus.url}assets/${news.posts[1].cover}`}
              title={news.posts[1].title}
              description={news.posts[1].description}
              classImage="aspect-[4/3]"
            />
            <NewsItems
              id={news.posts[2].id}
              created_at={news.posts[2].date_created}
              updated_at={news.posts[2].date_updated}
              src={`${directus.url}assets/${news.posts[2].cover}`}
              title={news.posts[2].title}
              description={news.posts[2].description}
              classImage="aspect-[4/3]"
            />
          </div>
        ) : (
          <div className="flex flex-row gap-5">
            <div className="grid grid-cols-2 gap-5 flex-2/3">
              <NewsItems
                id={news.posts[0].id}
                created_at={news.posts[0].date_created}
                updated_at={news.posts[0].date_updated}
                src={`${directus.url}assets/${news.posts[0].cover}`}
                title={news.posts[0].title}
                description={news.posts[0].description}
                classImage="aspect-video"
              />
              <NewsItems
                id={news.posts[1].id}
                created_at={news.posts[1].date_created}
                updated_at={news.posts[1].date_updated}
                src={`${directus.url}assets/${news.posts[1].cover}`}
                title={news.posts[1].title}
                description={news.posts[1].description}
                classImage="aspect-video"
              />
              <ToggleGroup
                value="all"
                onValueChange={(value) => {
                  router.push(`/news?filter=${value}`);
                }}
                type="single"
                className="grid grid-cols-4 gap-5 w-full col-span-2"
              >
                <TabsItem value="all" title="Все" />
                <TabsItem value="Новости" title="Новости" />
                <TabsItem value="Сделки" title="Сделки" />
                <TabsItem value="Медиа" title="Медиа" />
              </ToggleGroup>
            </div>
            <NewsItems
              id={news.posts[2].id}
              created_at={news.posts[2].date_created}
              updated_at={news.posts[2].date_updated}
              src={`${directus.url}assets/${news.posts[2].cover}`}
              title={news.posts[2].title}
              description={news.posts[2].description}
              className="flex-1/3"
              classImage="aspect-square"
            />
          </div>
        )}
      </section>
      <section className="h-screen relative overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src="/assets/images/home-trigger.png"
            alt="Trigger"
            fill
            sizes="100%"
            className="object-cover"
          />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row items-center justify-between w-full">
          <div className="h-[calc(100vw/1.95)] md:h-[calc(100vw/7)] w-7 md:w-22 border-y border-white border-r" />
          <CircleLine
            className="h-[calc(100vw/1.95)] w-[calc(100vw/1.95)] md:h-[calc(100vw/7)] md:w-[calc(100vw/7)]"
            classNameCircle="w-[calc(100vw/1.95)] md:w-[calc(100vw/7)]"
          />
          <div className="h-[calc(100vw/1.95)] md:h-[calc(100vw/7)] w-7 md:w-22 border-y border-white border-l" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px bg-white h-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center font-unbounded font-bold uppercase text-xl md:text-6xl whitespace-nowrap">
          <span className="text-primary">Создаём карьеру.</span>
          <br />
          <span>Строим будущее.</span>
        </div>
      </section>
      <section className="py-14 space-y-10">
        <PageTopLine numeric="04" className="border-accent px-4 md:px-10" />
        <div className="space-y-6 md:space-y-10">
          <h2 className="text-4xl md:text-7xl font-bold font-unbounded uppercase text-foreground text-center md:text-left px-4 md:px-10">
            Наша команда
          </h2>
          <p className="text-base md:text-lg text-muted-foreground text-center md:text-left px-4 md:px-10">
            Профессиональная команда FAF
          </p>
          <TeamAgency data={home.personal} />
          <div className="flex justify-center">
            <Button icon="arrow" className="px-11 py-4">
              <Link
                href="/team"
                className="flex flex-row items-center justify-center gap-2.5"
              >
                <span>Вся команда агентства</span>
                <Arrow className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
