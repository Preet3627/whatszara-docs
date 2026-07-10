"use client";

import { useState, useEffect } from "react";
import { Download, Github, Tag } from "lucide-react";

interface Release {
  tag_name: string;
  name: string;
  published_at: string;
  body: string;
  html_url: string;
}

export default function Releases() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("https://api.github.com/repos/Preet3627/whatszara-docs/releases"),
      fetch("https://api.github.com/repos/Preet3627/whatszara/releases"),
    ]).then(async ([docsRes, appRes]) => {
      let all: Release[] = [];
      try { const d = await docsRes.json(); if (Array.isArray(d)) all = all.concat(d); } catch {}
      try { const a = await appRes.json(); if (Array.isArray(a)) all = all.concat(a); } catch {}
      all.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
      setReleases(all.slice(0, 10));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <article className="space-y-12">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-amber-400">
        History
      </div>
      <h1 className="text-5xl font-black uppercase tracking-tighter sm:text-6xl">Releases</h1>
      <p className="text-xl font-medium leading-relaxed text-white/40">
        Release history for Whatszara Docs and the Whatszara app. Built via GitHub Actions CI.
      </p>

      <div className="flex gap-4">
        <a href="https://github.com/Preet3627/whatszara-docs/releases" target="_blank"
           className="flex items-center gap-3 rounded-full bg-white/5 px-8 py-4 text-xs font-black uppercase tracking-[0.3em] text-white transition hover:bg-white/10">
          <Download size={16} /> Docs Releases
        </a>
        <a href="https://github.com/Preet3627/whatszara/releases" target="_blank"
           className="flex items-center gap-3 rounded-full border border-white/10 px-8 py-4 text-xs font-black uppercase tracking-[0.3em] text-white/40 transition hover:border-white">
          <Download size={16} /> App Releases
        </a>
        <a href="https://github.com/Preet3627/whatszara-docs" target="_blank"
           className="flex items-center gap-3 rounded-full border border-white/10 px-8 py-4 text-xs font-black uppercase tracking-[0.3em] text-white/40 transition hover:border-white">
          <Github size={16} /> Docs GitHub
        </a>
      </div>

      <div className="space-y-6">
        {loading ? (
          [1,2,3].map(i => (
            <div key={i} className="animate-pulse rounded-[40px] border border-white/5 bg-white/5 p-10 h-48" />
          ))
        ) : releases.length === 0 ? (
          <p className="text-white/40 text-lg">No releases found. Check back soon!</p>
        ) : (
          releases.map((release) => (
            <div key={release.tag_name} className="rounded-[40px] border border-white/5 bg-[#0a0c10]/50 p-10 hover:bg-[#0a0c10]/80 transition">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <Tag size={18} className="text-emerald-400" />
                    <h3 className="text-2xl font-black uppercase tracking-tight">{release.tag_name}</h3>
                  </div>
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/20">
                    {new Date(release.published_at).toLocaleDateString("en-US", {
                      year: "numeric", month: "long", day: "numeric"
                    })}
                  </p>
                </div>
                <a href={release.html_url} target="_blank"
                   className="flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:border-white transition">
                  View <Download size={14} />
                </a>
              </div>
              <div className="prose prose-invert max-w-none text-white/60 text-sm leading-relaxed whitespace-pre-line">
                {release.body?.split('\n').slice(0, 20).join('\n') || 'No release notes.'}
              </div>
            </div>
          ))
        )}
      </div>
    </article>
  );
}
