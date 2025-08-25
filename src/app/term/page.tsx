"use client";

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

import { SlashIcon } from "lucide-react";

export default function Term() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { data: terms, isLoading } = useQuery({
    queryKey: ["terms"],
    queryFn: async () =>
      await directus.request(
        readItem("terms", 1, {
          fields: ["*"],
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

  if (!terms) {
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
                ? `${directus.url}assets/${terms.cover_mob}`
                : `${directus.url}assets/${terms.cover_desk}`
            }
            alt="Terms"
            fill
            sizes="100%"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="px-4 md:px-10 py-14 bg-foreground flex-shrink-0">
          <h1 className="text-xl md:text-6xl font-black font-unbounded uppercase text-background">
            политика конфиденциальности
          </h1>
        </div>
      </div>
      <div className="px-4 md:px-10 py-14 md:py-10 space-y-10">
        <Breadcrumb className="pb-0 md:pb-10">
          <BreadcrumbList className="uppercase text-sm">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Главная</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold">
                Политика конфиденциальности
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <PageTopLine className="border-accent" classLine="bg-accent" />
        <div
          dangerouslySetInnerHTML={{ __html: terms.article }}
          className="[&_h2]:text-xl [&_a]:text-accent [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:space-y-2 [&_ul]:mt-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_ol]:space-y-2 [&_ol]:mt-4 space-y-8"
        />
        <div className="flex flex-row justify-start text-muted-foreground gap-2 mt-24 text-sm">
          <p>Обновлено:</p>
          <p>{new Date(terms.date_updated).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="bg-background w-full h-16 md:h-26" />
    </main>
  );
}
