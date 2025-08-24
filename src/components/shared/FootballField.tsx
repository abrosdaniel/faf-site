"use client";

import { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function FooterLine({
  className,
  classLine,
}: {
  className?: string;
  classLine?: string;
}) {
  const pathname = usePathname();
  const lineRef = useRef<HTMLDivElement>(null);
  const lineRef1 = useRef<HTMLDivElement>(null);
  const lineRef2 = useRef<HTMLDivElement>(null);
  const lineRef3 = useRef<HTMLDivElement>(null);
  const lineRef4 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      lineRef.current &&
      lineRef1.current &&
      lineRef2.current &&
      lineRef3.current &&
      lineRef4.current
    ) {
      const timer = setTimeout(() => {
        const tl1 = gsap.fromTo(
          lineRef1.current,
          {
            height: 0,
          },
          {
            height: "100%",
            duration: 1,
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 80%",
              end: "top 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
        const tl2 = gsap.fromTo(
          lineRef2.current,
          {
            height: 0,
          },
          {
            height: "100%",
            duration: 1,
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 80%",
              end: "top 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
        const tl3 = gsap.fromTo(
          lineRef3.current,
          {
            width: 0,
          },
          {
            width: "100%",
            duration: 1,
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 80%",
              end: "top 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
        const tl4 = gsap.fromTo(
          lineRef4.current,
          {
            height: 0,
          },
          {
            height: "100%",
            duration: 1,
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 80%",
              end: "top 20%",
              toggleActions: "play none none reverse",
            },
          }
        );

        return () => {
          tl1.kill();
          tl2.kill();
          tl3.kill();
          tl4.kill();
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
      }, 500);

      return () => {
        clearTimeout(timer);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, [pathname]);
  return (
    <div
      ref={lineRef}
      className={cn("relative flex justify-between h-5 w-full", className)}
    >
      <div ref={lineRef1} className={cn("w-px", classLine)} />
      <div ref={lineRef2} className={cn("w-px", classLine)} />
      <div
        ref={lineRef3}
        className={cn(
          "h-px absolute top-0 left-1/2 -translate-x-1/2",
          classLine
        )}
      />
      <div
        ref={lineRef4}
        className={cn(
          "absolute top-0 left-1/2 -translate-x-1/2 w-px",
          classLine
        )}
      />
    </div>
  );
}

function CircleLine({
  children,
  className,
  classNameCircle,
}: {
  children?: React.ReactNode;
  className?: string;
  classNameCircle?: string;
}) {
  return (
    <div className={cn("w-full h-full relative overflow-hidden", className)}>
      <div
        className={cn(
          "border border-inherit rounded-full absolute top-0 left-1/2 -translate-x-1/2 aspect-square pointer-events-none",
          classNameCircle
        )}
      />
      {children}
    </div>
  );
}

function PageTopLine({
  className,
  numeric,
  classLine,
}: {
  className?: string;
  numeric?: string;
  classLine?: string;
}) {
  const pathname = usePathname();
  const lineRef = useRef<HTMLDivElement>(null);
  const lineRef1 = useRef<HTMLDivElement>(null);
  const lineRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lineRef.current && lineRef1.current && lineRef2.current) {
      const timer = setTimeout(() => {
        const tl1 = gsap.fromTo(
          lineRef1.current,
          {
            width: 0,
          },
          {
            width: "100%",
            duration: 1,
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 80%",
              end: "top 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
        const tl2 = gsap.fromTo(
          lineRef2.current,
          {
            height: 0,
          },
          {
            height: "100%",
            duration: 1,
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 80%",
              end: "top 20%",
              toggleActions: "play none none reverse",
            },
          }
        );

        return () => {
          tl1.kill();
          tl2.kill();
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
      }, 100);

      return () => {
        clearTimeout(timer);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, [pathname]);
  return (
    <div
      ref={lineRef}
      className={cn(
        "flex flex-col gap-2.5 md:gap-5 justify-center items-center h-full w-full",
        className
      )}
    >
      {numeric ? (
        <p className="text-sm md:text-base text-accent">{`| ${numeric} |`}</p>
      ) : null}
      <div ref={lineRef1} className={cn("h-px", classLine)} />
      <div className="w-px h-8 md:h-13">
        <div ref={lineRef2} className={cn("w-px", classLine)} />
      </div>
    </div>
  );
}

export { FooterLine, CircleLine, PageTopLine };
