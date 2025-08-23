import directus from "@/services/directus";
import { readItem, readItems } from "@directus/sdk";
import { notFound } from "next/navigation";

import Image from "next/image";
import NewsPosts from "@/components/sections/News";
import { PageTopLine } from "@/components/shared/FootballField";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NewsArticlePage({ params }: Props) {
  const { id } = await params;
  const news = await directus.request(
    readItem("news", 1, {
      fields: ["*", "posts.*"],
    })
  );
  const post = await directus.request(
    readItem("posts", id, {
      filter: { id: { _eq: id } },
      fields: ["*"],
    })
  );

  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const randomPosts = shuffleArray(
    news.posts.filter((p: any) => p.id !== parseInt(id))
  ).slice(0, 4);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <div className="relative w-full aspect-video">
        <div className="absolute top-0 left-0 bg-gradient-to-b from-foreground/90 via-transparent to-transparent z-10 w-full h-1/5" />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-foreground/90 via-transparent to-transparent z-10 w-full h-4/5 md:h-2/5" />
        <Image
          src={`${directus.url}assets/${post.cover}`}
          alt={post.title}
          fill
          sizes="100%"
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="flex flex-col gap-10 py-10">
        <PageTopLine className="border-accent px-4 md:px-10" />
        <h1 className="text-xl md:text-[40px] text-center md:text-left font-bold font-unbounded uppercase text-foreground mx-auto md:mx-0 px-4 md:px-10">
          {post.title}
        </h1>
        <div className="text-xs text-muted-foreground uppercase px-4 md:px-10">
          {new Date(post.date_created).toLocaleDateString()} |{" "}
          {post.category.join(", ")}
        </div>
        <div
          className="px-4 md:px-10 space-y-6 [&_h2]:text-2xl [&_h3]:text-xl [&_h4]:text-lg [&_a]:text-accent [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:space-y-2 [&_ul]:mt-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_ol]:space-y-2 [&_ol]:mt-4 [&_p:has(img)]:flex [&_p:has(img)]:flex-row [&_p:has(img)]:gap-5 [&_img]:object-cover [&_img]:object-center [&_p:has(img)_img]:w-full [&_p:has(img)_img]:h-auto"
          dangerouslySetInnerHTML={{ __html: post.article }}
        />
      </div>
      <PageTopLine className="border-accent px-4 md:px-10 mb-10" />
      <p className="text-2xl text-center md:text-left font-bold font-unbounded uppercase text-foreground mx-auto md:mx-0 px-4 md:px-10 mb-5 md:mb-10">
        Другие новости
      </p>
      <NewsPosts
        data={randomPosts}
        type="recommend"
        className="px-4 md:px-10 mb-10"
      />
    </main>
  );
}
