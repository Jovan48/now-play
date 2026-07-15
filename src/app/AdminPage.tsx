import { useState } from "react";
import { Users, DollarSign, ShieldAlert, ShieldCheck, Search, Flag } from "lucide-react";
import DashboardNav from "./DashboardNav";

type CreatorStatus = "Verified" | "Pending" | "Suspended";

const CREATORS: { id: number; name: string; email: string; followers: string; revenue: string; status: CreatorStatus; joined: string }[] = [
  { id: 1, name: "Aria Chen", email: "aria@mail.com", followers: "1.2M", revenue: "$48,200", status: "Verified", joined: "Feb 2025" },
  { id: 2, name: "Marcus Webb", email: "marcus@mail.com", followers: "800K", revenue: "$31,900", status: "Verified", joined: "Nov 2024" },
  { id: 3, name: "Solène Dupont", email: "solene@mail.com", followers: "420K", revenue: "$12,440", status: "Pending", joined: "Jun 2026" },
  { id: 4, name: "Devon Cole", email: "devon@mail.com", followers: "94K", revenue: "$2,180", status: "Suspended", joined: "Mar 2026" },
  { id: 5, name: "Priya Anand", email: "priya@mail.com", followers: "310K", revenue: "$9,760", status: "Verified", joined: "Sep 2025" },
];

const INITIAL_FLAGS = [
  { id: 1, item: "Midnight Static — comment thread", reason: "Harassment report", reports: 4, severity: "danger" as const },
  { id: 2, item: "Tour Announcement — post", reason: "Copyright claim", reports: 1, severity: "warn" as const },
  { id: 3, item: "Q&A Livestream — chat replay", reason: "Spam links", reports: 7, severity: "danger" as const },
];

function Badge({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "warn" | "danger" }) {
  const tones = {
    default: "bg-primary/12 text-primary",
    warn: "bg-[#e0a83f]/15 text-[#e0a83f]",
    danger: "bg-[#d4183d]/15 text-[#ff6b7a]",
  };
  return <span className={`${tones[tone]} text-[11.5px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap`}>{children}</span>;
}

function StatCard({ icon: Icon, label, value, delta }: { icon: any; label: string; value: string | number; delta: string }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <div className="flex justify-between items-start">
        <div className="w-[34px] h-[34px] rounded-[10px] bg-primary/15 flex items-center justify-center">
          <Icon size={16} className="text-primary" />
        </div>
        <span className="text-xs font-semibold text-muted-foreground">{delta}</span>
      </div>
      <div className="text-white mt-3.5" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 800 }}>{value}</div>
      <div className="text-muted-foreground text-[12.5px] mt-0.5">{label}</div>
    </div>
  );
}

export default function AdminPage() {
  const [tab, setTab] = useState<"Creators" | "Moderation">("Creators");
  const [query, setQuery] = useState("");
  const [creators, setCreators] = useState(CREATORS);
  const [flags, setFlags] = useState(INITIAL_FLAGS);

  const filtered = creators.filter(
    (c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.email.toLowerCase().includes(query.toLowerCase())
  );

  function toggleStatus(id: number) {
    setCreators((cs) => cs.map((c) => (c.id === id ? { ...c, status: c.status === "Suspended" ? "Verified" : "Suspended" } : c)));
  }

  function resolveFlag(id: number) {
    setFlags((fs) => fs.filter((f) => f.id !== id));
  }

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
      <DashboardNav active="Admin" />
      <div className="max-w-[1180px] mx-auto px-6 py-8 pb-16">
        <div className="mb-7">
          <h1 className="text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 34, fontWeight: 800, textTransform: "uppercase", lineHeight: 1 }}>
            Admin panel
          </h1>
          <p className="text-muted-foreground text-[13.5px] mt-1.5">Platform oversight, creator accounts, and moderation queue</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-5">
          <StatCard icon={Users} label="Total creators" value="12,480" delta="+4.8%" />
          <StatCard icon={DollarSign} label="Platform revenue" value="$2.1M" delta="+9.2%" />
          <StatCard icon={ShieldAlert} label="Flagged items" value={flags.length} delta="live" />
          <StatCard icon={ShieldCheck} label="Verified this week" value="86" delta="+11%" />
        </div>

        <div className="flex gap-1.5 mb-4">
          {(["Creators", "Moderation"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-[18px] py-2.5 rounded-[10px] text-sm font-semibold border transition-colors ${
                tab === t ? "border-primary bg-primary/12 text-primary" : "border-border text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "Creators" && (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-[18px] py-3.5 border-b border-border">
              <div className="flex items-center gap-2 bg-background border border-border rounded-[10px] px-3 py-2 max-w-[280px]">
                <Search size={13} className="text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search creators"
                  className="bg-transparent border-none outline-none text-foreground text-xs w-full"
                />
              </div>
            </div>
            <div className="grid grid-cols-[1.6fr_1fr_0.8fr_0.9fr_0.9fr_100px] px-[18px] py-2.5 text-[11px] text-muted-foreground uppercase tracking-wide">
              <span>Creator</span><span>Followers</span><span>Revenue</span><span>Joined</span><span>Status</span><span></span>
            </div>
            {filtered.map((c) => (
              <div key={c.id} className="grid grid-cols-[1.6fr_1fr_0.8fr_0.9fr_0.9fr_100px] items-center px-[18px] py-3 border-t border-border">
                <div>
                  <div className="text-[13.5px] text-white font-medium">{c.name}</div>
                  <div className="text-[11.5px] text-muted-foreground">{c.email}</div>
                </div>
                <span className="text-xs text-muted-foreground">{c.followers}</span>
                <span className="text-xs text-muted-foreground">{c.revenue}</span>
                <span className="text-xs text-muted-foreground">{c.joined}</span>
                <Badge tone={c.status === "Verified" ? "default" : c.status === "Pending" ? "warn" : "danger"}>{c.status}</Badge>
                <button
                  onClick={() => toggleStatus(c.id)}
                  className="text-[11.5px] font-semibold px-2.5 py-1.5 rounded-lg border border-border"
                  style={{ color: c.status === "Suspended" ? "#168978" : "#ff6b7a" }}
                >
                  {c.status === "Suspended" ? "Reinstate" : "Suspend"}
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === "Moderation" && (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {flags.length === 0 && <div className="p-7 text-center text-muted-foreground text-sm">Queue is clear.</div>}
            {flags.map((f, i) => (
              <div key={f.id} className={`flex items-center justify-between px-[18px] py-3.5 ${i > 0 ? "border-t border-border" : ""}`}>
                <div className="flex items-center gap-3">
                  <Flag size={15} className={f.severity === "danger" ? "text-[#ff6b7a]" : "text-[#e0a83f]"} />
                  <div>
                    <div className="text-[13.5px] text-white font-medium">{f.item}</div>
                    <div className="text-[11.5px] text-muted-foreground">{f.reason} · {f.reports} reports</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => resolveFlag(f.id)} className="text-[11.5px] font-semibold px-3 py-1.5 rounded-lg bg-primary text-white">
                    Dismiss
                  </button>
                  <button onClick={() => resolveFlag(f.id)} className="text-[11.5px] font-semibold px-3 py-1.5 rounded-lg border border-[#ff6b7a]/35 text-[#ff6b7a]">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
