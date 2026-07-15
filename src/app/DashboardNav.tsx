import { Play, BarChart2, Music2, LayoutGrid, ShieldQuestion } from "lucide-react";

const PAGES = [
  { name: "Analytics", icon: BarChart2, href: "/analytics" },
  { name: "Music", icon: Music2, href: "/music" },
  { name: "Content", icon: LayoutGrid, href: "/content" },
  { name: "Admin", icon: ShieldQuestion, href: "/admin" },
];

interface DashboardNavProps {
  active: "Analytics" | "Music" | "Content" | "Admin";
}

export default function DashboardNav({ active }: DashboardNavProps) {
  return (
    <nav className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-[1180px] mx-auto px-6 h-[60px] flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="w-[26px] h-[26px] rounded-full bg-primary flex items-center justify-center">
            <Play className="w-3 h-3 text-white fill-white ml-0.5" />
          </div>
          <span
            className="text-white font-semibold tracking-tight"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.1rem", letterSpacing: "0.05em" }}
          >
            now-play
          </span>
        </a>
        <div className="flex gap-1">
          {PAGES.map((p) => (
            <a
              key={p.name}
              href={p.href}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold transition-colors ${
                active === p.name ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <p.icon className="w-3.5 h-3.5" />
              {p.name}
            </a>
          ))}
        </div>
        <div className="w-8 h-8 rounded-full bg-white/[0.08]" />
      </div>
    </nav>
  );
}
