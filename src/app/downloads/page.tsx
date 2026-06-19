"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Monitor, Terminal, Download, ArrowLeft, ChevronRight } from "lucide-react";
import { GitHubRelease, getReleaseDownloadLinks } from "@/lib/github-release";

export default function Downloads() {
  const [latestRelease, setLatestRelease] = useState<GitHubRelease | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/Preet3627/whatszara/releases/latest")
      .then(res => res.json())
      .then(data => setLatestRelease(data))
      .catch(() => {});
  }, []);

  const downloadLinks = useMemo(() => {
    return getReleaseDownloadLinks(latestRelease).map((item) => ({
      ...item,
      icon: item.platform === "windows" ? Monitor : item.platform === "linux" ? Terminal : Monitor,
    }));
  }, [latestRelease]);

  return (
    <div className="min-h-screen bg-[#03040b]">
      <nav className="fixed left-0 top-0 z-50 w-full bg-[#03040b]/80 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 sm:px-12">
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/icon.png" alt="W" className="h-8 w-8 rounded-lg" />
            <span className="text-lg font-black uppercase tracking-tighter">Whatszara</span>
          </Link>
          <ChevronRight size={14} className="text-white/20" />
          <span className="text-sm font-black uppercase tracking-widest text-emerald-400">Downloads</span>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-16 pt-32 pb-40">
        <Link href="/#downloads" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-emerald-400 transition mb-12">
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <div className="mb-16">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">
            <Download size={14} /> Downloads
          </div>
          <h1 className="text-6xl font-black uppercase tracking-tighter sm:text-7xl">Download Whatszara</h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/40">
            {latestRelease ? `Version ${latestRelease.tag_name}` : "Latest release"} — Available for macOS, Windows, and Linux.
            No Python required.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {downloadLinks.length > 0 ? downloadLinks.map((item, i) => (
            <motion.a key={item.key} href={item.link} initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                      className="group relative h-80 flex flex-col justify-between rounded-[50px] border border-white/5 bg-[#0a0c10]/40 p-12 transition-all hover:bg-white/5 hover:-translate-y-2">
              <div>
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-white/40 ring-1 ring-white/10 transition-colors group-hover:text-emerald-400 group-hover:ring-emerald-500/30">
                  <item.icon size={32} />
                </div>
                <h3 className="mb-4 text-2xl font-black uppercase tracking-[0.1em]">{item.label}</h3>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-emerald-400/70">{item.arch}</p>
                <p className="text-sm text-white/20 font-medium truncate max-w-full font-mono">{item.file}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400/60">Verified Build</span>
                </div>
                <Download size={24} className="text-white/10 group-hover:text-emerald-400 transition" />
              </div>
            </motion.a>
          )) : (
            [1,2,3].map(i => (
              <div key={i} className="animate-pulse rounded-[50px] border border-white/5 bg-white/5 p-12 h-80" />
            ))
          )}
        </div>

        <div className="mt-32 rounded-[60px] border border-white/5 bg-gradient-to-br from-[#0a0c14]/60 to-transparent p-16">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-8">Other Ways to Get Whatszara</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-emerald-400 mb-4">Build from Source</h3>
              <pre className="rounded-3xl border border-white/5 bg-[#0a0c10] p-6 text-sm text-white/60 overflow-x-auto">
{`git clone https://github.com/Preet3627/whatszara.git
cd whatszara
./setup.sh
make desktop`}
              </pre>
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-sky-400 mb-4">GitHub Releases</h3>
              <p className="text-white/60 mb-6">All release assets including checksums and source code are available on GitHub.</p>
              <a href="https://github.com/Preet3627/whatszara/releases" target="_blank"
                 className="inline-flex items-center gap-3 rounded-full bg-white/5 px-8 py-4 text-xs font-black uppercase tracking-[0.3em] text-white transition hover:bg-white/10">
                <Download size={16} /> View All Releases
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
