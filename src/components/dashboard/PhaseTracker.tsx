import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import type { Phase } from "@/lib/mock";
import { seoPhases } from "@/lib/mock";

interface PhaseTrackerProps {
  current: Phase;
  progress: number; // current phase progress 0-100
  size?: "sm" | "md";
}

export function PhaseTracker({ current, progress, size = "md" }: PhaseTrackerProps) {
  const currentIdx = seoPhases.indexOf(current);
  return (
    <div className={cn("flex items-center", size === "sm" ? "gap-1.5" : "gap-2")}>
      {seoPhases.map((p, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <div key={p} className="flex flex-1 items-center gap-2">
            <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
              <div
                className={cn(
                  "flex items-center gap-1.5 w-full",
                )}
              >
                <div
                  className={cn(
                    "grid place-items-center rounded-full shrink-0 border",
                    size === "sm" ? "h-5 w-5 text-[10px]" : "h-6 w-6 text-xs",
                    done && "bg-success/20 border-success/40 text-success",
                    active && "bg-primary/20 border-primary text-primary ring-2 ring-primary/30",
                    !done && !active && "bg-muted border-border text-muted-foreground",
                  )}
                >
                  {done ? <Check className="h-3 w-3" /> : i + 1}
                </div>
                <div className="h-1 flex-1 rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn(
                      "h-full transition-all",
                      done ? "bg-success w-full" : active ? "bg-gradient-primary" : "w-0",
                    )}
                    style={active ? { width: `${progress}%` } : undefined}
                  />
                </div>
              </div>
              {size === "md" && (
                <span
                  className={cn(
                    "text-[10px] uppercase tracking-wider w-full text-left",
                    active ? "text-primary" : done ? "text-success" : "text-muted-foreground",
                  )}
                >
                  {p}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
