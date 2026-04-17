import { Card } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiTileProps {
  label: string;
  value: string;
  delta?: number;
  deltaSuffix?: string;
  accent?: "primary" | "accent" | "success" | "warning";
  hint?: string;
}

export function KpiTile({ label, value, delta, deltaSuffix = "%", accent = "primary", hint }: KpiTileProps) {
  const positive = (delta ?? 0) >= 0;
  const accentClass = {
    primary: "text-primary",
    accent: "text-accent",
    success: "text-success",
    warning: "text-warning",
  }[accent];

  return (
    <Card className="relative overflow-hidden p-5 bg-gradient-surface border-border/60">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        {delta !== undefined && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-mono-num font-medium px-1.5 py-0.5 rounded",
              positive ? "text-success bg-success/10" : "text-danger bg-danger/10",
            )}
          >
            {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(delta)}
            {deltaSuffix}
          </span>
        )}
      </div>
      <div className={cn("mt-3 text-3xl font-mono-num font-semibold tracking-tight", accentClass)}>{value}</div>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      <div className="pointer-events-none absolute -right-8 -bottom-8 h-24 w-24 rounded-full bg-primary/5 blur-2xl" />
    </Card>
  );
}
