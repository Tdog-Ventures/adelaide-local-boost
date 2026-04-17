import DashboardLayout from "@/components/DashboardLayout";
import { KpiTile } from "@/components/dashboard/KpiTile";
import { CycleCountdown } from "@/components/dashboard/CycleCountdown";
import { Card } from "@/components/ui/card";
import { agents, kpis } from "@/lib/mock";
import { cn } from "@/lib/utils";

export default function Overview() {
  return (
    <DashboardLayout title="Overview" subtitle="Adelaide retail · live operational snapshot">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiTile label="MRR" value={`$${kpis.mrr.toLocaleString()}`} delta={kpis.mrrDelta} accent="primary" hint="Monthly recurring" />
        <KpiTile label="Active Clients" value={String(kpis.activeClients)} delta={kpis.activeClientsDelta} deltaSuffix="" accent="accent" hint="Across all tiers" />
        <KpiTile label="Reply Rate" value={`${kpis.replyRate}%`} delta={kpis.replyRateDelta} accent="success" hint="7-day rolling" />
        <KpiTile label="Bookings (7d)" value={String(kpis.bookings7d)} delta={kpis.bookings7dDelta} deltaSuffix="" accent="warning" hint="Discovery calls" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
          <KpiTile label="Close Rate" value={`${kpis.closeRate}%`} delta={kpis.closeRateDelta} accent="primary" />
          <KpiTile label="ARPU" value={`$${kpis.arpu}`} delta={kpis.arpuDelta} accent="accent" hint="Per active client" />
        </div>
        <CycleCountdown />
      </div>

      <Card className="mt-4 p-5 bg-gradient-surface border-border/60">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Agent Status</h2>
          <span className="text-xs text-muted-foreground">3 autonomous agents</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {agents.map((a) => (
            <div key={a.id} className="rounded-md border border-border/60 bg-background/40 p-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{a.name}</p>
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    a.status === "active" && "bg-success animate-pulse-glow",
                    a.status === "idle" && "bg-muted-foreground",
                    a.status === "error" && "bg-danger",
                  )}
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{a.lastAction}</p>
              <div className="mt-2 flex items-center gap-3 text-xs">
                <span className="font-mono-num text-primary">{a.successRate}%</span>
                <span className="text-muted-foreground">queue {a.queueDepth}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}
