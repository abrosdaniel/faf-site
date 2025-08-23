"use client";

import directus from "@/services/directus";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { Arrow } from "@/assets/icons/Icons";

export default function NewsPosts({
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
  const [visibleCount, setVisibleCount] = useState(isMobile ? 8 : 12);
  const postsPerPage = isMobile ? 8 : 12;

  useEffect(() => {
    setVisibleCount(isMobile ? 8 : 12);
  }, [isFilter, isSearch, isMobile]);

  const PostItems = ({
    index,
    variant,
    id,
    created_at,
    updated_at,
    src,
    title,
    description,
    className,
  }: {
    index: number;
    variant: string;
    id: string;
    created_at: string;
    updated_at: string;
    src: string;
    title: string;
    description: string;
    className?: string;
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
        className={cn("group flex flex-col gap-3 md:gap-5 relative", {
          "col-span-2": variant === "default" && isMobile && index % 5 === 0,
          "col-span-2 md:row-span-2":
            variant === "default" && !isMobile && index === 0,
        })}
      >
        {isNew && (
          <div className="absolute top-3 right-3 z-20 bg-primary text-primary-foreground p-1.5 text-xs font-unbounded font-semibold uppercase flex flex-row items-center gap-1.5">
            <div className="size-2 bg-primary-foreground" />
            <span>Новое</span>
          </div>
        )}
        <div
          className={cn("relative w-full", {
            "aspect-[4/3] md:aspect-auto md:h-full":
              variant === "default" && index === 0,
            "aspect-[4/3] md:aspect-video":
              (variant === "default" && index !== 0) || variant === "recommend",
          })}
        >
          <div className="absolute inset-0 w-full h-full bg-transparent group-hover:bg-primary/40 transition-colors duration-300 z-20" />
          <Image
            src={src}
            alt={title}
            fill
            sizes="100%"
            className="object-cover z-10"
          />
        </div>
        <div
          className={cn("flex flex-col gap-3 justify-between h-full", {
            "absolute bottom-0 left-0 h-auto p-5 md:py-10 z-20":
              variant === "default" && index === 0,
          })}
        >
          <div className="flex flex-col gap-3">
            <h2
              className={cn(
                "text-sm md:text-base font-bold uppercase line-clamp-3",
                {
                  "text-base md:text-3xl text-primary group-hover:text-muted":
                    variant === "default" && index === 0,
                }
              )}
            >
              {title}
            </h2>
            <p
              className={cn("hidden md:line-clamp-6", {
                "text-muted": variant === "default" && index === 0,
              })}
            >
              {description}
            </p>
          </div>
          <p
            className={cn("text-xs text-muted-foreground", {
              "text-muted": variant === "default" && index === 0,
            })}
          >
            {new Date(created_at).toLocaleDateString()}
          </p>
        </div>
      </Link>
    );
  };

  const filteredPosts = data
    .slice(0, count ? parseInt(count as string) : undefined)
    .filter((post: any) => {
      if (!isFilter || isFilter === "all") return true;
      if (isFilter === "Новости") return post.category.includes("Новости");
      if (isFilter === "Сделки") return post.category.includes("Сделки");
      if (isFilter === "Медиа") return post.category.includes("Медиа");
      return false;
    })
    .filter((post: any) => {
      if (!isSearch) return true;
      return post.title.toLowerCase().includes(isSearch.toLowerCase());
    })
    .slice(0, type === "recommend" ? (isMobile ? 4 : 3) : undefined);

  const finalPosts =
    isSearch && filteredPosts.length < 3 ? data.slice(0, 3) : filteredPosts;

  const visiblePosts = finalPosts.slice(0, visibleCount);
  const hasMorePosts = visibleCount < finalPosts.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + postsPerPage);
  };

  return (
    <div className="flex flex-col gap-10">
      <div
        className={cn(
          "grid grid-cols-2 md:grid-cols-3 gap-x-2 md:gap-x-5 gap-y-5 md:gap-y-14",
          className
        )}
      >
        {visiblePosts.map((post: any, index: number) => {
          return (
            <PostItems
              variant={type || "default"}
              key={post.id}
              index={index}
              id={post.id}
              created_at={post.date_created}
              updated_at={post.date_updated}
              src={`${directus.url}assets/${post.cover}`}
              title={post.title}
              description={post.description}
            />
          );
        })}
      </div>
      {hasMorePosts && (
        <div className="flex justify-center">
          <Button onClick={loadMore} icon="arrow" className="px-11 py-4">
            <span>Показать еще</span>
            <Arrow className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
