import { useState, useMemo } from "react";
import { Play, Pause, Search, Upload } from "lucide-react";
import DashboardNav from "./DashboardNav";

const GREEN = "#168978";
const BORDER = "rgba(22,137,120,0.15)";

type Status = "Published" | "Draft" | "Scheduled";

const TRACKS: { id: number; title: string; album: string; duration: string; plays: string; likes: string; status: Status; date: string }[] = [
  { id: 1, title: "Midnight Static", album: "Afterglow EP", duration: "3:42", plays: "482K", likes: "31.2K", status: "Published", date: "Jun 2, 2026" },
  { id: 2, title: "Neon Bloom (Remix)", album: "Singles", duration: "4:05", plays: "88K", likes: "5.7K", status: "Published", date: "May 14, 2026" },
  { id: 3, title: "Glass Cities", album: "Afterglow EP", duration: "3:18", plays: "61K", likes: "4.0K", status: "Published", date: "Apr 30, 2026" },
  { id: 4, title: "Halflight (Demo)", album: "Unreleased", duration: "2:56", plays: "—", likes: "—", status: "Draft", date: "—" },
  { id: 5, title: "Static Reprise", album: "Afterglow EP", duration: "1:44", plays: "—", likes: "—", status: "Scheduled", date: "Jul 22, 2026" },
];

function Badge({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "warn" | "muted" }) {
  const tones = {
    default: "bg-primary/12 text-primary",
    warn: "bg-[#e0a83f]/15 text-[#e0a83f]",
    muted: "bg-white/[0.06] text-muted-foreground",
  };
  return <span className={`${tones[tone]} text-[11.5px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap`}>{children}</span>;
}

function MiniWave({ active }: { active: boolean }) {
  return (
    <div className="flex gap-0.5 items-center h-4">
      {[8, 14, 6, 12].map((h, i) => (
        <div
          key={i}
          className="w-[2.5px] rounded-sm"
          style={{
            background: active ? GREEN : "rgba(255,255,255,0.15)",
            height: h,
            animation: active ? `eq 0.9s ease-in-out ${i * 0.12}s infinite alternate` : "none",
          }}
        />
      ))}
    </div>
  );
}

export default function MusicPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All" | Status>("All");
  const [sort, setSort] = useState<"Recent" | "Most played" | "Alphabetical">("Recent");
  const [playing, setPlaying] = useState<number | null>(null);

  const filtered = useMemo(() => {
    let list = TRACKS.filter((t) => t.title.toLowerCase().includes(query.toLowerCase()));
    if (status !== "All") list = list.filter((t) => t.status === status);
    if (sort === "Alphabetical") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "Most played") list = [...list].sort((a, b) => parseFloat(b.plays) - parseFloat(a.plays) || 0);
    return list;
  }, [query, status, sort]);

  const current = TRACKS.find((t) => t.id === playing);

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`@keyframes eq { from { transform: scaleY(0.5);} to { transform: scaleY(1.3);} }`}</style>
      <DashboardNav active="Music" />
      <div className="max-w-[1180px] mx-auto px-6 py-8 pb-16">
        <div className="flex justify-between items-end mb-7 flex-wrap gap-3.5">
          <div>
            <h1 className="text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 34, fontWeight: 800, textTransform: "uppercase", lineHeight: 1 }}>
              Music
            </h1>
            <p className="text-muted-foreground text-[13.5px] mt-1.5">Manage your releases, drafts, and scheduled drops</p>
          </div>
          <button className="flex items-center gap-2 px-[18px] py-2.5 rounded-full bg-primary text-white font-semibold text-[13.5px] hover:bg-[#13786a] transition-colors">
            <Upload size={15} /> Upload track
          </button>
        </div>

        <div className="flex gap-2.5 mb-4.5 flex-wrap">
          <div className="flex items-center gap-2 bg-card border border-border rounded-[10px] px-3 py-2.5 flex-1 min-w-[220px]">
            <Search size={14} className="text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tracks"
              className="bg-transparent border-none outline-none text-foreground text-sm w-full"
            />
          </div>
          {(["All", "Published", "Draft", "Scheduled"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-3.5 py-2 rounded-full text-xs font-semibold border transition-colors ${
                status === s ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground"
              }`}
            >
              {s}
            </button>
          ))}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="ml-auto bg-card border border-border rounded-[10px] text-foreground text-xs px-2.5 py-2"
          >
            <option>Recent</option>
            <option>Most played</option>
            <option>Alphabetical</option>
          </select>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {filtered.length === 0 && <div className="p-7 text-center text-muted-foreground text-sm">No tracks match your filters.</div>}
          {filtered.map((t, i) => (
            <div
              key={t.id}
              className={`grid grid-cols-[36px_2.2fr_1fr_0.8fr_0.8fr_0.9fr_90px] items-center gap-3 px-[18px] py-3.5 ${i > 0 ? "border-t border-border" : ""}`}
            >
              <button
                onClick={() => setPlaying(playing === t.id ? null : (t.status === "Published" ? t.id : playing))}
                disabled={t.status !== "Published"}
                className="w-[30px] h-[30px] rounded-full flex items-center justify-center disabled:opacity-40"
                style={{ background: playing === t.id ? GREEN : "rgba(22,137,120,0.12)", color: playing === t.id ? "#fff" : GREEN }}
              >
                {playing === t.id ? <Pause size={13} /> : <Play size={13} className="ml-0.5" />}
              </button>
              <div>
                <div className="text-[13.5px] text-white font-medium">{t.title}</div>
                <div className="text-[11.5px] text-muted-foreground">{t.album}</div>
              </div>
              <span className="text-xs text-muted-foreground">{t.duration}</span>
              <span className="text-xs text-muted-foreground">{t.plays}</span>
              <span className="text-xs text-muted-foreground">{t.likes}</span>
              <Badge tone={t.status === "Published" ? "default" : t.status === "Scheduled" ? "warn" : "muted"}>{t.status}</Badge>
              <MiniWave active={playing === t.id} />
            </div>
          ))}
        </div>

        {current && (
          <div className="sticky bottom-4 mt-4 bg-[#0e1615] border rounded-[14px] px-[18px] py-3 flex items-center gap-3.5" style={{ borderColor: `${GREEN}55` }}>
            <MiniWave active />
            <div className="flex-1">
              <div className="text-[13px] text-white font-medium">{current.title}</div>
              <div className="text-[11px] text-muted-foreground">Now playing (demo)</div>
            </div>
            <button onClick={() => setPlaying(null)} className="bg-primary border-none text-white rounded-full w-[30px] h-[30px] flex items-center justify-center">
              <Pause size={13} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
