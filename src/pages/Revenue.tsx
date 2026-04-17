import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { KpiTile } from "@/components/dashboard/KpiTile";
import { revenue, kpis } from "@/lib/mock";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowRight } from "lucide-react";

export default function Revenue() {
  const totalOneTime = revenue.tiers.reduce((s, t) => s + t.oneTime, 0);
  const totalMrr = revenue.tiers.reduce((s, t) => s + t.mrr, 0);
  const totalClients = revenue.tiers.reduce((s, t) => s + t.clients, 0);

  return (
    <DashboardLayout title="Revenue" subtitle="Tiers · ARPU · upsell flow">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiTile label="MRR" value={`$${totalMrr.toLocaleString()}`} delta={kpis.mrrDelta} accent="primary" />
        <KpiTile label="One-time (lifetime)" value={`$${totalOneTime.toLocaleString()}`} delta={18.2} accent="accent" />
        <KpiTile label="Paying Clients" value={String(totalClients)} delta={3} deltaSuffix="" accent="success" />
        <KpiTile label="ARPU" value={`$${kpis.arpu}`} delta={kpis.arpuDelta} accent="warning" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {revenue.tiers.map((t) => (
          <Card key={t.tier} className="p-5 bg-gradient-surface border-border/60">
            <div className="flex items-baseline justify-between">
              <h3 className="text-sm font-semibold">{t.tier}</h3>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{t.type}</span>
            </div>
            <p className="mt-2 text-3xl font-mono-num font-semibold text-primary text-glow-primary">
              ${t.price}
              {t.type === "monthly" && <span className="text-base text-muted-foreground">/mo</span>}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-md border border-border/60 bg-background/40 p-3">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Clients</p>
                <p className="mt-1 font-mono-num text-xl font-semibold">{t.clients}</p>
              </div>
              <div className="rounded-md border border-border/60 bg-background/40 p-3">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t.type === "monthly" ? "MRR" : "Revenue"}</p>
                <p className="mt-1 font-mono-num text-xl font-semibold text-accent">
                  ${(t.type === "monthly" ? t.mrr : t.oneTime).toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-4 p-5 bg-gradient-surface border-border/60">
        <h2 className="text-sm font-semibold">Revenue Trend (6 months)</h2>
        <div className="h-72 mt-3">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenue.trend} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
              <defs>
                <linearGradient id="gMrr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gOnce" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Area type="monotone" dataKey="oneTime" stroke="hsl(var(--accent))" fill="url(#gOnce)" strokeWidth={2} />
              <Area type="monotone" dataKey="mrr" stroke="hsl(var(--primary))" fill="url(#gMrr)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="mt-4 p-5 bg-gradient-surface border-border/60">
        <h2 className="text-sm font-semibold">Upsell Flow</h2>
        <ul className="mt-3 space-y-2">
          {revenue.upsellFlow.map((f, i) => (
            <li key={i} className="flex items-center gap-3 rounded-md border border-border/60 bg-background/40 px-3 py-2 text-sm">
              <span className="font-medium">{f.from}</span>
              <ArrowRight className="h-4 w-4 text-primary" />
              <span className="font-medium text-primary">{f.to}</span>
              <span className="ml-auto font-mono-num text-muted-foreground">{f.count} clients</span>
            </li>
          ))}
        </ul>
      </Card>
    </DashboardLayout>
  );
}
