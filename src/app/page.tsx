"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { APP_INFO } from "@/lib/version";
import { GitHubRelease, getReleaseDownloadLinks } from "@/lib/github-release";
import {
  Bot, MessageSquare, ShieldCheck, Layers, ArrowRight, ExternalLink,
  Globe, Cpu, Github, Download, BookOpen, Zap, CheckCircle2,
  ChevronRight, Monitor, Smartphone, Star, GitPullRequest,
  Terminal, FileText, Users, Video, Volume2, Music,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";

const tabDetails = [
  {
    id: "how-to-use",
    title: "How to Use",
    label: "Start in seconds",
    summary: "From setup to first command — Whatszara gets you running in under a minute. No Python required, zero configuration needed.",
    bullets: [
      "Start the WhatsApp bridge with a single command — scan the QR code with your phone to link WhatsApp.",
      "Add your WhatsApp number to the allowlist in the Permissions tab — only approved contacts can control the assistant.",
      "Send a WhatsApp message — the LLM interprets it, the policy engine validates it, and your desktop obeys."
    ]
  },
  {
    id: "docs",
    title: "Documentation",
    label: "Everything explained",
    summary: "Comprehensive docs covering every component — from the policy engine to the action system to the LLM provider abstraction.",
    bullets: [
      "Propose → Evaluate → Execute: every action is validated against per-tool permissions, allowlist, and contact modes before it runs.",
      "6 LLM providers supported: Ollama (local), Claude, Groq, Grok, Gemini, Vercel AI SDK — all in Rust, zero Python.",
      "Structured action types with automatic undo journal — reverse volume changes, pause music, and more with a single command."
    ]
  },
  {
    id: "platform",
    title: "Platform Overview",
    label: "Architecture at a glance",
    summary: "Two-component architecture: a Go WhatsApp bridge communicating with a Tauri desktop app (Rust). No interpreters, no virtualenvs, no pip.",
    bullets: [
      "WhatsApp Bridge (Go + whatsmeow): handles WebSocket connection, QR auth, message storage in SQLite.",
      "Desktop App (Tauri + Rust): LLM providers, policy engine, action executors, undo journal, and GUI.",
      "Shell disabled by default: you must explicitly enable it. Every tool category (shell, file, media, apps, WhatsApp) is independently toggleable."
    ]
  }
];

const featureHighlights = [
  {
    name: "WhatsApp-Powered",
    description: "Control your desktop from any phone via WhatsApp messages. No app to install — it works where you already chat.",
    icon: MessageSquare,
    color: "from-emerald-500/20 to-green-500/20",
    glow: "rgba(37, 211, 102, 0.4)"
  },
  {
    name: "Multi-LLM Engine",
    description: "6 providers: Ollama (local), Claude, Groq, Grok, Gemini, Vercel AI SDK. Live model list fetching. Switch providers at runtime.",
    icon: Bot,
    color: "from-sky-500/20 to-blue-500/20",
    glow: "rgba(56, 189, 248, 0.4)"
  },
  {
    name: "Policy Layer",
    description: "Propose → Evaluate → Execute. Per-tool permissions, WhatsApp account allowlist, 3 risk profiles with CAPTCHA verification.",
    icon: ShieldCheck,
    color: "from-purple-500/20 to-pink-500/20",
    glow: "rgba(168, 85, 247, 0.4)"
  },
  {
    name: "Structured Actions",
    description: "No free-form shell. Actions are typed: open_app, set_volume, play_media, send_file. Shell is disabled by default for safety.",
    icon: Layers,
    color: "from-indigo-500/20 to-blue-500/20",
    glow: "rgba(99, 102, 241, 0.4)"
  },
  {
    name: "Undo Journal",
    description: "Every action is logged with a reverse action. Undo volume changes, pause music, revert file operations with one command.",
    icon: Music,
    color: "from-amber-500/20 to-yellow-500/20",
    glow: "rgba(245, 158, 11, 0.4)"
  },
  {
    name: "Zero Python",
    description: "100% Rust + Go. No interpreters, no virtualenvs, no pip. One-click setup.sh installs everything — just Go, Node, and Rust.",
    icon: Zap,
    color: "from-rose-500/20 to-pink-500/20",
    glow: "rgba(244, 114, 182, 0.4)"
  }
];

const metrics = [
  { label: "LLM Providers", value: "6" },
  { label: "Tool Categories", value: "5" },
  { label: "Risk Profiles", value: "3" },
  { label: "Languages", value: "2" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState(tabDetails[0].id);
  const currentTab = useMemo(() => tabDetails.find((tab) => tab.id === activeTab) ?? tabDetails[0], [activeTab]);
  const [latestRelease, setLatestRelease] = useState<GitHubRelease | null>(null);
  const [githubStats, setGithubStats] = useState({ stars: 0, forks: 0, open_issues: 0, contributors: 0, pull_requests: 0 });

  useEffect(() => {
    fetch("https://api.github.com/repos/Preet3627/whatszara/releases/latest")
      .then(res => res.json())
      .then(data => setLatestRelease(data))
      .catch(() => {});

    Promise.all([
      fetch("https://api.github.com/repos/Preet3627/whatszara").then(res => res.json()),
      fetch("https://api.github.com/repos/Preet3627/whatszara/contributors?per_page=100").then(res => res.json()),
      fetch("https://api.github.com/search/issues?q=repo:Preet3627/whatszara+is:pr").then(res => res.json())
    ])
    .then(([repoData, contributorsData, prData]) => {
      setGithubStats({
        stars: repoData.stargazers_count || 0,
        forks: repoData.forks_count || 0,
        open_issues: repoData.open_issues_count || 0,
        contributors: Array.isArray(contributorsData) ? contributorsData.length : 0,
        pull_requests: prData.total_count || 0
      });
    })
    .catch(() => {});
  }, []);

  const downloadLinks = useMemo(() => {
    return getReleaseDownloadLinks(latestRelease).map((item) => ({
      ...item,
      icon: item.platform === "windows" ? Monitor : item.platform === "linux" ? Terminal : Monitor,
    }));
  }, [latestRelease]);

  return (
    <div className="relative min-h-screen bg-[#03040b] font-outfit text-white selection:bg-emerald-500/30">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] left-1/2 aspect-square w-[120vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(37,211,102,0.12)_0%,transparent_70%)] blur-[100px]" />
        <div className="absolute top-[20%] -left-[10%] aspect-square w-[50vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08)_0%,transparent_60%)] blur-[80px]" />
        <div className="absolute bottom-[10%] -right-[10%] aspect-square w-[60vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08)_0%,transparent_60%)] blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
             style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <Navbar />

      <main className="relative z-10 mx-auto max-w-7xl px-6 sm:px-12 lg:px-16">

        {/* HERO */}
        <section className="flex min-h-screen flex-col items-center justify-center pt-32 pb-20 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                      className="mb-8 flex items-center gap-3 rounded-full border border-white/5 bg-white/5 px-5 py-2">
            <div className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">
              {latestRelease ? `Release ${latestRelease.tag_name}` : "Initializing..."}
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                     className="max-w-6xl text-7xl font-black uppercase leading-[0.85] tracking-tighter text-white sm:text-8xl lg:text-[11rem]">
            YOUR DESKTOP, <br />
            <span className="bg-gradient-to-r from-emerald-400 via-sky-400 to-purple-400 bg-clip-text text-transparent">ON WHATSAPP.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="mt-16 max-w-3xl text-xl font-medium leading-relaxed text-white/40 sm:text-2xl">
            A desktop assistant controlled via WhatsApp messages. Talk to an LLM through WhatsApp,
            and it executes commands on your desktop — shell, apps, media, file access — with a secure permission system.
            <br />
            <span className="mt-4 block text-sm font-black uppercase tracking-[0.4em] text-white/20">
              Built by <span className="text-emerald-400">Preet3627 (Latestinssan)</span> — MIT Licensed
            </span>
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                      className="mt-16 flex flex-wrap items-center justify-center gap-6">
            <a href="#downloads"
               className="group flex items-center gap-4 rounded-[2.5rem] bg-white px-12 py-7 text-sm font-black uppercase tracking-[0.2em] text-black transition hover:bg-emerald-400 hover:text-white">
              Get Whatszara <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </a>
            <Link href="/docs"
                  className="flex items-center gap-4 rounded-[2.5rem] border border-white/10 bg-white/5 px-12 py-7 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:bg-white/10">
              Explore Docs
            </Link>
            <a href={APP_INFO.github} target="_blank"
               className="flex items-center gap-4 rounded-[2.5rem] border border-emerald-500/20 bg-emerald-500/5 px-12 py-7 text-sm font-black uppercase tracking-[0.2em] text-emerald-400 transition hover:bg-emerald-500/20">
              <Cpu size={18} /> View Source
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                      className="mt-28 grid w-full max-w-4xl grid-cols-2 gap-5 sm:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="group relative overflow-hidden rounded-[36px] border border-white/5 bg-white/5 p-9 text-left transition hover:bg-white/10">
                <div className="absolute -right-6 -top-6 opacity-[0.02] transition-transform group-hover:scale-125">
                  <Zap size={120} />
                </div>
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">{metric.label}</p>
                <h4 className="text-4xl font-black text-emerald-400">{metric.value}</h4>
              </div>
            ))}
          </motion.div>
        </section>

        {/* FEATURES */}
        <section id="features" className="py-40 scroll-mt-24">
          <div className="mb-24 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">
              <Cpu size={14} /> Core Technologies
            </div>
            <h2 className="text-5xl font-black uppercase tracking-tighter sm:text-6xl lg:text-8xl">
              Everything <br /> <span className="text-white/20">You Need.</span>
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featureHighlights.map((feature, i) => (
              <motion.div key={feature.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                          className="group relative rounded-[45px] border border-white/5 bg-[#0a0c10]/50 p-12 transition-all hover:bg-[#0a0c10]/80 hover:border-white/10">
                <div className={`mb-10 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-gradient-to-br ${feature.color} text-white shadow-2xl`}>
                  <feature.icon size={36} />
                </div>
                <h3 className="mb-5 text-2xl font-black uppercase tracking-[0.1em] text-white leading-tight">{feature.name}</h3>
                <p className="text-base font-medium leading-relaxed text-white/40">{feature.description}</p>
                <div className="mt-10 flex items-center gap-3 text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ArrowRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* GITHUB */}
        <section id="github" className="py-40">
          <div className="rounded-[60px] border border-white/5 bg-gradient-to-br from-[#0a0c14]/60 to-transparent p-12 lg:p-24 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/[0.03] blur-[120px] rounded-full sm:block hidden" />

            <div className="grid gap-20 lg:grid-cols-2 items-center">
              <div>
                <div className="mb-10 inline-flex items-center gap-4 rounded-3xl bg-white/5 p-4 text-white ring-1 ring-white/10 shadow-2xl">
                  <Github size={40} />
                </div>
                <h2 className="mb-8 text-5xl font-black uppercase tracking-tighter text-white sm:text-7xl lg:text-8xl leading-[0.85]">
                  Open <br /> <span className="text-white/20">Source.</span>
                </h2>
                <p className="mb-12 text-xl font-medium leading-relaxed text-white/40 max-w-xl">
                  Built for the community, by the community. Audit every line of code,
                  contribute new features, or deploy your own private instance.
                </p>
                <div className="flex flex-wrap gap-5">
                  <a href={APP_INFO.github} target="_blank"
                     className="flex items-center gap-4 rounded-full bg-white/5 px-10 py-5 text-xs font-black uppercase tracking-[0.3em] text-white transition hover:bg-white/10">
                    View Source <ExternalLink size={18} />
                  </a>
                  <a href={`${APP_INFO.github}/fork`} target="_blank"
                     className="flex items-center gap-4 rounded-full border border-white/10 px-10 py-5 text-xs font-black uppercase tracking-[0.3em] text-white/40 transition hover:border-white hover:text-white">
                    Fork Project <GitPullRequest size={18} />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                {[
                  { icon: Star, label: "Stars", value: githubStats.stars, color: "text-amber-400" },
                  { icon: Users, label: "Contributors", value: githubStats.contributors, color: "text-emerald-400" },
                  { icon: GitPullRequest, label: "Pull Requests", value: githubStats.pull_requests, color: "text-sky-400" },
                  { icon: MessageSquare, label: "Issues", value: githubStats.open_issues, color: "text-purple-400" },
                ].map((stat, i) => (
                  <div key={i} className="rounded-[3rem] border border-white/5 bg-[#03040b]/60 p-10 hover:border-white/10 transition">
                    <div className="mb-4 flex items-center justify-between">
                      <stat.icon size={24} className={stat.color} />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/15">{stat.label}</span>
                    </div>
                    <h5 className="text-4xl font-black">{stat.value}</h5>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* DOWNLOADS */}
        <section id="downloads" className="py-40 scroll-mt-24">
          <div className="mb-24 flex flex-col items-center justify-between gap-10 md:flex-row">
            <h2 className="text-5xl font-black uppercase tracking-tighter sm:text-6xl lg:text-8xl">
              Download <br /> <span className="text-white/20">Whatszara.</span>
            </h2>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-400 mb-2">Build Environment</p>
              <h4 className="text-2xl font-black">{latestRelease?.tag_name || 'v0.1.0'}</h4>
              <p className="text-xs font-bold text-white/20 uppercase tracking-widest mt-1">macOS universal + Windows + Linux</p>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {downloadLinks.length > 0 ? downloadLinks.map((item, i) => (
              <motion.a key={item.label} href={item.link} initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                        className="group relative h-72 flex flex-col justify-between rounded-[50px] border border-white/5 bg-[#0a0c10]/40 p-10 transition-all hover:bg-white/5 hover:-translate-y-2">
                <div>
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-white/40 ring-1 ring-white/10 transition-colors group-hover:text-emerald-400 group-hover:ring-emerald-500/30">
                    <item.icon size={28} />
                  </div>
                  <h3 className="mb-3 text-xl font-black uppercase tracking-[0.2em]">{item.label}</h3>
                  <p className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400/70">{item.arch}</p>
                  <p className="text-[11px] text-white/20 font-medium truncate max-w-full">{item.file}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400/60">Verified</span>
                  </div>
                  <Download size={22} className="text-white/10 group-hover:text-emerald-400" />
                </div>
              </motion.a>
            )) : (
              [1,2,3].map((i) => (
                <div key={i} className="animate-pulse rounded-[50px] border border-white/5 bg-white/5 p-10 h-72" />
              ))
            )}
          </div>
        </section>

        {/* DOCS TABBED */}
        <section id="docs" className="py-40 scroll-mt-24">
          <div className="overflow-hidden rounded-[60px] border border-white/5 bg-gradient-to-br from-[#0a0c14] to-[#04060b] shadow-[0_50px_100px_rgba(0,0,0,0.6)]">
            <div className="grid lg:grid-cols-[1.2fr_2fr]">
              <div className="border-b border-white/5 p-16 lg:border-b-0 lg:border-r">
                <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-400 shadow-2xl">
                  <BookOpen size={32} />
                </div>
                <h2 className="mb-10 text-5xl font-black uppercase tracking-tighter text-white sm:text-6xl">Engine <br /> Manual.</h2>

                <div className="space-y-3">
                  {tabDetails.map((tab) => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                            className={`group flex w-full items-center justify-between rounded-3xl px-8 py-5 text-left transition-all ${
                              activeTab === tab.id ? "bg-white text-black shadow-2xl" : "text-white/40 hover:bg-white/5 hover:text-white"
                            }`}>
                      <span className="text-[12px] font-black uppercase tracking-[0.3em]">{tab.title}</span>
                      <ChevronRight size={16} className={`transition-transform ${activeTab === tab.id ? "rotate-90" : "group-hover:translate-x-1"}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-16 lg:p-28">
                <AnimatePresence mode="wait">
                  <motion.div key={currentTab.id} initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
                    <p className="mb-3 text-[10px] font-black uppercase tracking-[0.6em] text-emerald-400">{currentTab.label}</p>
                    <h3 className="mb-10 text-5xl font-black text-white leading-tight">{currentTab.title}</h3>
                    <p className="mb-14 text-xl font-medium leading-relaxed text-white/40">{currentTab.summary}</p>
                    <div className="grid gap-6">
                      {currentTab.bullets.map((bullet, i) => (
                        <div key={i} className="flex gap-6 rounded-[2.5rem] border border-white/5 bg-white/[0.03] p-8 hover:bg-white/[0.05] transition-colors group">
                          <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                            <CheckCircle2 size={16} />
                          </div>
                          <span className="text-base font-medium leading-relaxed text-white/60">{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/5 pt-40 pb-20">
          <div className="grid gap-20 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <div className="mb-10 flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-2xl shadow-lg shadow-emerald-500/20">
                  <img src="/icon.png" alt="Whatszara Logo" className="h-full w-full object-cover" />
                </div>
                <span className="text-2xl font-black uppercase tracking-tighter">{APP_INFO.fullName}</span>
              </div>
              <p className="max-w-md text-lg font-medium leading-relaxed text-white/30">
                Your desktop, controlled via WhatsApp. No Python required. Built with Rust + Go.
              </p>
            </div>

            <div>
              <h5 className="mb-8 text-[11px] font-black uppercase tracking-[0.5em] text-white/20">Ecosystem</h5>
              <ul className="space-y-5 text-xs font-black uppercase tracking-widest text-white/40">
                <li><Link href="/docs" className="hover:text-emerald-400 transition">Documentation</Link></li>
                <li><a href={APP_INFO.github} className="hover:text-emerald-400 transition">GitHub</a></li>
                <li><a href={`${APP_INFO.github}/releases`} className="hover:text-emerald-400 transition">Releases</a></li>
                <li><a href={`${APP_INFO.github}/issues`} className="hover:text-emerald-400 transition">Issues</a></li>
              </ul>
            </div>

            <div>
              <h5 className="mb-8 text-[11px] font-black uppercase tracking-[0.5em] text-white/20">Support</h5>
              <ul className="space-y-5 text-xs font-black uppercase tracking-widest text-white/40">
                <li><Link href="/docs" className="hover:text-emerald-400 transition">Documentation</Link></li>
                <li><a href={`${APP_INFO.github}/issues/new`} className="hover:text-emerald-400 transition">Report Bug</a></li>
                <li><a href={`${APP_INFO.github}/security`} className="hover:text-emerald-400 transition">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-40 flex flex-col items-center justify-between gap-10 border-t border-white/5 pt-20 md:flex-row">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-black uppercase tracking-[0.5em] text-white/10">              © 2026 Whatszara by Preet3627 (Latestinssan). MIT Licensed.</p>
              <p className="text-[10px] font-bold text-white/5 uppercase tracking-[0.3em]">
                Based on <a href="https://github.com/lharries/whatsapp-mcp" className="text-white/20 hover:text-white">whatsapp-mcp</a> by Luke Harries
              </p>
            </div>
            <div className="flex items-center gap-10">
              <a href={APP_INFO.github} className="text-white/20 hover:text-white transition transform hover:scale-110"><Github size={24} /></a>
              <div className="flex h-12 px-6 items-center rounded-2xl bg-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ring-1 ring-white/10">
                v{latestRelease?.tag_name?.replace('v', '') || '0.1.0'}
              </div>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}
