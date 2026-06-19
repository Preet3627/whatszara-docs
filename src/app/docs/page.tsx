import Link from "next/link";
import { BookOpen, Cpu, Shield, Terminal, Layers, Globe, Download, Zap, FileText, ArrowRight } from "lucide-react";

const sections = [
  { href: "/docs/getting-started", label: "Getting Started", icon: Zap,
    desc: "Set up Whatszara in under a minute — no Python required." },
  { href: "/docs/architecture", label: "Architecture", icon: Layers,
    desc: "Two-component architecture: Go WhatsApp bridge + Tauri desktop app." },
  { href: "/docs/components", label: "Components", icon: Cpu,
    desc: "Every Rust module explained: policy, actions, LLM, orchestrator, undo." },
  { href: "/docs/features", label: "Features", icon: Globe,
    desc: "Complete feature overview: multi-LLM, per-tool permissions, allowlist, contact modes." },
  { href: "/docs/permissions", label: "Policy & Permissions", icon: Shield,
    desc: "Propose → Evaluate → Execute: structured actions, risk profiles, allowlist." },
  { href: "/docs/ui", label: "Frontend UI", icon: Terminal,
    desc: "Tauri dashboard: provider config, policy editor, action log." },
  { href: "/docs/releases", label: "Releases & Downloads", icon: Download,
    desc: "Download for macOS, Windows, Linux. Release notes and changelog." },
];

export default function DocsOverview() {
  return (
    <div>
      <div className="mb-16">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">
          <BookOpen size={14} /> Documentation
        </div>
        <h1 className="text-6xl font-black uppercase tracking-tighter sm:text-7xl">Whatszara Docs</h1>
        <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/40">
          Everything you need to know about Whatszara — from setup to architecture to every component.
          No Python required. Built with Rust + Go.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {sections.map((section) => (
          <Link key={section.href} href={section.href}
                className="group rounded-[45px] border border-white/5 bg-[#0a0c10]/50 p-10 transition-all hover:bg-[#0a0c10]/80 hover:border-white/10">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
              <section.icon size={28} />
            </div>
            <h3 className="mb-3 text-xl font-black uppercase tracking-[0.1em]">{section.label}</h3>
            <p className="text-base font-medium leading-relaxed text-white/40">{section.desc}</p>
            <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
              Read <ArrowRight size={14} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
