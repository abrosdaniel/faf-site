import * as React from "react";
import { cn } from "@/lib/utils";

function RotateText({
  title,
  classLine,
  className,
}: {
  title: string;
  classLine?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden group", className)}>
      <span className="opacity-0">{title}</span>
      <span
        className={cn(
          "absolute top-0 left-0 transition-all duration-500 group-hover:-translate-y-full",
          className
        )}
      >
        {title}
      </span>
      <span
        className={cn(
          "absolute top-full left-0 transition-all duration-500 group-hover:-translate-y-full",
          className
        )}
      >
        {title}
      </span>
      <div
        className={cn(
          "absolute bottom-0 left-0 w-0 h-px transition-all duration-500 group-hover:w-full",
          classLine,
          className
        )}
      />
    </div>
  );
}

function LinkText({
  title,
  classLine,
  className,
}: {
  title: React.ReactNode;
  classLine?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden group", className)}>
      <span>{title}</span>
      <div
        className={cn(
          "absolute bottom-0 left-0 w-0 h-px transition-all duration-500 group-hover:w-full",
          classLine,
          className
        )}
      />
    </div>
  );
}

export { RotateText, LinkText };
