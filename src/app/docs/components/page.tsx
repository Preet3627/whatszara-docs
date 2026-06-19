import { Cpu, Shield, Terminal, Layers, Globe, Download, Zap, Undo, MessageSquare } from "lucide-react";

const components = [
  {
    name: "policy.rs",
    path: "src/whatszara/policy.rs",
    desc: "Policy engine — the gatekeeper for all actions.",
    how: "Defines ToolCategory, ToolPermissions, ContactMode (Assistant/Chat/Summarize/Blocked), RiskLevel, ActionProposal, PolicyDecision, and the PolicyEngine with allowlist support.",
    why: "Separates security policy from action execution. Every action goes through propose → evaluate → execute, ensuring no action runs without policy validation.",
    icon: Shield,
    color: "text-emerald-400",
  },
  {
    name: "actions.rs",
    path: "src/whatszara/actions.rs",
    desc: "Structured action executors for shell, apps, media, and file scanning.",
    how: "Defines ActionResult with action/params fields. ShellExecutor has blocked commands list. AppLauncher, MediaController, DesktopScanner are platform-aware executors.",
    why: "No free-form shell by default. Actions are typed structures (open_app, set_volume, play_media) that can be validated, logged, and reversed.",
    icon: Terminal,
    color: "text-sky-400",
  },
  {
    name: "llm.rs",
    path: "src/whatszara/llm.rs",
    desc: "Multi-provider LLM abstraction with 6 backends.",
    how: "LLMProvider trait + ProviderRegistry. Supports Ollama (with live model list), Claude, Groq, Grok, Gemini, and Vercel AI SDK. Each provider implements the same chat() interface.",
    why: "Users aren't locked into one LLM. Switch providers at runtime via the GUI. Local models (Ollama) work offline.",
    icon: Cpu,
    color: "text-purple-400",
  },
  {
    name: "orchestrator.rs",
    path: "src/whatszara/orchestrator.rs",
    desc: "Central orchestrator — ties policy, LLM, actions, and undo together.",
    how: "process_message() checks contact mode and routes to LLM. handle_action() uses propose() → evaluate() → execute(). Manages the undo journal.",
    why: "Single entry point for all message processing. Contact mode routing means blocked/chat/summarize/assistant modes are handled cleanly.",
    icon: Layers,
    color: "text-amber-400",
  },
  {
    name: "undo.rs",
    path: "src/whatszara/undo.rs",
    desc: "Action journal with reversible actions for undo support.",
    how: "ActionJournal records every action with its reverse. undo_last() executes the reverse action and marks it as reversed. Supports per-contact undo.",
    why: "Accidents happen. Every action is reversible — volume changes, music playback, and more can be undone with a single command.",
    icon: Undo,
    color: "text-rose-400",
  },
  {
    name: "whatsapp.rs",
    path: "src/whatszara/whatsapp.rs",
    desc: "WhatsApp integration — reads SQLite from Go bridge, sends messages via HTTP.",
    how: "list_chats() reads the SQLite database directly. search_contacts() searches by name/number. send_message() calls the Go bridge REST API.",
    why: "No Python MCP server needed. Direct SQLite access is faster and more reliable than going through a secondary service.",
    icon: MessageSquare,
    color: "text-emerald-400",
  },
];

export default function Components() {
  return (
    <article className="space-y-12">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-purple-400">
        Reference
      </div>
      <h1 className="text-5xl font-black uppercase tracking-tighter sm:text-6xl">Components</h1>
      <p className="text-xl font-medium leading-relaxed text-white/40">
        Every Rust module in Whatszara explained — what it does, how it works, and why it exists.
      </p>

      <div className="grid gap-8">
        {components.map((comp) => (
          <div key={comp.name} className="rounded-[45px] border border-white/5 bg-[#0a0c10]/50 p-10 lg:p-14">
            <div className="flex items-start gap-6 mb-8">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/5">
                <comp.icon size={28} className={comp.color} />
              </div>
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tight">{comp.name}</h2>
                <p className="text-[11px] font-mono text-white/20 mt-1">{comp.path}</p>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-3">What it does</h4>
                <p className="text-base font-medium leading-relaxed text-white/60">{comp.desc}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-3">How it works</h4>
                <p className="text-base font-medium leading-relaxed text-white/60">{comp.how}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-3">Why it exists</h4>
                <p className="text-base font-medium leading-relaxed text-white/60">{comp.why}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
