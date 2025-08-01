"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useQuery } from "@tanstack/react-query";
import directus from "@/services/directus";
import { readItem } from "@directus/sdk";
import { notFound } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Marquee from "react-fast-marquee";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CircleLine, PageTopLine } from "@/components/shared/FootballField";

import { SlashIcon } from "lucide-react";

export default function Term() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const section3Ref = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);

  const { data: about, isLoading } = useQuery({
    queryKey: ["about"],
    queryFn: async () =>
      await directus.request(
        readItem("about", 1, {
          fields: ["*", "gallery.*"],
        })
      ),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (text1Ref.current && text2Ref.current && section3Ref.current) {
      gsap.fromTo(
        text1Ref.current,
        { opacity: 1 },
        {
          opacity: 0,
          scrollTrigger: {
            trigger: section3Ref.current,
            start: "30% center",
            end: "55% center",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        text2Ref.current,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: section3Ref.current,
            start: "45% center",
            end: "70% center",
            scrub: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoading]);

  if (isLoading) {
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

  if (!about) {
    notFound();
  }
  const S2Items = ({
    index,
    src,
    title,
  }: {
    index: number;
    src: string;
    title: string;
  }) => {
    return (
      <div className="flex flex-row items-center justify-start gap-5 py-3.5 border-b border-accent">
        <div className="relative aspect-square h-8">
          <Image
            src={src}
            alt={`About ${index}`}
            fill
            sizes="100%"
            className="w-full h-auto object-contain"
          />
        </div>
        <h3 className="text-lg font-unbounded font-bold uppercase">{title}</h3>
      </div>
    );
  };

  const S3Items = ({ src }: { src: string }) => {
    return (
      <div className="relative aspect-[4/3] h-72 md:h-96 mr-4.5">
        <Image
          src={src}
          alt={`About gallery`}
          fill
          sizes="100%"
          className="w-full h-auto object-cover"
        />
      </div>
    );
  };

  return (
    <main>
      <div className="relative w-full aspect-[9/16] md:aspect-video">
        <div className="absolute top-0 left-0 bg-gradient-to-b from-foreground/90 via-transparent to-transparent z-10 w-full h-1/5" />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-foreground/90 via-transparent to-transparent z-10 w-full h-4/5 md:h-2/5" />
        <Image
          src={
            isMobile
              ? `${directus.url}assets/${about.cover_mob}`
              : `${directus.url}assets/${about.cover_desk}`
          }
          alt="About"
          fill
          sizes="100%"
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-6 md:gap-14 items-start md:items-center justify-between px-4 md:px-10 py-14 bg-foreground">
        <h1 className="text-5xl md:text-6xl font-bold font-unbounded uppercase text-background">
          О нас
        </h1>
        <h2 className="text-xl font-bold font-unbounded uppercase text-background">
          настоящее агентство — это не просто посредник, а партнёр и опора
        </h2>
      </div>
      <Breadcrumb className="px-4 md:px-10 py-14 pb-10 bg-foreground">
        <BreadcrumbList className="uppercase text-sm">
          <BreadcrumbItem>
            <BreadcrumbLink
              className="text-accent hover:text-accent/80"
              href="/"
            >
              Главная
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold text-accent">
              О нас
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="bg-foreground px-4 md:px-10">
        <PageTopLine numeric="01" />
        <div className="flex flex-col font-unbounded font-bold uppercase px-0 md:px-16 py-10">
          <h3 className="text-primary text-center text-3xl md:text-6xl">
            Football Agency of Future –
          </h3>
          <p className="text-background text-center text-xl md:text-4xl">
            это современное футбольное агентство, основанное двумя молодыми
            энтузиастами
          </p>
        </div>
      </section>
      <section className="px-4 md:px-10 py-14 space-y-10">
        <PageTopLine numeric="02" className="border-accent" />
        <div className="flex flex-col md:flex-row-reverse gap-10 md:gap-0">
          {isMobile ? (
            <p>
              Идея агентства возникла на стыке личного опыта, дружбы и глубокого
              понимания футбольной индустрии. Оба основателя — люди из футбола,
              которые на практике прочувствовали, насколько важна поддержка и
              профессиональное сопровождение для спортсмена, особенно в начале
              карьеры.
            </p>
          ) : null}
          <div className="relative aspect-square w-full flex-1/2">
            <Image
              src="/assets/images/about1.png"
              alt="About 1"
              fill
              sizes="100%"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="flex flex-1/2 flex-col justify-between md:pr-24">
            {isMobile ? null : (
              <p>
                Идея агентства возникла на стыке личного опыта, дружбы и
                глубокого понимания футбольной индустрии. Оба основателя — люди
                из футбола, которые на практике прочувствовали, насколько важна
                поддержка и профессиональное сопровождение для спортсмена,
                особенно в начале карьеры.
              </p>
            )}
            <div className="space-y-6">
              <h3 className="text-center text-2xl font-unbounded font-bold uppercase">
                Мы создаём <br />
                <span className="text-primary">новое поколение</span> <br />
                агентской работы:
              </h3>
              <div className="border-t border-accent">
                <S2Items
                  index={1}
                  src="/assets/images/about2-circle.svg"
                  title="Честной"
                />
                <S2Items
                  index={2}
                  src="/assets/images/about2-sun.svg"
                  title="Прозрачной"
                />
                <S2Items
                  index={3}
                  src="/assets/images/about2-b2b.svg"
                  title="ориентированной на долгосрочные отношения с игроками"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        ref={section3Ref}
        className="bg-foreground px-4 md:px-10 space-y-24"
      >
        <CircleLine
          className="h-20 md:h-40 opacity-40"
          classNameCircle="w-3/5 md:w-1/6 -translate-y-2/3"
        />
        <div className="flex flex-col gap-10">
          <div className="relative aspect-square w-7.5 md:w-16">
            <Image
              src="/assets/images/about3-arrow.svg"
              alt="About 3"
              fill
              sizes="100%"
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="relative text-center text-xl md:text-5xl text-background font-unbounded font-bold uppercase">
            <h3 ref={text1Ref} style={{ opacity: 0 }}>
              FAF родился{" "}
              <span className="text-primary">из дружбы и общего опыта.</span> Мы
              с партнером — друзья с детства, оба жили футболом и видели, как
              важно для игрока иметь поддержку, особенно на старте.
            </h3>
            <h3
              ref={text2Ref}
              className="absolute inset-0 translate-y-1/4"
              style={{ opacity: 0 }}
            >
              Именно поэтому{" "}
              <span className="text-primary">
                решили создать агентство, которому бы сами когда-то доверились
              </span>
            </h3>
          </div>
          <div className="flex justify-end">
            <div className="relative aspect-square w-7.5 md:w-16 rotate-180">
              <Image
                src="/assets/images/about3-arrow.svg"
                alt="About 3"
                fill
                sizes="100%"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
        <CircleLine
          className="h-20 md:h-40 opacity-40"
          classNameCircle="w-3/5 md:w-1/6 top-auto bottom-0 translate-y-2/3"
        />
      </section>
      <section className="py-14 space-y-10">
        <PageTopLine numeric="03" className="border-accent px-4 md:px-10" />
        <h3 className="text-center md:text-left text-2xl md:text-6xl font-unbounded font-bold uppercase px-4 md:px-10">
          Мы уверены: настоящее агентство{" "}
          <span className="text-primary md:text-foreground">
            — это не просто посредник, а партнёр и опора.
          </span>{" "}
          <span className="text-foreground md:block md:text-primary md:mt-10 md:text-4xl">
            Именно таким агентством мы и строим FAF.
          </span>
        </h3>
        <hr className="border-accent md:hidden px-4 md:px-10" />
        <div className="flex flex-col gap-5 md:flex-row px-4 md:px-10">
          <p className="md:w-1/3">
            <span className="font-bold uppercase">Сегодня FAF</span> — это
            команда молодых специалистов и опытных наставников, объединённых
            одной целью: помогать футболистам расти, развиваться и принимать
            сильные карьерные решения.{" "}
          </p>
          <div className="hidden md:flex justify-center items-center w-1/3">
            <div className="border-l border-accent h-full" />
          </div>
          <p className="md:w-1/3">
            Мы сопровождаем игроков не только в трансферах, но и в их
            становлении — ментальном, профессиональном и личном
          </p>
        </div>
        <Marquee speed={25}>
          {about.gallery.map((item: any) => (
            <S3Items
              key={item.id}
              src={`${directus.url}assets/${item.directus_files_id}`}
            />
          ))}
        </Marquee>
      </section>
    </main>
  );
}
