import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { strategy } from "@/lib/mock";
import { Sparkles } from "lucide-react";

export default function Strategy() {
  return (
    <DashboardLayout title="Strategy" subtitle="Variant scoring · auto-optimisation log · pending adjustments">
      <Card className="p-5 bg-gradient-surface border-border/60">
        <h2 className="text-sm font-semibold">Variant Scoring</h2>
        <Table className="mt-3">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Variant</TableHead>
              <TableHead className="text-right">Reply</TableHead>
              <TableHead className="text-right">Close</TableHead>
              <TableHead className="text-right w-[180px]">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {strategy.variantScores.map((v) => (
              <TableRow key={v.id}>
                <TableCell className="font-mono-num text-primary">{v.id}</TableCell>
                <TableCell>{v.name}</TableCell>
                <TableCell className="text-right font-mono-num">{v.replyRate}%</TableCell>
                <TableCell className="text-right font-mono-num">{v.closeRate}%</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <Progress value={v.score} className="h-1.5 w-24" />
                    <span className="font-mono-num text-sm">{v.score}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card className="p-5 bg-gradient-surface border-border/60">
          <h2 className="text-sm font-semibold">Auto-optimisation Log</h2>
          <ul className="mt-3 divide-y divide-border/60">
            {strategy.optimisationLog.map((l, i) => (
              <li key={i} className="py-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium">{l.change}</p>
                  <span className="text-xs text-muted-foreground font-mono-num shrink-0">{l.time}</span>
                </div>
                <p className="mt-0.5 text-xs text-success">{l.impact}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5 bg-gradient-surface border-border/60">
          <h2 className="text-sm font-semibold">Pending Adjustments</h2>
          <ul className="mt-3 space-y-3">
            {strategy.pendingAdjustments.map((a, i) => (
              <li key={i} className="rounded-md border border-border/60 bg-background/40 p-3">
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="outline" className="border-accent/40 bg-accent/10 text-accent">
                    {a.type}
                  </Badge>
                  <span className="inline-flex items-center gap-1 text-xs text-primary font-mono-num">
                    <Sparkles className="h-3 w-3" />
                    {(a.confidence * 100).toFixed(0)}% conf
                  </span>
                </div>
                <p className="mt-2 text-sm">{a.description}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </DashboardLayout>
  );
}
