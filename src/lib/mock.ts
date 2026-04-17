// Mock data for ETHINX Operator Command Center (v1, no backend yet)

export type AgentStatus = "active" | "idle" | "error";

export interface Agent {
  id: "content" | "monetization" | "interaction";
  name: string;
  status: AgentStatus;
  lastAction: string;
  lastActionAt: string;
  queueDepth: number;
  successRate: number; // 0-100
  activity: { time: string; action: string }[];
}

export const agents: Agent[] = [
  {
    id: "content",
    name: "Content Agent",
    status: "active",
    lastAction: "Generated GBP post for Adelaide Coffee Co.",
    lastActionAt: "2m ago",
    queueDepth: 12,
    successRate: 94,
    activity: [
      { time: "10:42", action: "Published GBP post · Adelaide Coffee Co." },
      { time: "10:31", action: "Drafted review reply · North Adelaide Bakery" },
      { time: "10:18", action: "Generated 5 schema snippets · Glenelg Surf Co." },
      { time: "09:55", action: "Refreshed citation copy · Norwood Books" },
    ],
  },
  {
    id: "monetization",
    name: "Monetization Agent",
    status: "active",
    lastAction: "Triggered upsell: $497 → $1,497 (Glenelg Surf Co.)",
    lastActionAt: "7m ago",
    queueDepth: 4,
    successRate: 78,
    activity: [
      { time: "10:38", action: "Upsell triggered · Glenelg Surf Co. ($1,000 delta)" },
      { time: "10:12", action: "Pricing variant B promoted (+9% conv)" },
      { time: "09:40", action: "Urgency offer sent to 14 leads" },
    ],
  },
  {
    id: "interaction",
    name: "Interaction Agent",
    status: "idle",
    lastAction: "Booked discovery call · Unley Florist",
    lastActionAt: "21m ago",
    queueDepth: 0,
    successRate: 86,
    activity: [
      { time: "10:21", action: "Booking confirmed · Unley Florist (Thu 2pm)" },
      { time: "10:05", action: "Reply received · Henley Auto Detail" },
      { time: "09:30", action: "Follow-up #2 sent to 18 leads" },
    ],
  },
];

export const kpis = {
  mrr: 18450,
  mrrDelta: 12.4,
  activeClients: 37,
  activeClientsDelta: 3,
  replyRate: 14.6,
  replyRateDelta: 1.8,
  bookings7d: 22,
  bookings7dDelta: 4,
  closeRate: 31.2,
  closeRateDelta: -1.1,
  arpu: 498,
  arpuDelta: 6.2,
};

export const cycle = {
  cycleNumber: 47,
  startedAt: "2025-04-16T08:00:00Z",
  endsAt: "2025-04-19T08:00:00Z", // 72h cycle
  progress: 58, // %
  decisionsPending: 3,
};

export const outreach = {
  dailyCap: 75,
  sentToday: 61,
  replied: 9,
  booked: 3,
  closed: 1,
  variants: [
    { id: "V1", name: "Standard pitch", sent: 412, replyRate: 11.2, bookRate: 3.4, closeRate: 28.0, score: 71 },
    { id: "V2", name: "App-hook", sent: 380, replyRate: 17.6, bookRate: 5.8, closeRate: 33.5, score: 89 },
    { id: "V3", name: "Urgency offer", sent: 256, replyRate: 14.0, bookRate: 4.2, closeRate: 36.1, score: 82 },
    { id: "V4", name: "Case study", sent: 198, replyRate: 9.6, bookRate: 2.1, closeRate: 24.0, score: 58 },
  ],
  funnel: [
    { stage: "Sent", value: 1246 },
    { stage: "Replied", value: 178 },
    { stage: "Booked", value: 54 },
    { stage: "Closed", value: 17 },
  ],
  rules: [
    { rule: "Max 75 sends / day", status: "active" as const },
    { rule: "Follow-up #1 at 48h", status: "active" as const },
    { rule: "Follow-up #2 at 5d", status: "active" as const },
    { rule: "Cap 3 touches per lead", status: "active" as const },
    { rule: "Pause on reply", status: "active" as const },
  ],
};

export const revenue = {
  tiers: [
    { tier: "MVP", price: 497, type: "one-time", clients: 14, mrr: 0, oneTime: 6958 },
    { tier: "Full Automation", price: 1497, type: "one-time", clients: 9, mrr: 0, oneTime: 13473 },
    { tier: "Hosted System", price: 97, type: "monthly", clients: 14, mrr: 1358, oneTime: 0 },
  ],
  trend: [
    { month: "Nov", mrr: 680, oneTime: 4200 },
    { month: "Dec", mrr: 880, oneTime: 6100 },
    { month: "Jan", mrr: 1040, oneTime: 8800 },
    { month: "Feb", mrr: 1180, oneTime: 11200 },
    { month: "Mar", mrr: 1280, oneTime: 14600 },
    { month: "Apr", mrr: 1358, oneTime: 20431 },
  ],
  upsellFlow: [
    { from: "Lead", to: "MVP $497", count: 23 },
    { from: "MVP $497", to: "Hosted $97/mo", count: 14 },
    { from: "MVP $497", to: "Full $1,497", count: 9 },
  ],
};

export type Phase = "GBP" | "Citations" | "Reviews" | "Velocity" | "AI/AEO";

export const seoPhases: Phase[] = ["GBP", "Citations", "Reviews", "Velocity", "AI/AEO"];

export interface ClientPipeline {
  id: string;
  name: string;
  suburb: string;
  phase: Phase;
  phaseProgress: number; // 0-100
  daysInPhase: number;
}

export const clientPipelines: ClientPipeline[] = [
  { id: "c1", name: "Adelaide Coffee Co.", suburb: "CBD", phase: "Velocity", phaseProgress: 64, daysInPhase: 4 },
  { id: "c2", name: "Glenelg Surf Co.", suburb: "Glenelg", phase: "AI/AEO", phaseProgress: 38, daysInPhase: 2 },
  { id: "c3", name: "Norwood Books", suburb: "Norwood", phase: "Reviews", phaseProgress: 82, daysInPhase: 6 },
  { id: "c4", name: "North Adelaide Bakery", suburb: "North Adelaide", phase: "Citations", phaseProgress: 51, daysInPhase: 3 },
  { id: "c5", name: "Henley Auto Detail", suburb: "Henley Beach", phase: "GBP", phaseProgress: 22, daysInPhase: 1 },
  { id: "c6", name: "Unley Florist", suburb: "Unley", phase: "Reviews", phaseProgress: 47, daysInPhase: 5 },
  { id: "c7", name: "Prospect Pet Co.", suburb: "Prospect", phase: "AI/AEO", phaseProgress: 91, daysInPhase: 8 },
];

export const strategy = {
  variantScores: outreach.variants,
  optimisationLog: [
    { time: "10:42", change: "Promoted variant V2 (+9% reply rate)", impact: "+$1,200 projected MRR" },
    { time: "08:15", change: "Reduced send cap from 90 → 75 (deliverability dip)", impact: "Reply rate +1.8pp" },
    { time: "Yesterday", change: "Increased Hosted price test $97 → $127 (50/50)", impact: "Pending 72h" },
    { time: "2 days ago", change: "Added urgency offer to MVP tier", impact: "Close rate +4.1pp" },
  ],
  pendingAdjustments: [
    { type: "Pricing", description: "Promote $127/mo Hosted if conv ≥ baseline", confidence: 0.74 },
    { type: "Messaging", description: "Roll out V2 app-hook to 100% of new sends", confidence: 0.91 },
    { type: "Outreach", description: "Expand to Burnside + Mitcham suburbs", confidence: 0.62 },
  ],
};
