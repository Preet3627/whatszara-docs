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
│  │  - API key auth   │     │  │  - Claude/Groq    │   │   │
│  │  - contacts table │     │  │  - Grok/Gemini    │   │   │
│  └────────┬──────────┘     │  │  - Vercel AI SDK  │   │   │
│           │                │  └──────────────────┘   │   │
│           │                │                          │   │
│           │                │  ┌──────────────────┐   │   │
│  ┌────────▼─────────┐     │  │  Policy Engine    │   │   │
│  │  SQLite (msgs)   │◀────│  │  - 3 risk tiers   │   │   │
│  │  + contacts      │     │  │  - Per-tool perms │   │   │
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
│                          │                          │   │
│                          │  ┌──────────────────┐   │   │
│                          │  │  Pending Actions  │   │   │
│                          │  │  - Risk approval  │   │   │
│                          │  │  - Approve/Reject │   │   │
│                          │  └──────────────────┘   │   │
│                          └──────────────────────────┘   │
│                                                           │
│  ┌──────────────────────────────────────────────────┐    │
│  │  Credential Store                                  │    │
│  │  - Session auth (whatsapp.db)                    │    │
│  │  - Policy config (allowlist, perms, mode)         │    │
│  └──────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────┘`}
        </div>
      </Section>

      <Section title="Go Bridge (WhatsApp Layer)">
        <div className="space-y-4 text-white/60">
          <p>The Go bridge uses <strong className="text-white">whatsmeow</strong>, a Go library for WhatsApp Web multidevice API.</p>
          <ul className="space-y-2">
            <li>• Maintains WebSocket connection to WhatsApp</li>
            <li>• Handles QR code authentication</li>
            <li>• Stores messages in SQLite database (messages.db)</li>
            <li>• Stores session/auth data in whatsapp.db</li>
            <li><strong className="text-emerald-400">New:</strong> Stores contacts in a <code className="text-emerald-400">contacts</code> table via <code className="text-emerald-400">StoreContact()</code>, populated on <code className="text-emerald-400">handleMessage()</code> and <code className="text-emerald-400">handleHistorySync()</code></li>
            <li><strong className="text-emerald-400">New:</strong> API key authentication via <code className="text-emerald-400">checkAPIKey()</code> middleware — validates <code className="text-emerald-400">Authorization: Bearer &lt;key&gt;</code> on <code className="text-emerald-400">/api/send</code> and <code className="text-emerald-400">/api/download</code></li>
            <li>Exposes REST API on port 8080</li>
          </ul>
        </div>
      </Section>

      <Section title="Tauri Desktop App (Rust)">
        <div className="space-y-4 text-white/60">
          <p>The desktop app is built with <strong className="text-white">Tauri v2</strong> and contains all core logic in Rust:</p>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-emerald-400 mb-2">LLM Providers</h4>
              <p className="text-sm">6 providers with unified chat interface. Live model list fetching for all providers via <code className="text-emerald-400">set_endpoint()</code> / <code className="text-emerald-400">set_api_key()</code> trait methods.</p>
            </div>
            <div className="rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-sky-400 mb-2">Policy Engine</h4>
              <p className="text-sm">Propose → Evaluate → Execute. Per-tool permissions, allowlist, contact modes, risk-level classification.</p>
            </div>
            <div className="rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-purple-400 mb-2">Action Engine</h4>
              <p className="text-sm">Structured action types with platform-specific executors. Shell disabled by default.</p>
            </div>
            <div className="rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-amber-400 mb-2">Undo Journal</h4>
              <p className="text-sm">Every action logged with reverse action. Undo with a single command.</p>
            </div>
            <div className="rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-rose-400 mb-2">Pending Actions</h4>
              <p className="text-sm">Medium/high-risk tool calls enter a <code className="text-rose-400">PendingAction</code> queue. <code className="text-rose-400">ToolCall</code> struct parsed via <code className="text-rose-400">parse_tool_call()</code>. Must be approved or rejected via the GUI.</p>
            </div>
            <div className="rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-sky-400 mb-2">Config Persistence</h4>
              <p className="text-sm">Policy state (allowlist, permissions, contact modes) auto-saved to credential store. Restored on startup via <code className="text-emerald-400">save_config/load_config/clear_config</code>.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Credential Storage (Cross-Platform)">
        <div className="space-y-4 text-white/60">
          <p>Whatszara uses the <strong className="text-white">keyring</strong> crate which transparently maps to the platform-native credential store:</p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-sky-400 mb-2">macOS</h4>
              <p className="text-sm">iCloud Keychain (via Security framework)</p>
            </div>
            <div className="rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-emerald-400 mb-2">Windows</h4>
              <p className="text-sm">Credential Manager (via wincred)</p>
            </div>
            <div className="rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-amber-400 mb-2">Linux</h4>
              <p className="text-sm">Secret Service / keyutils</p>
            </div>
          </div>
          <p className="text-sm text-white/40">Two entries are stored, each with service name and username <code className="text-emerald-400">whatszara</code>:</p>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-emerald-400 mb-2">WhatsApp Session Auth</h4>
              <p className="text-sm">Service: <code className="text-emerald-400">whatszara-wa-session</code>. On bridge connect, <code className="text-emerald-400">whatsapp.db</code> is base64-encoded and stored. On startup, it's decoded and restored — no QR scan needed.</p>
            </div>
            <div className="rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-amber-400 mb-2">Policy Config</h4>
              <p className="text-sm">Service: <code className="text-emerald-400">whatszara-config</code>. Stores allowlist, tool permissions, contact modes. Auto-saved on every change. Auto-loaded on startup.</p>
            </div>
            <div className="rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-sky-400 mb-2">Keychain Utilities</h4>
              <p className="text-sm"><code className="text-emerald-400">save_keychain()</code>, <code className="text-emerald-400">load_keychain()</code>, <code className="text-emerald-400">delete_keychain()</code> wrap the <code className="text-emerald-400">keyring</code> crate's <code className="text-emerald-400">Entry::set_password/get_password/delete_credential</code>.</p>
            </div>
            <div className="rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-rose-400 mb-2">Logout</h4>
              <p className="text-sm">Kills the bridge, deletes both credential store entries, removes the session file, and clears QR state — requiring a fresh scan.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Risk / Approval Flow">
        <div className="space-y-6 text-white/60">
          <p>In Assistant mode, when the LLM proposes a tool call, the orchestrator evaluates its risk level:</p>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-3xl border border-emerald-500/10 bg-emerald-500/[0.03] p-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-emerald-400 mb-2">Low Risk</h4>
              <p className="text-sm">Auto-executed immediately. Read-only operations like <code className="text-emerald-400">get_volume</code>, <code className="text-emerald-400">list_files</code>.</p>
            </div>
            <div className="rounded-3xl border border-amber-500/10 bg-amber-500/[0.03] p-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-amber-400 mb-2">Medium Risk</h4>
              <p className="text-sm">Creates a <code className="text-amber-400">PendingAction</code> in the queue. Requires GUI approval. Operations like <code className="text-amber-400">open_app</code>, <code className="text-amber-400">set_volume</code>.</p>
            </div>
            <div className="rounded-3xl border border-rose-500/10 bg-rose-500/[0.03] p-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-rose-400 mb-2">High Risk</h4>
              <p className="text-sm">Creates a <code className="text-rose-400">PendingAction</code>. Always requires explicit approval — trust sessions cannot bypass. Shell commands and destructive operations.</p>
            </div>
          </div>
          <div className="rounded-[40px] border border-white/5 bg-[#0a0c10]/60 p-8">
            <h4 className="text-sm font-black uppercase tracking-widest text-sky-400 mb-4">Implementation</h4>
            <ul className="space-y-2 text-sm">
              <li>• <code className="text-emerald-400">parse_tool_call()</code> extracts <code className="text-emerald-400">{"{"}"tool":"...","params":{...}{"}"}</code> from LLM responses</li>
              <li>• <code className="text-emerald-400">PendingAction</code> struct: id, tool, params, risk, timestamp, sender</li>
              <li>• <code className="text-emerald-400">approve_pending_action()</code> executes the action and logs it</li>
              <li>• <code className="text-emerald-400">reject_pending_action()</code> discards with a notification</li>
              <li>• Frontend polls <code className="text-emerald-400">get_pending_actions</code> every 3 seconds</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Data Flow">
        <div className="space-y-6 text-white/60">
          <div className="flex items-start gap-6 rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-black">1</span>
            <div><strong className="text-white">Message arrives</strong> — WhatsApp bridge receives message, stores in SQLite (messages + contacts updated)</div>
          </div>
          <div className="flex items-start gap-6 rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-500/10 text-sky-400 text-sm font-black">2</span>
            <div><strong className="text-white">Contact mode check</strong> — Policy engine checks if sender is allowed and what mode (Assistant/Chat/Summarize/Blocked)</div>
          </div>
          <div className="flex items-start gap-6 rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-400 text-sm font-black">3</span>
            <div><strong className="text-white">LLM processes</strong> — Message sent to active LLM provider for interpretation. <code className="text-emerald-400">set_endpoint()</code> / <code className="text-emerald-400">set_api_key()</code> configured from GUI settings.</div>
          </div>
          <div className="flex items-start gap-6 rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 text-sm font-black">4</span>
            <div><strong className="text-white">Action proposed</strong> — LLM proposes a tool call → <code className="text-emerald-400">parse_tool_call()</code> extracts it → Policy engine evaluates risk → Low = auto-execute, Medium/High = create <code className="text-emerald-400">PendingAction</code></div>
          </div>
          <div className="flex items-start gap-6 rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-black">5</span>
            <div><strong className="text-white">Approval / Execution</strong> — Pending action approved via GUI → action executes → result recorded in undo journal → result sent back via WhatsApp</div>
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
