import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { PhaseTracker } from "@/components/dashboard/PhaseTracker";
import { clientPipelines, seoPhases } from "@/lib/mock";
import { Badge } from "@/components/ui/badge";

export default function SeoDelivery() {
  const counts = seoPhases.map((p) => ({
    phase: p,
    count: clientPipelines.filter((c) => c.phase === p).length,
  }));

  return (
    <DashboardLayout title="SEO Delivery" subtitle="5-phase pipeline · per-client progress">
      <div className="grid gap-3 md:grid-cols-5">
        {counts.map((c, i) => (
          <Card key={c.phase} className="p-4 bg-gradient-surface border-border/60">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Phase {i + 1}</p>
            <p className="mt-1 text-sm font-semibold">{c.phase}</p>
            <p className="mt-2 text-2xl font-mono-num font-semibold text-primary">{c.count}</p>
            <p className="text-xs text-muted-foreground">clients</p>
          </Card>
        ))}
      </div>

      <Card className="mt-4 p-5 bg-gradient-surface border-border/60">
        <h2 className="text-sm font-semibold">Pipeline by Client</h2>
        <div className="mt-4 space-y-4">
          {clientPipelines.map((c) => (
            <div key={c.id} className="rounded-md border border-border/60 bg-background/40 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.suburb}, Adelaide</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
                    {c.phase}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono-num">{c.daysInPhase}d in phase</span>
                </div>
              </div>
              <div className="mt-3">
                <PhaseTracker current={c.phase} progress={c.phaseProgress} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}
