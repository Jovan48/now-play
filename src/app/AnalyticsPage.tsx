import { useState } from "react";
import { Radio, Users, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar,
  CartesianGrid, PieChart, Pie, Cell,
} from "recharts";
import DashboardNav from "./DashboardNav";

const GREEN = "#168978";
const BORDER = "rgba(22,137,120,0.15)";
const MUTED = "#7a9b96";

type Range = "7D" | "30D" | "90D";

const RANGE_DATA: Record<Range, { label: string; streams: number; revenue: number }[]> = {
  "7D": [
    { label: "Mon", streams: 4200, revenue: 210 }, { label: "Tue", streams: 5100, revenue: 260 },
    { label: "Wed", streams: 4800, revenue: 240 }, { label: "Thu", streams: 6200, revenue: 310 },
    { label: "Fri", streams: 7400, revenue: 390 }, { label: "Sat", streams: 8900, revenue: 470 },
    { label: "Sun", streams: 7600, revenue: 400 },
  ],
  "30D": Array.from({ length: 30 }, (_, i) => ({
    label: `${i + 1}`,
    streams: Math.round(3500 + Math.sin(i * 0.4) * 1800 + i * 90 + Math.random() * 600),
    revenue: Math.round(180 + Math.sin(i * 0.4) * 90 + i * 4),
  })),
  "90D": Array.from({ length: 12 }, (_, i) => ({
    label: `W${i + 1}`,
    streams: Math.round(28000 + Math.sin(i * 0.5) * 9000 + i * 1400),
    revenue: Math.round(1400 + Math.sin(i * 0.5) * 450 + i * 70),
  })),
};

const ENGAGEMENT_DATA = [
  { type: "Music", value: 62 }, { type: "Live", value: 21 },
  { type: "Podcast", value: 12 }, { type: "Posts", value: 5 },
];

const AUDIENCE_DATA = [
  { label: "18-24", value: 34 }, { label: "25-34", value: 41 },
  { label: "35-44", value: 16 }, { label: "45+", value: 9 },
];

const TOP_CONTENT = [
  { title: "Midnight Static", type: "Music", plays: "482K", likes: "31.2K", revenue: "$4,120" },
  { title: "Live from the Loft", type: "Live", plays: "210K", likes: "18.4K", revenue: "$2,860" },
  { title: "Studio Diaries Ep. 12", type: "Podcast", plays: "96K", likes: "6.1K", revenue: "$980" },
  { title: "Neon Bloom (Remix)", type: "Music", plays: "88K", likes: "5.7K", revenue: "$740" },
];

function StatCard({ icon: Icon, label, value, delta, up }: { icon: any; label: string; value: string; delta: string; up: boolean }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <div className="flex justify-between items-start">
        <div className="w-[34px] h-[34px] rounded-[10px] bg-primary/15 flex items-center justify-center">
          <Icon size={16} className="text-primary" />
        </div>
        <span className={`flex items-center gap-1 text-xs font-semibold ${up ? "text-primary" : "text-[#ff6b7a]"}`}>
          {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{delta}
        </span>
      </div>
      <div className="text-white mt-3.5" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 800 }}>{value}</div>
      <div className="text-muted-foreground text-[12.5px] mt-0.5">{label}</div>
    </div>
  );
}

export default function AnalyticsPage() {
  const [range, setRange] = useState<Range>("30D");
  const data = RANGE_DATA[range];

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
      <DashboardNav active="Analytics" />
      <div className="max-w-[1180px] mx-auto px-6 py-8 pb-16">
        <div className="flex justify-between items-end mb-7 flex-wrap gap-3.5">
          <div>
            <h1 className="text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 34, fontWeight: 800, textTransform: "uppercase", lineHeight: 1 }}>
              Analytics
            </h1>
            <p className="text-muted-foreground text-[13.5px] mt-1.5">Real-time performance across everything you publish</p>
          </div>
          <div className="flex gap-1.5 bg-card border border-border rounded-full p-1">
            {(["7D", "30D", "90D"] as Range[]).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  range === r ? "bg-primary text-white" : "text-muted-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-5">
          <StatCard icon={Radio} label="Total streams" value="2.4M" delta="12.4%" up />
          <StatCard icon={Users} label="Followers" value="184K" delta="3.1%" up />
          <StatCard icon={TrendingUp} label="Engagement rate" value="6.8%" delta="0.4%" up />
          <StatCard icon={DollarSign} label="Est. revenue" value="$18,240" delta="2.2%" up={false} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3.5 mb-3.5">
          <div className="bg-card border border-border rounded-2xl p-5 pb-2">
            <div className="flex justify-between mb-2">
              <h3 className="text-white text-sm font-semibold">Streams over time</h3>
              <span className="text-xs text-muted-foreground">{range}</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={data} margin={{ left: -20, top: 8 }}>
                <defs>
                  <linearGradient id="streamFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={GREEN} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={GREEN} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="label" stroke={MUTED} fontSize={11} tickLine={false} axisLine={false} interval={range === "30D" ? 4 : 0} />
                <YAxis stroke={MUTED} fontSize={11} tickLine={false} axisLine={false} width={40} />
                <Tooltip contentStyle={{ background: "#0e1615", border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 12 }} labelStyle={{ color: MUTED }} />
                <Area type="monotone" dataKey="streams" stroke={GREEN} strokeWidth={2} fill="url(#streamFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="text-white text-sm font-semibold mb-3">Engagement by type</h3>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={ENGAGEMENT_DATA} dataKey="value" nameKey="type" innerRadius={38} outerRadius={62} paddingAngle={3}>
                  {ENGAGEMENT_DATA.map((_, i) => (
                    <Cell key={i} fill={[GREEN, "#3fa591", "#6cc4b3", "#a8ded2"][i]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#0e1615", border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-1.5 mt-1">
              {ENGAGEMENT_DATA.map((d, i) => (
                <div key={d.type} className="flex justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="w-2 h-2 rounded-sm" style={{ background: [GREEN, "#3fa591", "#6cc4b3", "#a8ded2"][i] }} />
                    {d.type}
                  </span>
                  <span className="text-white font-semibold">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-3.5">
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="text-white text-sm font-semibold mb-3.5">Top performing content</h3>
            <div className="flex flex-col">
              {TOP_CONTENT.map((c, i) => (
                <div key={c.title} className={`flex items-center justify-between py-2.5 ${i > 0 ? "border-t border-border" : ""}`}>
                  <div>
                    <div className="text-[13.5px] text-white font-medium">{c.title}</div>
                    <div className="text-[11.5px] text-muted-foreground mt-0.5">{c.type} · {c.plays} plays · {c.likes} likes</div>
                  </div>
                  <div className="text-[13px] font-bold text-primary">{c.revenue}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="text-white text-sm font-semibold mb-3.5">Audience age</h3>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={AUDIENCE_DATA}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="label" stroke={MUTED} fontSize={11} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ background: "#0e1615", border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 12 }} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                <Bar dataKey="value" fill={GREEN} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
