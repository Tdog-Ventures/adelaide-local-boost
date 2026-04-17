import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FunnelChart } from "@/components/dashboard/FunnelChart";
import { outreach } from "@/lib/mock";
import { CheckCircle2 } from "lucide-react";

export default function Outreach() {
  const capPct = (outreach.sentToday / outreach.dailyCap) * 100;
  return (
    <DashboardLayout title="Outreach" subtitle="75 sends/day · personalised, frequency-capped">
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5 bg-gradient-surface border-border/60 lg:col-span-1">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Daily cap</p>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-mono-num font-semibold text-primary">{outreach.sentToday}</span>
            <span className="text-sm text-muted-foreground font-mono-num">/ {outreach.dailyCap}</span>
          </div>
          <Progress value={capPct} className="mt-3 h-2" />
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <Stat label="Replied" value={outreach.replied} />
            <Stat label="Booked" value={outreach.booked} accent />
            <Stat label="Closed" value={outreach.closed} />
          </div>
        </Card>

        <Card className="p-5 bg-gradient-surface border-border/60 lg:col-span-2">
          <h2 className="text-sm font-semibold">Funnel · Sent → Replied → Booked → Closed</h2>
          <FunnelChart data={outreach.funnel} />
        </Card>
      </div>

      <Card className="mt-4 p-5 bg-gradient-surface border-border/60">
        <h2 className="text-sm font-semibold">Variant Performance</h2>
        <Table className="mt-3">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Variant</TableHead>
              <TableHead className="text-right">Sent</TableHead>
              <TableHead className="text-right">Reply</TableHead>
              <TableHead className="text-right">Book</TableHead>
              <TableHead className="text-right">Close</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {outreach.variants.map((v) => (
              <TableRow key={v.id}>
                <TableCell className="font-mono-num text-primary">{v.id}</TableCell>
                <TableCell>{v.name}</TableCell>
                <TableCell className="text-right font-mono-num">{v.sent}</TableCell>
                <TableCell className="text-right font-mono-num">{v.replyRate}%</TableCell>
                <TableCell className="text-right font-mono-num">{v.bookRate}%</TableCell>
                <TableCell className="text-right font-mono-num">{v.closeRate}%</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline" className={v.score >= 80 ? "border-success/40 bg-success/10 text-success" : v.score >= 65 ? "border-primary/40 bg-primary/10 text-primary" : "border-warning/40 bg-warning/10 text-warning"}>
                    {v.score}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card className="mt-4 p-5 bg-gradient-surface border-border/60">
        <h2 className="text-sm font-semibold">Frequency Rules</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {outreach.rules.map((r) => (
            <li key={r.rule} className="flex items-center gap-2 rounded-md border border-border/60 bg-background/40 px-3 py-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
              <span>{r.rule}</span>
            </li>
          ))}
        </ul>
      </Card>
    </DashboardLayout>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="rounded-md border border-border/60 bg-background/40 p-2">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={"mt-0.5 font-mono-num text-lg font-semibold " + (accent ? "text-accent" : "")}>{value}</p>
    </div>
  );
}
