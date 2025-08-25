"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { useQuery } from "@tanstack/react-query";
import directus from "@/services/directus";
import { readItem } from "@directus/sdk";
import { notFound } from "next/navigation";

import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { PageTopLine } from "@/components/shared/FootballField";
import TeamAgency from "@/components/sections/TeamAgency";
import { LinkText } from "@/components/shared/Text";

import { SlashIcon } from "lucide-react";
import { Arrow } from "@/assets/icons/Icons";

export default function Team() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { data: agency, isLoading } = useQuery({
    queryKey: ["agency"],
    queryFn: async () =>
      await directus.request(
        readItem("agency", 1, {
          fields: ["*", "peoples.*"],
        })
      ),
    staleTime: 1000 * 60 * 5,
  });

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

  if (!agency) {
    notFound();
  }

  return (
    <main>
      <div className="h-dvh flex flex-col">
        <div className="relative w-full flex-1">
          <div className="absolute top-0 left-0 bg-gradient-to-b from-foreground/90 via-transparent to-transparent z-10 w-full h-1/5" />
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-foreground/90 via-transparent to-transparent z-10 w-full h-4/5 md:h-2/5" />
          <Image
            priority
            src={
              isMobile
                ? `${directus.url}assets/${agency.cover_mob}`
                : `${directus.url}assets/${agency.cover_desk}`
            }
            alt="Team"
            fill
            sizes="100%"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="flex flex-shrink-0 flex-col md:flex-row gap-6 items-start md:items-end justify-between px-4 md:px-10 py-4 md:py-14 bg-foreground">
          <h1 className="text-[42px] leading-[1.1] md:leading-[1] md:text-[90px] font-black font-unbounded uppercase text-background">
            Команда агентства
          </h1>
          <h2 className="text-base md:text-[26px] font-bold font-unbounded uppercase text-background max-w-[560px]">
            Наши агенты, менеджеры и координаторы
          </h2>
        </div>
      </div>
      <div className="flex flex-col gap-10 py-10">
        <Breadcrumb className="px-4 md:px-10 md:mb-10">
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
              <BreadcrumbPage className="font-semibold">Команда</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <PageTopLine
          className="border-accent px-4 md:px-10"
          classLine="bg-accent"
        />
        <TeamAgency data={agency.peoples} />
        <Link
          href="mailto:info@f-a-f.ru?subject=Заявка на вступление в команду FAF&body=Здравствуйте!%0A%0AМеня зовут [ваше имя], и я хотел бы стать частью команды FAF.%0A%0AМой опыт:%0A-%0A-%0A-%0A%0AКонтактная информация:%0AТелефон:%0AEmail:%0A%0AТак же прикрепляю свое подробное резюме ниже.%0A%0AС уважением, [ваше имя]"
          className="mx-auto md:ml-auto md:mr-0 w-fit block md:px-10"
        >
          <Button
            icon="arrow"
            variant="ghost"
            className="font-unbounded font-semibold text-sm uppercase text-accent-foreground hover:text-foreground"
          >
            <LinkText
              title={
                <div className="flex flex-row items-center justify-center gap-2.5 pr-1">
                  <span className="transition-all">стать частью команды</span>
                  <Arrow className="size-4" />
                </div>
              }
              classLine="bg-foreground"
            />
          </Button>
        </Link>
      </div>
      <div className="bg-background w-full h-16 md:h-26" />
    </main>
  );
}
