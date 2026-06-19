export default function Architecture() {
  return (
    <article className="space-y-12">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-sky-400">
        Overview
      </div>
      <h1 className="text-5xl font-black uppercase tracking-tighter sm:text-6xl">Architecture</h1>
      <p className="text-xl font-medium leading-relaxed text-white/40">
        Two-component architecture: a Go WhatsApp bridge communicating with a Tauri desktop app written entirely in Rust.
      </p>

      <Section title="High-Level Diagram">
        <div className="rounded-[40px] border border-white/5 bg-[#0a0c10]/60 p-8 font-mono text-sm leading-loose text-white/60 overflow-x-auto">
{`┌──────────────────────────────────────────────────────────┐
│                   Whatszara                               │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────────┐     ┌──────────────────────────┐   │
│  │  WhatsApp Layer   │     │   Tauri Desktop App      │   │
│  │  (Go Bridge)      │────▶│                          │   │
│  │  - whatsmeow      │     │  ┌──────────────────┐   │   │
│  │  - SQLite store   │     │  │  LLM Providers    │   │   │
│  │  - REST API :8080 │     │  │  - Ollama (local) │   │   │
│  └────────┬──────────┘     │  │  - Claude/Groq    │   │   │
│           │                │  │  - Grok/Gemini    │   │   │
│           │                │  └──────────────────┘   │   │
│           │                │                          │   │
│           │                │  ┌──────────────────┐   │   │
│  ┌────────▼─────────┐     │  │  Policy Engine    │   │   │
│  │  SQLite (msgs)   │◀────│  │  - 3 risk tiers   │   │   │
│  │  (Rust reads)    │     │  │  - Per-tool perms │   │   │
│  └──────────────────┘     │  │  - Allowlist      │   │   │
│                          │  │  - Contact modes  │   │   │
│                          │  └──────────────────┘   │   │
│                          │                          │   │
│                          │  ┌──────────────────┐   │   │
│                          │  │  Action Engine    │   │   │
│                          │  │  - Shell/Apps    │   │   │
│                          │  │  - Volume/Media  │   │   │
│                          │  │  - File Scanner  │   │   │
│                          │  │  - Undo Journal  │   │   │
│                          │  └──────────────────┘   │   │
│                          └──────────────────────────┘   │
└──────────────────────────────────────────────────────────┘`}
        </div>
      </Section>

      <Section title="Go Bridge (WhatsApp Layer)">
        <div className="space-y-4 text-white/60">
          <p>The Go bridge uses <strong className="text-white">whatsmeow</strong>, a Go library for WhatsApp Web multidevice API.</p>
          <ul className="space-y-2">
            <li>• Maintains WebSocket connection to WhatsApp</li>
            <li>• Handles QR code authentication</li>
            <li>• Stores messages in SQLite database</li>
            <li>• Exposes REST API on port 8080</li>
            <li>• The original whatsapp-mcp bridge — used with minor modifications</li>
          </ul>
        </div>
      </Section>

      <Section title="Tauri Desktop App (Rust)">
        <div className="space-y-4 text-white/60">
          <p>The desktop app is built with <strong className="text-white">Tauri v2</strong> and contains all core logic in Rust:</p>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-emerald-400 mb-2">LLM Providers</h4>
              <p className="text-sm">6 providers with unified chat interface. Live model list fetching for Ollama.</p>
            </div>
            <div className="rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-sky-400 mb-2">Policy Engine</h4>
              <p className="text-sm">Propose → Evaluate → Execute. Per-tool permissions, allowlist, contact modes.</p>
            </div>
            <div className="rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-purple-400 mb-2">Action Engine</h4>
              <p className="text-sm">Structured action types with platform-specific executors. Shell disabled by default.</p>
            </div>
            <div className="rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-amber-400 mb-2">Undo Journal</h4>
              <p className="text-sm">Every action logged with reverse action. Undo with a single command.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Data Flow">
        <div className="space-y-6 text-white/60">
          <div className="flex items-start gap-6 rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-black">1</span>
            <div><strong className="text-white">Message arrives</strong> — WhatsApp bridge receives message, stores in SQLite</div>
          </div>
          <div className="flex items-start gap-6 rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-500/10 text-sky-400 text-sm font-black">2</span>
            <div><strong className="text-white">Contact mode check</strong> — Policy engine checks if sender is allowed and what mode (Assistant/Chat/Summarize/Blocked)</div>
          </div>
          <div className="flex items-start gap-6 rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-400 text-sm font-black">3</span>
            <div><strong className="text-white">LLM processes</strong> — Message sent to active LLM provider for interpretation</div>
          </div>
          <div className="flex items-start gap-6 rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 text-sm font-black">4</span>
            <div><strong className="text-white">Action proposed</strong> — LLM proposes an action → Policy engine evaluates → If approved, action executes</div>
          </div>
          <div className="flex items-start gap-6 rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-black">5</span>
            <div><strong className="text-white">Result recorded</strong> — Action and reverse action logged in undo journal. Result sent back via WhatsApp</div>
          </div>
        </div>
      </Section>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-black uppercase tracking-tight text-white">{title}</h2>
      {children}
    </section>
  );
}
