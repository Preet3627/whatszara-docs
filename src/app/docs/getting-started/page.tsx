export default function GettingStarted() {
  return (
    <article className="space-y-12">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">
        Guide
      </div>
      <h1 className="text-5xl font-black uppercase tracking-tighter sm:text-6xl">Getting Started</h1>
      <p className="text-xl font-medium leading-relaxed text-white/40">
        Set up Whatszara in under a minute. No Python required. Just Go, Node.js, and Rust.
      </p>

      <Section title="Prerequisites">
        <ul className="space-y-3 text-white/60">
          <li><strong className="text-white">Go</strong> — for the WhatsApp bridge (whatsmeow)</li>
          <li><strong className="text-white">Node.js 20+</strong> + <strong className="text-white">Rust</strong> — for the Tauri desktop app</li>
          <li><strong className="text-white">FFmpeg</strong> — optional, for audio message support</li>
        </ul>
        <p className="text-emerald-400 font-black uppercase tracking-wider text-sm mt-4">Python is NOT required.</p>
      </Section>

      <Section title="One-Click Setup">
        <pre className="rounded-3xl border border-white/5 bg-[#0a0c10] p-6 text-sm text-white/60 overflow-x-auto">
{`chmod +x setup.sh && ./setup.sh

# Or using Make:
make setup`}
        </pre>
        <p className="text-white/40">This installs Go, Node.js, Rust, and all dependencies automatically.</p>
      </Section>

      <Section title="Run Whatszara">
        <p className="text-white/60 mb-6">You need two terminals:</p>
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-emerald-400 mb-3">1. Start WhatsApp Bridge</h4>
            <pre className="rounded-3xl border border-white/5 bg-[#0a0c10] p-6 text-sm text-white/60 overflow-x-auto">
{`make bridge`}
            </pre>
            <p className="text-white/40 mt-3">Scan the QR code with your WhatsApp mobile app to link your account. The session is automatically saved to the macOS Keychain — on next launch, no QR scan is needed.</p>
            <p className="text-white/40 mt-2">Optionally set <code className="text-emerald-400">API_KEY</code> env var to require Bearer auth on the bridge REST API.</p>
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-emerald-400 mb-3">2. Start Desktop App</h4>
            <pre className="rounded-3xl border border-white/5 bg-[#0a0c10] p-6 text-sm text-white/60 overflow-x-auto">
{`make desktop`}
            </pre>
            <p className="text-white/40 mt-3">The Tauri app opens with a dashboard showing provider status and action log.</p>
          </div>
        </div>
      </Section>

      <Section title="Configure LLM Provider">
        <p className="text-white/60 mb-6">Set environment variables or configure in the desktop app GUI (Settings tab):</p>
        <pre className="rounded-3xl border border-white/5 bg-[#0a0c10] p-6 text-sm text-white/60 overflow-x-auto">
{`# Ollama (default — works out of the box)
export OLLAMA_ENDPOINT=http://localhost:11434

# Claude
export ANTHROPIC_API_KEY=sk-ant-...

# Groq
export GROQ_API_KEY=gsk-...

# Grok (xAI)
export XAI_API_KEY=...

# Gemini
export GEMINI_API_KEY=...`}
        </pre>
        <p className="text-white/40 mt-4">API keys can also be entered directly in the desktop app's Settings tab. Use "Save Config" to persist them to the Keychain.</p>
      </Section>

      <Section title="Persistent Configuration">
        <div className="space-y-4 text-white/60">
          <p>Whatszara stores two things in the macOS Keychain for persistence across restarts:</p>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-emerald-400 mb-2">WhatsApp Session</h4>
              <p className="text-sm">Auto-saved on first connect. Restored on startup — no QR scan needed on subsequent launches.</p>
            </div>
            <div className="rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-amber-400 mb-2">Policy Config</h4>
              <p className="text-sm">Allowlist, tool permissions, contact modes, and provider settings. Auto-saved on change. Restored on startup. Save/Load/Clear buttons in Settings tab.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Understanding the Approval Flow">
        <p className="text-white/60 mb-6">When an AI action requires approval, here is what happens:</p>
        <div className="space-y-6">
          <div className="flex items-start gap-6 rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 text-sm font-black">1</span>
            <div><strong className="text-white">Action proposed</strong> — You send a message like "Open Firefox". The LLM interprets it and proposes a tool call.</div>
          </div>
          <div className="flex items-start gap-6 rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 text-sm font-black">2</span>
            <div><strong className="text-white">Risk assessed</strong> — Low-risk actions (read volume, list files) execute immediately. Medium/high-risk actions go to a pending queue.</div>
          </div>
          <div className="flex items-start gap-6 rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 text-sm font-black">3</span>
            <div><strong className="text-white">Approve in GUI</strong> — Open the desktop app's Chat tab. A pending actions panel shows the action with Approve / Reject buttons.</div>
          </div>
          <div className="flex items-start gap-6 rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 text-sm font-black">4</span>
            <div><strong className="text-white">Result sent</strong> — Action executes. The result is logged in the undo journal and sent back to you via WhatsApp.</div>
          </div>
        </div>
      </Section>

      <Section title="Send Your First Command">
        <p className="text-white/60 mb-6">Once everything is running, send a WhatsApp message to your linked number:</p>
        <div className="rounded-[40px] border border-white/5 bg-[#0a0c10]/60 p-8">
          <p className="text-sm font-black uppercase tracking-widest text-emerald-400 mb-2">Example messages:</p>
          <ul className="space-y-3 text-white/60">
            <li>"<strong className="text-white">What is my current volume level?</strong>" — reads system volume (auto-executes)</li>
            <li>"<strong className="text-white">Open Firefox</strong>" — launches the app (requires approval)</li>
            <li>"<strong className="text-white">Set volume to 30%</strong>" — changes system volume (requires approval)</li>
            <li>"<strong className="text-white">Show me my desktop images</strong>" — scans for images (auto-executes)</li>
          </ul>
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
