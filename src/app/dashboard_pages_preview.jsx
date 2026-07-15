import { useState, useMemo } from "react";
import {
  Play, Pause, Search, Upload, Users, DollarSign, TrendingUp, TrendingDown,
  Radio, Video, Mic, FileText, ShieldCheck, ShieldAlert, Flag, MoreVertical,
  ChevronDown, Plus, BarChart2, Music2, LayoutGrid, ShieldQuestion
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar,
  CartesianGrid, PieChart, Pie, Cell,
} from "recharts";

const GREEN = "#168978";
const BG = "#0a0f0e";
const CARD = "#111918";
const BORDER = "rgba(22,137,120,0.15)";
const MUTED = "#7a9b96";
const FG = "#f0f4f3";

const barlow = { fontFamily: "'Barlow Condensed', sans-serif" };
const inter = { fontFamily: "'Inter', sans-serif" };

const RANGE_DATA = {
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

function StatCard({ icon: Icon, label, value, delta, up }) {
  return (
    <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "18px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(22,137,120,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={16} color={GREEN} />
        </div>
        <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 12, fontWeight: 600, color: up ? GREEN : "#ff6b7a" }}>
          {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{delta}
        </span>
      </div>
      <div style={{ ...barlow, fontSize: 28, fontWeight: 800, color: "#fff", marginTop: 14 }}>{value}</div>
      <div style={{ fontSize: 12.5, color: MUTED, marginTop: 2 }}>{label}</div>
    </div>
  );
}

function Badge({ children, tone = "default" }) {
  const tones = {
    default: { bg: "rgba(22,137,120,0.12)", color: GREEN },
    warn: { bg: "rgba(224,168,63,0.14)", color: "#e0a83f" },
    danger: { bg: "rgba(212,24,61,0.14)", color: "#ff6b7a" },
    muted: { bg: "rgba(255,255,255,0.06)", color: MUTED },
  };
  const t = tones[tone];
  return (
    <span style={{ background: t.bg, color: t.color, fontSize: 11.5, fontWeight: 600, padding: "3px 9px", borderRadius: 999, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

function PageHeader({ title, subtitle, action }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, flexWrap: "wrap", gap: 14 }}>
      <div>
        <h1 style={{ ...barlow, fontSize: 34, fontWeight: 800, textTransform: "uppercase", color: "#fff", margin: 0, lineHeight: 1 }}>{title}</h1>
        <p style={{ color: MUTED, fontSize: 13.5, marginTop: 6 }}>{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

function AnalyticsPage() {
  const [range, setRange] = useState("30D");
  const data = RANGE_DATA[range];

  return (
    <div>
      <PageHeader
        title="Analytics"
        subtitle="Real-time performance across everything you publish"
        action={
          <div style={{ display: "flex", gap: 6, background: CARD, border: `1px solid ${BORDER}`, borderRadius: 999, padding: 4 }}>
            {["7D", "30D", "90D"].map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                style={{
                  padding: "6px 14px", borderRadius: 999, border: "none", fontSize: 12.5, fontWeight: 600, cursor: "pointer",
                  background: range === r ? GREEN : "transparent", color: range === r ? "#fff" : MUTED, transition: "all .15s",
                }}
              >
                {r}
              </button>
            ))}
          </div>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14, marginBottom: 20 }}>
        <StatCard icon={Radio} label="Total streams" value="2.4M" delta="12.4%" up />
        <StatCard icon={Users} label="Followers" value="184K" delta="3.1%" up />
        <StatCard icon={TrendingUp} label="Engagement rate" value="6.8%" delta="0.4%" up />
        <StatCard icon={DollarSign} label="Est. revenue" value="$18,240" delta="2.2%" up={false} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14, marginBottom: 14 }}>
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "20px 20px 8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <h3 style={{ ...inter, fontSize: 14, fontWeight: 600, color: "#fff", margin: 0 }}>Streams over time</h3>
            <span style={{ fontSize: 12, color: MUTED }}>{range}</span>
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

        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 20 }}>
          <h3 style={{ ...inter, fontSize: 14, fontWeight: 600, color: "#fff", margin: "0 0 12px" }}>Engagement by type</h3>
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
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
            {ENGAGEMENT_DATA.map((d, i) => (
              <div key={d.type} style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6, color: MUTED }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: [GREEN, "#3fa591", "#6cc4b3", "#a8ded2"][i] }} />
                  {d.type}
                </span>
                <span style={{ color: "#fff", fontWeight: 600 }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }}>
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 20 }}>
          <h3 style={{ ...inter, fontSize: 14, fontWeight: 600, color: "#fff", margin: "0 0 14px" }}>Top performing content</h3>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {TOP_CONTENT.map((c, i) => (
              <div key={c.title} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderTop: i > 0 ? `1px solid ${BORDER}` : "none" }}>
                <div>
                  <div style={{ fontSize: 13.5, color: "#fff", fontWeight: 500 }}>{c.title}</div>
                  <div style={{ fontSize: 11.5, color: MUTED, marginTop: 2 }}>{c.type} · {c.plays} plays · {c.likes} likes</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: GREEN }}>{c.revenue}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 20 }}>
          <h3 style={{ ...inter, fontSize: 14, fontWeight: 600, color: "#fff", margin: "0 0 14px" }}>Audience age</h3>
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
  );
}

const TRACKS = [
  { id: 1, title: "Midnight Static", album: "Afterglow EP", duration: "3:42", plays: "482K", likes: "31.2K", status: "Published", date: "Jun 2, 2026" },
  { id: 2, title: "Neon Bloom (Remix)", album: "Singles", duration: "4:05", plays: "88K", likes: "5.7K", status: "Published", date: "May 14, 2026" },
  { id: 3, title: "Glass Cities", album: "Afterglow EP", duration: "3:18", plays: "61K", likes: "4.0K", status: "Published", date: "Apr 30, 2026" },
  { id: 4, title: "Halflight (Demo)", album: "Unreleased", duration: "2:56", plays: "—", likes: "—", status: "Draft", date: "—" },
  { id: 5, title: "Static Reprise", album: "Afterglow EP", duration: "1:44", plays: "—", likes: "—", status: "Scheduled", date: "Jul 22, 2026" },
];

function MiniWave({ active }) {
  return (
    <div style={{ display: "flex", gap: 2, alignItems: "center", height: 16 }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} style={{
          width: 2.5, borderRadius: 2, background: active ? GREEN : "rgba(255,255,255,0.15)",
          height: [8, 14, 6, 12][i], animation: active ? `eq 0.9s ease-in-out ${i * 0.12}s infinite alternate` : "none",
        }} />
      ))}
    </div>
  );
}

function MusicPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("Recent");
  const [playing, setPlaying] = useState(null);

  const filtered = useMemo(() => {
    let list = TRACKS.filter((t) => t.title.toLowerCase().includes(query.toLowerCase()));
    if (status !== "All") list = list.filter((t) => t.status === status);
    if (sort === "Alphabetical") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "Most played") list = [...list].sort((a, b) => parseFloat(b.plays) - parseFloat(a.plays) || 0);
    return list;
  }, [query, status, sort]);

  const current = TRACKS.find((t) => t.id === playing);

  return (
    <div>
      <style>{`@keyframes eq { from { transform: scaleY(0.5);} to { transform: scaleY(1.3);} }`}</style>
      <PageHeader
        title="Music"
        subtitle="Manage your releases, drafts, and scheduled drops"
        action={
          <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 999, border: "none", background: GREEN, color: "#fff", fontWeight: 600, fontSize: 13.5, cursor: "pointer" }}>
            <Upload size={15} /> Upload track
          </button>
        }
      />

      <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "9px 12px", flex: "1 1 220px" }}>
          <Search size={14} color={MUTED} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tracks"
            style={{ background: "none", border: "none", outline: "none", color: FG, fontSize: 13, width: "100%" }}
          />
        </div>
        {["All", "Published", "Draft", "Scheduled"].map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            style={{
              padding: "8px 14px", borderRadius: 999, fontSize: 12.5, fontWeight: 600, cursor: "pointer",
              border: `1px solid ${status === s ? GREEN : BORDER}`,
              background: status === s ? "rgba(22,137,120,0.15)" : "transparent",
              color: status === s ? GREEN : MUTED,
            }}
          >
            {s}
          </button>
        ))}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{ marginLeft: "auto", background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, color: FG, fontSize: 12.5, padding: "8px 10px" }}
        >
          <option>Recent</option>
          <option>Most played</option>
          <option>Alphabetical</option>
        </select>
      </div>

      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: "hidden" }}>
        {filtered.length === 0 && <div style={{ padding: 28, textAlign: "center", color: MUTED, fontSize: 13 }}>No tracks match your filters.</div>}
        {filtered.map((t, i) => (
          <div
            key={t.id}
            style={{
              display: "grid", gridTemplateColumns: "36px 2.2fr 1fr 0.8fr 0.8fr 0.9fr 90px", alignItems: "center",
              gap: 12, padding: "13px 18px", borderTop: i > 0 ? `1px solid ${BORDER}` : "none",
            }}
          >
            <button
              onClick={() => setPlaying(playing === t.id ? null : (t.status === "Published" ? t.id : playing))}
              disabled={t.status !== "Published"}
              style={{
                width: 30, height: 30, borderRadius: "50%", border: "none",
                background: playing === t.id ? GREEN : "rgba(22,137,120,0.12)",
                color: playing === t.id ? "#fff" : GREEN, display: "flex", alignItems: "center", justifyContent: "center",
                cursor: t.status === "Published" ? "pointer" : "default", opacity: t.status === "Published" ? 1 : 0.4,
              }}
            >
              {playing === t.id ? <Pause size={13} /> : <Play size={13} style={{ marginLeft: 1 }} />}
            </button>
            <div>
              <div style={{ fontSize: 13.5, color: "#fff", fontWeight: 500 }}>{t.title}</div>
              <div style={{ fontSize: 11.5, color: MUTED }}>{t.album}</div>
            </div>
            <span style={{ fontSize: 12.5, color: MUTED }}>{t.duration}</span>
            <span style={{ fontSize: 12.5, color: MUTED }}>{t.plays}</span>
            <span style={{ fontSize: 12.5, color: MUTED }}>{t.likes}</span>
            <Badge tone={t.status === "Published" ? "default" : t.status === "Scheduled" ? "warn" : "muted"}>{t.status}</Badge>
            <MiniWave active={playing === t.id} />
          </div>
        ))}
      </div>

      {current && (
        <div style={{ position: "sticky", bottom: 16, marginTop: 16, background: "#0e1615", border: `1px solid ${GREEN}55`, borderRadius: 14, padding: "12px 18px", display: "flex", alignItems: "center", gap: 14 }}>
          <MiniWave active />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: "#fff", fontWeight: 500 }}>{current.title}</div>
            <div style={{ fontSize: 11, color: MUTED }}>Now playing (demo)</div>
          </div>
          <button onClick={() => setPlaying(null)} style={{ background: GREEN, border: "none", color: "#fff", borderRadius: "50%", width: 30, height: 30, cursor: "pointer" }}>
            <Pause size={13} />
          </button>
        </div>
      )}
    </div>
  );
}

const CONTENT_ITEMS = [
  { id: 1, title: "Afterglow EP", type: "Music", icon: Music2, status: "Published", stat: "482K plays", date: "Jun 2" },
  { id: 2, title: "Behind the Booth", type: "Video", icon: Video, status: "Published", stat: "112K views", date: "Jun 9" },
  { id: 3, title: "Studio Diaries Ep. 12", type: "Podcast", icon: Mic, status: "Published", stat: "96K listens", date: "Jun 11" },
  { id: 4, title: "Tour Announcement", type: "Post", icon: FileText, status: "Scheduled", stat: "Goes live Jul 20", date: "Jul 20" },
  { id: 5, title: "Halflight (Demo)", type: "Music", icon: Music2, status: "Draft", stat: "Not published", date: "—" },
  { id: 6, title: "Q&A Livestream Recap", type: "Video", icon: Video, status: "Draft", stat: "Not published", date: "—" },
];

function ContentPage() {
  const [filter, setFilter] = useState("All");
  const types = ["All", "Music", "Video", "Podcast", "Post"];
  const filtered = filter === "All" ? CONTENT_ITEMS : CONTENT_ITEMS.filter((c) => c.type === filter);

  return (
    <div>
      <PageHeader
        title="Content"
        subtitle="Everything you've published, scheduled, or drafted"
        action={
          <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 999, border: "none", background: GREEN, color: "#fff", fontWeight: 600, fontSize: 13.5, cursor: "pointer" }}>
            <Plus size={15} /> Create content
          </button>
        }
      />

      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            style={{
              padding: "8px 16px", borderRadius: 999, fontSize: 12.5, fontWeight: 600, cursor: "pointer",
              border: `1px solid ${filter === t ? GREEN : BORDER}`,
              background: filter === t ? "rgba(22,137,120,0.15)" : "transparent",
              color: filter === t ? GREEN : MUTED,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14 }}>
        {filtered.map((c) => (
          <div key={c.id} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(22,137,120,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <c.icon size={17} color={GREEN} />
              </div>
              <Badge tone={c.status === "Published" ? "default" : c.status === "Scheduled" ? "warn" : "muted"}>{c.status}</Badge>
            </div>
            <div style={{ fontSize: 15, color: "#fff", fontWeight: 600, marginBottom: 4 }}>{c.title}</div>
            <div style={{ fontSize: 12, color: MUTED, marginBottom: 14 }}>{c.type} · {c.date}</div>
            <div style={{ fontSize: 12.5, color: GREEN, fontWeight: 600, borderTop: `1px solid ${BORDER}`, paddingTop: 10 }}>{c.stat}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const CREATORS = [
  { id: 1, name: "Aria Chen", email: "aria@mail.com", followers: "1.2M", revenue: "$48,200", status: "Verified", joined: "Feb 2025" },
  { id: 2, name: "Marcus Webb", email: "marcus@mail.com", followers: "800K", revenue: "$31,900", status: "Verified", joined: "Nov 2024" },
  { id: 3, name: "Solène Dupont", email: "solene@mail.com", followers: "420K", revenue: "$12,440", status: "Pending", joined: "Jun 2026" },
  { id: 4, name: "Devon Cole", email: "devon@mail.com", followers: "94K", revenue: "$2,180", status: "Suspended", joined: "Mar 2026" },
  { id: 5, name: "Priya Anand", email: "priya@mail.com", followers: "310K", revenue: "$9,760", status: "Verified", joined: "Sep 2025" },
];

const FLAGS = [
  { id: 1, item: "Midnight Static — comment thread", reason: "Harassment report", reports: 4, severity: "danger" },
  { id: 2, item: "Tour Announcement — post", reason: "Copyright claim", reports: 1, severity: "warn" },
  { id: 3, item: "Q&A Livestream — chat replay", reason: "Spam links", reports: 7, severity: "danger" },
];

function AdminPage() {
  const [tab, setTab] = useState("Creators");
  const [query, setQuery] = useState("");
  const [creators, setCreators] = useState(CREATORS);
  const [flags, setFlags] = useState(FLAGS);

  const filtered = creators.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.email.includes(query.toLowerCase()));

  function toggleStatus(id) {
    setCreators((cs) => cs.map((c) => c.id === id ? { ...c, status: c.status === "Suspended" ? "Verified" : "Suspended" } : c));
  }

  function resolveFlag(id) {
    setFlags((fs) => fs.filter((f) => f.id !== id));
  }

  return (
    <div>
      <PageHeader title="Admin panel" subtitle="Platform oversight, creator accounts, and moderation queue" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14, marginBottom: 20 }}>
        <StatCard icon={Users} label="Total creators" value="12,480" delta="4.8%" up />
        <StatCard icon={DollarSign} label="Platform revenue" value="$2.1M" delta="9.2%" up />
        <StatCard icon={ShieldAlert} label="Flagged items" value={flags.length} delta="—" up={false} />
        <StatCard icon={ShieldCheck} label="Verified this week" value="86" delta="11%" up />
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {["Creators", "Moderation"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "9px 18px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer",
              border: `1px solid ${tab === t ? GREEN : BORDER}`,
              background: tab === t ? "rgba(22,137,120,0.12)" : "transparent",
              color: tab === t ? GREEN : MUTED,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Creators" && (
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", borderBottom: `1px solid ${BORDER}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "8px 12px", maxWidth: 280 }}>
              <Search size={13} color={MUTED} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search creators" style={{ background: "none", border: "none", outline: "none", color: FG, fontSize: 12.5, width: "100%" }} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 0.8fr 0.9fr 0.9fr 100px", padding: "10px 18px", fontSize: 11, color: MUTED, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            <span>Creator</span><span>Followers</span><span>Revenue</span><span>Joined</span><span>Status</span><span></span>
          </div>
          {filtered.map((c) => (
            <div key={c.id} style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 0.8fr 0.9fr 0.9fr 100px", alignItems: "center", padding: "12px 18px", borderTop: `1px solid ${BORDER}` }}>
              <div>
                <div style={{ fontSize: 13.5, color: "#fff", fontWeight: 500 }}>{c.name}</div>
                <div style={{ fontSize: 11.5, color: MUTED }}>{c.email}</div>
              </div>
              <span style={{ fontSize: 12.5, color: MUTED }}>{c.followers}</span>
              <span style={{ fontSize: 12.5, color: MUTED }}>{c.revenue}</span>
              <span style={{ fontSize: 12.5, color: MUTED }}>{c.joined}</span>
              <Badge tone={c.status === "Verified" ? "default" : c.status === "Pending" ? "warn" : "danger"}>{c.status}</Badge>
              <button
                onClick={() => toggleStatus(c.id)}
                style={{ fontSize: 11.5, fontWeight: 600, padding: "6px 10px", borderRadius: 8, cursor: "pointer", border: `1px solid ${BORDER}`, background: "transparent", color: c.status === "Suspended" ? GREEN : "#ff6b7a" }}
              >
                {c.status === "Suspended" ? "Reinstate" : "Suspend"}
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === "Moderation" && (
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: "hidden" }}>
          {flags.length === 0 && <div style={{ padding: 28, textAlign: "center", color: MUTED, fontSize: 13 }}>Queue is clear.</div>}
          {flags.map((f, i) => (
            <div key={f.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderTop: i > 0 ? `1px solid ${BORDER}` : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Flag size={15} color={f.severity === "danger" ? "#ff6b7a" : "#e0a83f"} />
                <div>
                  <div style={{ fontSize: 13.5, color: "#fff", fontWeight: 500 }}>{f.item}</div>
                  <div style={{ fontSize: 11.5, color: MUTED }}>{f.reason} · {f.reports} reports</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => resolveFlag(f.id)} style={{ fontSize: 11.5, fontWeight: 600, padding: "6px 12px", borderRadius: 8, cursor: "pointer", border: "none", background: GREEN, color: "#fff" }}>Dismiss</button>
                <button onClick={() => resolveFlag(f.id)} style={{ fontSize: 11.5, fontWeight: 600, padding: "6px 12px", borderRadius: 8, cursor: "pointer", border: `1px solid #ff6b7a55`, background: "transparent", color: "#ff6b7a" }}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const PAGES = {
  Analytics: { icon: BarChart2, Comp: AnalyticsPage },
  Music: { icon: Music2, Comp: MusicPage },
  Content: { icon: LayoutGrid, Comp: ContentPage },
  Admin: { icon: ShieldQuestion, Comp: AdminPage },
};

export default function Demo() {
  const [page, setPage] = useState("Analytics");
  const Active = PAGES[page].Comp;

  return (
    <div style={{ minHeight: "100vh", background: BG, color: FG, ...inter }}>
      <nav style={{ position: "sticky", top: 0, zIndex: 10, background: "rgba(10,15,14,0.95)", backdropFilter: "blur(8px)", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: GREEN, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Play size={12} color="#fff" fill="#fff" style={{ marginLeft: 1 }} />
            </div>
            <span style={{ ...barlow, fontSize: 18, fontWeight: 700, letterSpacing: "0.05em", color: "#fff" }}>now-play</span>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {Object.entries(PAGES).map(([name, { icon: Icon }]) => (
              <button
                key={name}
                onClick={() => setPage(name)}
                style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 999,
                  border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
                  background: page === name ? "rgba(22,137,120,0.15)" : "transparent",
                  color: page === name ? GREEN : MUTED,
                }}
              >
                <Icon size={14} /> {name}
              </button>
            ))}
          </div>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        </div>
      </nav>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "32px 24px 60px" }}>
        <Active />
      </div>
    </div>
  );
}
