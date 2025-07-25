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

export { FooterLine, CircleLine };
