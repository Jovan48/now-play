import { useState, useEffect } from "react";
import { Play, BarChart2, MessageCircle, DollarSign, ChevronRight, Menu, X } from "lucide-react";

const CONCERT_IMG = "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop&auto=format";
const CONCERT_IMG2 = "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&h=600&fit=crop&auto=format";
const GAMING_IMG = "https://images.unsplash.com/photo-1626218174358-7769486c4b79?w=800&h=600&fit=crop&auto=format";
const PODCAST_IMG = "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=600&fit=crop&auto=format";

const stats = [
  { value: "2M+", label: "Active Creators" },
  { value: "140+", label: "Countries" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "$480M", label: "Creator Earnings" },
];

const features = [
  {
    icon: BarChart2,
    title: "Real-Time Insights",
    desc: "Track your audience with live analytics. Know what resonates, when to post, and who's watching.",
    stat: "↑ 3.4× avg. reach",
  },
  {
    icon: MessageCircle,
    title: "Boost Engagement",
    desc: "Connect with your fans through interactive polls, live Q&As, and direct messaging tools.",
    stat: "↑ 62% interaction",
  },
  {
    icon: DollarSign,
    title: "Monetize Content",
    desc: "Unlock subscriptions, tipping, brand deals, and merchandise — all in one creator dashboard.",
    stat: "↑ 5× revenue",
  },
];

const testimonials = [
  {
    name: "Aria Chen",
    role: "Music Producer · 1.2M followers",
    quote: "Now-Play changed how I connect with my audience. The analytics alone are worth everything.",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&auto=format",
  },
  {
    name: "Marcus Webb",
    role: "Gaming Streamer · 800K followers",
    quote: "I tripled my monthly revenue in 6 months. The monetization tools are genuinely the best in the space.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format",
  },
  {
    name: "Solène Dupont",
    role: "Podcast Host · 420K listeners",
    quote: "Finally a platform that treats creators like partners, not content machines.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&auto=format",
  },
];

function WaveformSVG() {
  return (
    <svg
      viewBox="0 0 1200 200"
      preserveAspectRatio="none"
      className="w-full h-full opacity-20"
      aria-hidden="true"
    >
      {Array.from({ length: 80 }).map((_, i) => {
        const h = 20 + Math.sin(i * 0.4) * 50 + Math.sin(i * 0.15) * 30 + Math.random() * 20;
        const x = (i / 80) * 1200;
        return (
          <rect
            key={i}
            x={x}
            y={100 - h / 2}
            width={10}
            height={h}
            rx={3}
            fill="#168978"
          />
        );
      })}
    </svg>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Play className="w-4 h-4 text-white fill-white ml-0.5" />
            </div>
            <span
              className="text-white font-semibold tracking-tight"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.25rem", letterSpacing: "0.05em" }}
            >
              now-play
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {["Overview", "Features", "Support"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {l}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Log In
            </a>
            <a
              href="#"
              className="px-5 py-2 rounded-full bg-primary text-white text-sm font-semibold hover:bg-[#13786a] transition-colors"
            >
              Sign Up
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-muted-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-background/98 border-b border-border px-6 py-6 flex flex-col gap-5">
            {["Overview", "Features", "Support"].map((l) => (
              <a key={l} href="#" className="text-foreground font-medium">
                {l}
              </a>
            ))}
            <hr className="border-border" />
            <a href="#" className="text-muted-foreground">Log In</a>
            <a href="#" className="px-5 py-2 rounded-full bg-primary text-white text-sm font-semibold text-center">
              Sign Up
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background gradient mesh */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f0e] via-[#0d1a18] to-[#0a0f0e]" />
          <div
            className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-10 blur-3xl"
            style={{ background: "radial-gradient(circle, #168978 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-8 blur-3xl"
            style={{ background: "radial-gradient(circle, #168978 0%, transparent 70%)" }}
          />
          {/* Waveform */}
          <div className="absolute bottom-0 left-0 right-0 h-48">
            <WaveformSVG />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#168978]/30 bg-[#168978]/10 text-[#168978] text-xs font-semibold mb-6 tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Now Live for Creators
            </div>
            <h1
              className="text-white leading-[0.9] mb-6"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
              }}
            >
              Take Your{" "}
              <span style={{ color: "#168978" }}>Content</span>{" "}
              to the Next Level
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-xl">
              Engage your audience like never before with Now-Play for Creators. The platform built for artists,
              streamers, and storytellers who refuse to be ordinary.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-white font-semibold hover:bg-[#13786a] transition-all hover:scale-105 active:scale-95"
              >
                Get Started Free
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full border border-border text-foreground font-semibold hover:border-[#168978]/50 transition-colors"
              >
                Watch Demo
                <Play className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* Image collage */}
          <div className="relative h-[480px] hidden lg:block">
            {/* Background card */}
            <div className="absolute top-10 right-0 w-[280px] h-[380px] rounded-2xl overflow-hidden border border-border shadow-2xl rotate-3">
              <img src={CONCERT_IMG} alt="Live concert crowd" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
            {/* Middle card */}
            <div className="absolute top-0 left-8 w-[260px] h-[340px] rounded-2xl overflow-hidden border border-border shadow-2xl -rotate-2">
              <img src={GAMING_IMG} alt="Gaming streaming setup" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
            </div>
            {/* Front card */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[240px] h-[300px] rounded-2xl overflow-hidden border border-[#168978]/40 shadow-2xl shadow-[#168978]/10 z-10">
              <img src={PODCAST_IMG} alt="Podcaster at microphone" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs text-[#168978] font-semibold">LIVE NOW</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div
                className="text-white mb-1"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "2.5rem", fontWeight: 800 }}
              >
                {s.value}
              </div>
              <div className="text-muted-foreground text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* VISUAL SHOWCASE — concert image full-bleed */}
      <section className="relative h-[520px] overflow-hidden">
        <img
          src={CONCERT_IMG2}
          alt="Band performing on stage in front of crowd"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 max-w-lg">
            <p
              className="text-[#168978] font-semibold uppercase tracking-widest text-sm mb-3"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              For Every Creator
            </p>
            <h2
              className="text-white leading-tight mb-4"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 800,
                textTransform: "uppercase",
              }}
            >
              One Platform.<br />Infinite Reach.
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Whether you{"'"}re a music artist, live streamer, or podcast creator — Now-Play gives you the
              tools to grow, engage, and earn.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-28 px-6 bg-background" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-primary uppercase tracking-widest text-sm font-semibold mb-3"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Built for Creators
            </p>
            <h2
              className="text-white"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 800,
                textTransform: "uppercase",
              }}
            >
              Everything You Need to Grow
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="relative group rounded-2xl border border-border bg-card p-8 hover:border-[#168978]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#168978]/5"
              >
                <div className="w-12 h-12 rounded-xl bg-[#168978]/15 flex items-center justify-center mb-6 group-hover:bg-[#168978]/25 transition-colors">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3
                  className="text-white mb-3"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.6rem", fontWeight: 700 }}
                >
                  {f.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{f.desc}</p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#168978]/10 text-primary text-xs font-semibold">
                  {f.stat}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="text-white"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 800,
                textTransform: "uppercase",
              }}
            >
              Creators Love Now-Play
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-border bg-background p-7 hover:border-[#168978]/30 transition-colors"
              >
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-border"
                  />
                  <div>
                    <div className="text-white text-sm font-semibold">{t.name}</div>
                    <div className="text-muted-foreground text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY CTA */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f0e] to-[#0d1f1c]" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, #168978, transparent 50%), radial-gradient(circle at 80% 20%, #168978, transparent 40%)`,
          }}
        />
        {/* Floating note icons */}
        <div className="absolute top-12 right-20 text-4xl opacity-10 select-none">♪</div>
        <div className="absolute bottom-16 left-16 text-5xl opacity-10 select-none">♫</div>
        <div className="absolute top-1/2 right-1/3 text-2xl opacity-5 select-none">♩</div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p
            className="text-primary uppercase tracking-widest text-sm font-semibold mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Join the Movement
          </p>
          <h2
            className="text-white mb-6"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 900,
              textTransform: "uppercase",
              lineHeight: "0.95",
            }}
          >
            Join Thousands of Creators
            <br />
            <span style={{ color: "#168978" }}>Growing with Now-Play</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Your audience is waiting. Your revenue is untapped. The only thing missing is the right platform.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-primary text-white font-bold text-lg hover:bg-[#13786a] transition-all hover:scale-105 active:scale-95"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
          >
            Sign Up for Free
            <ChevronRight className="w-5 h-5" />
          </a>
          <p className="text-muted-foreground text-sm mt-4">No credit card required · Cancel anytime</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-card py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
              <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
            </div>
            <span
              className="text-white font-semibold"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.1rem", letterSpacing: "0.05em" }}
            >
              now-play
            </span>
          </div>
          <nav className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            {["Overview", "Features", "Pricing", "Support", "Privacy", "Terms"].map((l) => (
              <a key={l} href="#" className="hover:text-foreground transition-colors">
                {l}
              </a>
            ))}
          </nav>
          <p className="text-muted-foreground text-xs">© 2026 Now-Play. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
