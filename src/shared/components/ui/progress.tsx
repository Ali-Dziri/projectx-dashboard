import * as React from "react";
import { Progress as ProgressPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.ComponentProps<
  typeof ProgressPrimitive.Root
> {
  indeterminate?: boolean;
}

function Progress({
  className,
  value,
  indeterminate,
  ...props
}: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-muted h-1 rounded-none relative flex w-full items-center overflow-x-hidden",
        indeterminate && "animate-progress origin-left",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary size-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
