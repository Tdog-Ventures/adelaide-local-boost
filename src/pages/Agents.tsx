import DashboardLayout from "@/components/DashboardLayout";
import { AgentCard } from "@/components/dashboard/AgentCard";
import { Card } from "@/components/ui/card";
import { agents } from "@/lib/mock";

export default function Agents() {
  return (
    <DashboardLayout title="Agents" subtitle="Content · Monetization · Interaction">
      <div className="grid gap-4 lg:grid-cols-3">
        {agents.map((a) => (
          <AgentCard key={a.id} agent={a} />
        ))}
      </div>

      <Card className="mt-4 p-5 bg-gradient-surface border-border/60">
        <h2 className="text-sm font-semibold">Combined Activity Log</h2>
        <p className="text-xs text-muted-foreground">Latest actions across all 3 agents</p>
        <ul className="mt-4 divide-y divide-border/60">
          {agents
            .flatMap((a) => a.activity.map((act) => ({ agent: a.name, ...act })))
            .slice(0, 10)
            .map((row, i) => (
              <li key={i} className="grid grid-cols-[60px_140px_1fr] items-center gap-3 py-2 text-sm">
                <span className="font-mono-num text-xs text-muted-foreground">{row.time}</span>
                <span className="text-xs uppercase tracking-wider text-primary">{row.agent}</span>
                <span className="text-foreground/90">{row.action}</span>
              </li>
            ))}
        </ul>
      </Card>
    </DashboardLayout>
  );
}
