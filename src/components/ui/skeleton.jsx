import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    (<div
      className={cn("animate-pulse rounded-md dark:text-slate-200 text-neutral-200 bg-neutral-200 dark:bg-slate-200", className)}
      {...props} />)
  );
}

export { Skeleton }
