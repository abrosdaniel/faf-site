"use client";

import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useQuery } from "@tanstack/react-query";
import directus from "@/services/directus";
import { readItem } from "@directus/sdk";
import { notFound } from "next/navigation";

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
import { PageTopLine } from "@/components/shared/FootballField";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import PlayersCard from "@/components/sections/Players";

import { SlashIcon } from "lucide-react";
import { Arrow } from "@/assets/icons/Icons";
import { SearchIcon } from "lucide-react";

export default function Players() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const { data: footballers, isLoading } = useQuery({
    queryKey: ["footballers"],
    queryFn: async () =>
      await directus.request(
        readItem("footballers", 1, {
          fields: ["*, players.*", "players.team.*"],
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

  if (!footballers) {
    notFound();
  }

  const TabsItem = ({ value, title }: { value: string; title: string }) => {
    return (
      <ToggleGroupItem
        value={value}
        aria-label={title}
        className="group p-0 h-full md:min-w-48 bg-foreground text-background data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:bg-foreground hover:text-background hover:opacity-90 cursor-pointer"
      >
        <div className="flex flex-row items-center justify-center gap-2.5 w-full px-11 py-4 uppercase font-unbounded font-semibold text-xs">
          <Arrow className="size-4 group-hover:rotate-45 group-data-[state=off]:hidden" />
          <span>{title}</span>
        </div>
      </ToggleGroupItem>
    );
  };
  return (
    <main>
      <div className="h-screen flex flex-col">
        <div className="relative w-full flex-1">
          <div className="absolute top-0 left-0 bg-gradient-to-b from-foreground/90 via-transparent to-transparent z-10 w-full h-1/5" />
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-foreground/90 via-transparent to-transparent z-10 w-full h-4/5 md:h-2/5" />
          <Image
            src={
              isMobile
                ? `${directus.url}assets/${footballers.cover_mob}`
                : `${directus.url}assets/${footballers.cover_desk}`
            }
            alt="Players"
            fill
            sizes="100%"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="flex flex-shrink-0 flex-col md:flex-row gap-6 md:gap-14 items-start md:items-end justify-between px-4 md:px-10 py-14 bg-foreground">
          <h1 className="text-5xl md:text-7xl font-black font-unbounded uppercase text-background">
            Игроки FAF
          </h1>
          <h2 className="text-xl font-bold font-unbounded uppercase text-background">
            Состав игроков под нашим сопровождением
          </h2>
        </div>
      </div>
      <div className="flex flex-col gap-10 py-10">
        <Breadcrumb className="px-4 md:px-10">
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
              <BreadcrumbPage className="font-semibold">Игроки</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-col md:flex-row gap-6 md:gap-5 px-4 md:px-10">
          <div className="relative">
            <Input
              id="search"
              className="peer ps-9 font-unbounded text-sm py-4 h-full"
              placeholder="Поиск игрока"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="text-primary pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
              <SearchIcon size={22} />
            </div>
          </div>
          <ToggleGroup
            value={filter}
            onValueChange={setFilter}
            type="single"
            className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-5 w-full md:w-fit"
          >
            <TabsItem value="all" title="Все игроки" />
            <TabsItem value="Полузащитник" title="Полузащитники" />
            <TabsItem value="Защитник" title="Защитники" />
            <TabsItem value="Нападающий" title="Нападающие" />
            <TabsItem value="Вратарь" title="Вратари" />
          </ToggleGroup>
        </div>
        <PageTopLine className="border-accent px-4 md:px-10" />
        <h2
          id="plrs"
          className="text-5xl md:text-7xl font-semibold font-unbounded uppercase text-foreground mx-auto md:mx-0 px-4 md:px-10"
        >
          Все игроки
        </h2>
        <PlayersCard
          data={footballers.players}
          type="page"
          isFilter={filter}
          isSearch={search}
          className="px-4 md:px-10"
        />
      </div>
    </main>
  );
}
