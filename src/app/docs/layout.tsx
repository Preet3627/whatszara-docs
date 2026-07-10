"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Cpu, Shield, Terminal, Layers, Globe, Download, FileText, Zap, ChevronRight, MessageSquare, Network } from "lucide-react";

const sidebarLinks = [
  { href: "/docs", label: "Overview", icon: BookOpen },
  { href: "/docs/getting-started", label: "Getting Started", icon: Zap },
  { href: "/docs/architecture", label: "Architecture", icon: Layers },
  { href: "/docs/components", label: "Components", icon: Cpu },
  { href: "/docs/features", label: "Features", icon: Globe },
  { href: "/docs/mesh-api", label: "Mesh API", icon: Network },
  { href: "/docs/chat-styles", label: "Chat Styles", icon: MessageSquare },
  { href: "/docs/permissions", label: "Policy & Permissions", icon: Shield },
  { href: "/docs/ui", label: "Frontend UI", icon: Terminal },
  { href: "/docs/releases", label: "Releases", icon: Download },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#03040b]">
      <nav className="fixed left-0 top-0 z-50 w-full bg-[#03040b]/80 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 sm:px-12">
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/icon.png" alt="W" className="h-8 w-8 rounded-lg" />
            <span className="text-lg font-black uppercase tracking-tighter">Whatszara</span>
          </Link>
          <ChevronRight size={14} className="text-white/20" />
          <Link href="/docs" className="text-sm font-black uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition">
            Docs
          </Link>
        </div>
      </nav>

      <div className="mx-auto flex max-w-7xl pt-20">
        <aside className="hidden w-72 shrink-0 border-r border-white/5 p-8 lg:block">
          <nav className="fixed flex flex-col gap-2">
            {sidebarLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link key={link.href} href={link.href}
                      className={`flex items-center gap-3 rounded-2xl px-5 py-4 text-[11px] font-black uppercase tracking-[0.2em] transition ${
                        active ? "bg-emerald-500/10 text-emerald-400" : "text-white/30 hover:text-white hover:bg-white/5"
                      }`}>
                  <link.icon size={16} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="min-h-screen flex-1 px-6 py-16 sm:px-12 lg:px-16">
          <div className="prose-custom max-w-4xl">
            {children}
          </div>
        </main>
      </div>

      <footer className="border-t border-white/5 py-12 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/10">
                    © 2026 Whatszara by Preet3627 (Latestinssan). MIT Licensed.
                  </p>
      </footer>
    </div>
  );
}
