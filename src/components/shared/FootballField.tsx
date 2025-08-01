import { cn } from "@/lib/utils";

function FooterLine({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex justify-center items-center h-5 w-full border-x border-t",
        className
      )}
    >
      <div className="border-l border-inherit h-full" />
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
}: {
  className?: string;
  numeric?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2.5 md:gap-5 justify-center items-center h-full w-full",
        className
      )}
    >
      {numeric ? (
        <p className="text-sm md:text-base text-accent">{`| ${numeric} |`}</p>
      ) : null}
      <div className="w-full border-t border-inherit" />
      <div className="border-l border-inherit h-6 md:h-13" />
    </div>
  );
}

export { FooterLine, CircleLine, PageTopLine };
