import { cn } from "@/lib/utils";

export function GridWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        className,
        "relative w-full",
        "before:absolute before:top-0 before:h-px before:bg-border-primary/50",
        "before:-left-4 before:-right-4 md:before:-left-8 md:before:-right-8 lg:before:inset-x-0",
        "after:-left-4 after:-right-4 md:after:-left-8 md:after:-right-8 lg:after:inset-x-0",
        "after:absolute after:bottom-0 after:h-px after:bg-border-primary/50",
      )}
    >
      {children}
    </div>
  );
}
