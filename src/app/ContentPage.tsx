import { useState } from "react";
import { Plus, Music2, Video, Mic, FileText } from "lucide-react";
import DashboardNav from "./DashboardNav";

type ItemType = "Music" | "Video" | "Podcast" | "Post";
type Status = "Published" | "Draft" | "Scheduled";

const ICONS: Record<ItemType, any> = { Music: Music2, Video: Video, Podcast: Mic, Post: FileText };

const CONTENT_ITEMS: { id: number; title: string; type: ItemType; status: Status; stat: string; date: string }[] = [
  { id: 1, title: "Afterglow EP", type: "Music", status: "Published", stat: "482K plays", date: "Jun 2" },
  { id: 2, title: "Behind the Booth", type: "Video", status: "Published", stat: "112K views", date: "Jun 9" },
  { id: 3, title: "Studio Diaries Ep. 12", type: "Podcast", status: "Published", stat: "96K listens", date: "Jun 11" },
  { id: 4, title: "Tour Announcement", type: "Post", status: "Scheduled", stat: "Goes live Jul 20", date: "Jul 20" },
  { id: 5, title: "Halflight (Demo)", type: "Music", status: "Draft", stat: "Not published", date: "—" },
  { id: 6, title: "Q&A Livestream Recap", type: "Video", status: "Draft", stat: "Not published", date: "—" },
];

function Badge({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "warn" | "muted" }) {
  const tones = {
    default: "bg-primary/12 text-primary",
    warn: "bg-[#e0a83f]/15 text-[#e0a83f]",
    muted: "bg-white/[0.06] text-muted-foreground",
  };
  return <span className={`${tones[tone]} text-[11.5px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap`}>{children}</span>;
}

export default function ContentPage() {
  const [filter, setFilter] = useState<"All" | ItemType>("All");
  const types: ("All" | ItemType)[] = ["All", "Music", "Video", "Podcast", "Post"];
  const filtered = filter === "All" ? CONTENT_ITEMS : CONTENT_ITEMS.filter((c) => c.type === filter);

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
      <DashboardNav active="Content" />
      <div className="max-w-[1180px] mx-auto px-6 py-8 pb-16">
        <div className="flex justify-between items-end mb-7 flex-wrap gap-3.5">
          <div>
            <h1 className="text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 34, fontWeight: 800, textTransform: "uppercase", lineHeight: 1 }}>
              Content
            </h1>
            <p className="text-muted-foreground text-[13.5px] mt-1.5">Everything you've published, scheduled, or drafted</p>
          </div>
          <button className="flex items-center gap-2 px-[18px] py-2.5 rounded-full bg-primary text-white font-semibold text-[13.5px] hover:bg-[#13786a] transition-colors">
            <Plus size={15} /> Create content
          </button>
        </div>

        <div className="flex gap-2 mb-5 flex-wrap">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition-colors ${
                filter === t ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid gap-3.5" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))" }}>
          {filtered.map((c) => {
            const Icon = ICONS[c.type];
            return (
              <div key={c.id} className="bg-card border border-border rounded-2xl p-[18px]">
                <div className="flex justify-between items-start mb-3.5">
                  <div className="w-[38px] h-[38px] rounded-[10px] bg-primary/15 flex items-center justify-center">
                    <Icon size={17} className="text-primary" />
                  </div>
                  <Badge tone={c.status === "Published" ? "default" : c.status === "Scheduled" ? "warn" : "muted"}>{c.status}</Badge>
                </div>
                <div className="text-[15px] text-white font-semibold mb-1">{c.title}</div>
                <div className="text-xs text-muted-foreground mb-3.5">{c.type} · {c.date}</div>
                <div className="text-[12.5px] font-semibold text-primary border-t border-border pt-2.5">{c.stat}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
