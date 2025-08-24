import directus from "@/services/directus";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

import Link from "next/link";
import Image from "next/image";

import { Mail } from "@/assets/icons/Icons";
import { LinkText } from "../shared/Text";

export default function TeamAgency({
  data,
  className,
}: {
  data: any;
  className?: string;
}) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const PersonItems = ({
    src,
    first_name,
    last_name,
    sur_name,
    position,
    mail,
    className,
  }: {
    src: string;
    first_name: string;
    last_name: string;
    sur_name: string;
    position: string;
    mail: string;
    className?: string;
  }) => {
    return (
      <div
        className={cn(
          "flex flex-col md:flex-row md:justify-between gap-3 px-4 md:px-10 py-5 uppercase border-b border-foreground transition-all",
          className
        )}
      >
        <div className="flex md:flex-2/5 flex-row justify-between items-center">
          <div className="flex flex-col text-lg font-bold">
            <h3>{last_name}</h3>
            <div className="flex flex-col md:flex-row md:gap-1">
              <h3>{first_name}</h3>
              <h3>{sur_name}</h3>
            </div>
          </div>
          <div className="relative aspect-square md:aspect-[4/3] h-32">
            <Image
              src={src}
              alt={`${first_name} ${last_name} ${sur_name}`}
              fill
              sizes="100%"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        <div className="hidden md:flex flex-1/5"></div>
        <div className="flex md:flex-2/5 flex-row justify-between items-center font-semibold text-xs md:text-lg">
          <p>{position}</p>
          <Link href={`mailto:${mail}`}>
            <LinkText
              title={
                <div className="flex flex-row gap-2 items-center whitespace-nowrap">
                  <Mail className="h-3" />
                  <span>{mail}</span>
                </div>
              }
              classLine="bg-primary"
            />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className={cn("flex flex-col", className)}>
      {data.map((person: any) => (
        <PersonItems
          key={person.id}
          src={`${directus.url}assets/${person.photo}`}
          first_name={person.first_name}
          last_name={person.last_name}
          sur_name={person.sur_name}
          position={person.position}
          mail={person.mail}
          className={
            isMobile
              ? data.indexOf(person) % 2 === 0
                ? "bg-foreground text-background [&_p]:text-primary [&_a]:text-primary"
                : "bg-background text-foreground [&_p]:text-accent [&_a]:text-accent"
              : "hover:bg-foreground hover:text-background [&_p]:text-accent hover:[&_p]:text-primary [&_a]:text-accent hover:[&_a]:text-primary"
          }
        />
      ))}
    </div>
  );
}
