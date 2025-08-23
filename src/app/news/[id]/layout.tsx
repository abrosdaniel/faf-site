import directus from "@/services/directus";
import { readItems } from "@directus/sdk";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const post = await directus.request(
    readItems("posts", {
      filter: { id: { _eq: slug } },
      fields: ["*"],
    })
  );

  return {
    title: {
      default: post[0].title,
      template: "%s | FAF",
    },
    description: post[0].description,
    openGraph: {
      title: post[0].title + " | FAF",
      description: post[0].description,
      url: `${process.env.NEXT_PUBLIC_FRONT_URL}/news/${slug}`,
      images: [
        {
          url: `${directus.url}assets/${post[0].cover}`,
          width: 1200,
          height: 630,
          alt: post[0].title,
        },
      ],
    },
    twitter: {
      title: post[0].title + " | FAF",
      description: post[0].description,
      images: [`${directus.url}assets/${post[0].cover}`],
    },
  };
}

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
