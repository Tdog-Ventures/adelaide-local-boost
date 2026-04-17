import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Agent } from "@/lib/mock";
import { Activity, Bot, Sparkles } from "lucide-react";

const iconMap = {
  content: Sparkles,
  monetization: Activity,
  interaction: Bot,
};

const statusStyles = {
  active: "bg-success/15 text-success border-success/30",
  idle: "bg-muted text-muted-foreground border-border",
  error: "bg-danger/15 text-danger border-danger/30",
};

export function AgentCard({ agent }: { agent: Agent }) {
  const Icon = iconMap[agent.id];
  return (
    <Card className="p-5 bg-gradient-surface border-border/60">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">{agent.name}</h3>
            <p className="text-xs text-muted-foreground">Last action {agent.lastActionAt}</p>
          </div>
        </div>
        <Badge variant="outline" className={cn("capitalize", statusStyles[agent.status])}>
          <span className={cn("mr-1.5 h-1.5 w-1.5 rounded-full", agent.status === "active" ? "bg-success animate-pulse-glow" : agent.status === "error" ? "bg-danger" : "bg-muted-foreground")} />
          {agent.status}
        </Badge>
      </div>

      <p className="mt-4 text-sm text-foreground/90 line-clamp-2">{agent.lastAction}</p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-md border border-border/60 bg-background/40 p-3">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Queue</p>
          <p className="mt-1 text-xl font-mono-num font-semibold">{agent.queueDepth}</p>
        </div>
        <div className="rounded-md border border-border/60 bg-background/40 p-3">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Success</p>
          <p className="mt-1 text-xl font-mono-num font-semibold text-primary">{agent.successRate}%</p>
        </div>
      </div>

      <div className="mt-4 space-y-1.5">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Recent activity</p>
        <ul className="space-y-1">
          {agent.activity.slice(0, 3).map((a, i) => (
            <li key={i} className="flex gap-3 text-xs">
              <span className="font-mono-num text-muted-foreground w-10 shrink-0">{a.time}</span>
              <span className="text-foreground/80">{a.action}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
