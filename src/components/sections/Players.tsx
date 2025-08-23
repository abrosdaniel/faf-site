"use client";

import directus from "@/services/directus";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";

import { Arrow } from "@/assets/icons/Icons";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function PlayersCard({
  data,
  type,
  count,
  isFilter,
  isSearch,
  className,
}: {
  data: any;
  type?: string;
  count?: string;
  isFilter?: string;
  isSearch?: string;
  className?: string;
}) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const playersPerPage = isMobile ? 6 : 12;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [isFilter, isSearch]);

  const PlayerItems = ({
    photo,
    first_name,
    last_name,
    birthday,
    position,
    team_name,
    team_logo,
    stats_link,
  }: {
    photo: string;
    first_name: string;
    last_name: string;
    birthday: string;
    position: string;
    team_name: string;
    team_logo: string;
    stats_link: string;
  }) => {
    return (
      <Link href={stats_link} className="group flex flex-col">
        <div className="relative w-full aspect-square md:aspect-[4/3]">
          <Image
            src={photo}
            alt={`${first_name} ${last_name}`}
            fill
            sizes="100%"
            className="object-cover"
          />
        </div>
        <div className="flex flex-row h-full">
          <div className="hidden md:block h-full w-0 bg-primary group-hover:w-5 transition-all duration-300" />
          <div className="p-3 md:py-5 md:px-7.5 bg-white flex flex-col gap-2.5 w-full">
            <div className="flex flex-row justify-between gap-2.5">
              <h2 className="text-sm md:text-2xl font-bold uppercase">
                {first_name} {last_name}
              </h2>
              <div className="relative size-8 md:size-10 aspect-square">
                <Image
                  src={team_logo}
                  alt={team_name}
                  fill
                  sizes="100%"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row-reverse md:justify-between gap-1.5 md:gap-0 text-xs md:text-sm text-muted-foreground font-semibold uppercase">
              <div className="flex flex-col md:justify-end">
                <p>{new Date(birthday).getFullYear()}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <p>{team_name}</p>
                <p>{position}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  const filteredPlayers = data
    .slice(0, count ? parseInt(count as string) : undefined)
    .filter((player: any) => {
      if (!isFilter || isFilter === "all") return true;
      const position = player.position.toLowerCase();
      if (isFilter === "Полузащитник") return position.includes("полузащитник");
      if (isFilter === "Защитник")
        return (
          position.includes("защитник") && !position.includes("полузащитник")
        );
      if (isFilter === "Нападающий") return position.includes("нападающий");
      if (isFilter === "Вратарь") return position.includes("вратарь");
      return false;
    })
    .filter((player: any) => {
      if (!isSearch) return true;
      const searchTerm = isSearch.toLowerCase().trim();
      const fullName = `${player.first_name} ${player.last_name}`.toLowerCase();
      return fullName.includes(searchTerm);
    });

  const totalPages = Math.ceil(filteredPlayers.length / playersPerPage);
  const startIndex = (currentPage - 1) * playersPerPage;
  const endIndex = startIndex + playersPerPage;
  const visiblePlayers = filteredPlayers.slice(startIndex, endIndex);

  const getPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          items.push(i);
        }
        items.push("ellipsis");
        items.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        items.push(1);
        items.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          items.push(i);
        }
      } else {
        items.push(1);
        items.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          items.push(i);
        }
        items.push("ellipsis");
        items.push(totalPages);
      }
    }

    return items;
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2 md:gap-x-5 gap-y-5">
        {visiblePlayers.map((player: any) => (
          <PlayerItems
            key={player.id}
            photo={`${directus.url}assets/${player.photo}`}
            first_name={player.first_name}
            last_name={player.last_name}
            birthday={player.birthday}
            position={player.position}
            team_name={player.team.name}
            team_logo={`${directus.url}assets/${player.team.logo}`}
            stats_link={player.stats_link}
          />
        ))}
      </div>
      {type === "page" && totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink
                className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                href="#plrs"
                aria-label="Предыдущая страница"
                aria-disabled={currentPage === 1 ? true : undefined}
                role={currentPage === 1 ? "link" : undefined}
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                  }
                }}
              >
                <ChevronLeftIcon size={16} aria-hidden="true" />
              </PaginationLink>
            </PaginationItem>
            {getPaginationItems().map((item: any, index: any) => {
              if (item === "ellipsis-start" || item === "ellipsis-end") {
                return (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#plrs"
                    onClick={() => {
                      if (typeof item === "number") {
                        setCurrentPage(item);
                      }
                    }}
                    className={`text-base rounded-none size-9 ${
                      currentPage === item
                        ? "text-foreground bg-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationLink
                className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                href="#plrs"
                aria-label="Следующая страница"
                aria-disabled={currentPage === totalPages ? true : undefined}
                role={currentPage === totalPages ? "link" : undefined}
                onClick={() => {
                  if (currentPage < totalPages) {
                    setCurrentPage(currentPage + 1);
                  }
                }}
              >
                <ChevronRightIcon size={16} aria-hidden="true" />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
      {type === "more" && (
        <div className="flex justify-center">
          <Button icon="arrow" className="px-11 py-4">
            <Link
              href="/players"
              className="flex flex-row items-center justify-center gap-2.5"
            >
              <span>Все игроки</span>
              <Arrow className="size-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
