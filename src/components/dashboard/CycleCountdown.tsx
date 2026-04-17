import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cycle } from "@/lib/mock";
import { Timer } from "lucide-react";

function formatRemaining(ms: number) {
  if (ms <= 0) return "00h 00m 00s";
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);
  return `${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
}

export function CycleCountdown() {
  const ends = new Date(cycle.endsAt).getTime();
  const start = new Date(cycle.startedAt).getTime();
  const total = ends - start;
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const remaining = ends - now;
  const elapsed = Math.min(Math.max(now - start, 0), total);
  const progress = total > 0 ? (elapsed / total) * 100 : cycle.progress;

  return (
    <Card className="p-5 bg-gradient-surface border-border/60">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            72h Optimisation Cycle
          </p>
          <p className="mt-1 text-sm text-foreground/80">
            Cycle <span className="font-mono-num text-primary">#{cycle.cycleNumber}</span> · {cycle.decisionsPending} decisions pending
          </p>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20">
          <Timer className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-5 flex items-baseline justify-between">
        <span className="text-2xl font-mono-num font-semibold text-glow-primary text-primary">
          {formatRemaining(remaining)}
        </span>
        <span className="text-xs text-muted-foreground font-mono-num">{progress.toFixed(0)}%</span>
      </div>
      <Progress value={progress} className="mt-2 h-2" />
    </Card>
  );
}
