import { MessageSquare, Bot, ShieldCheck, Layers, Music, Zap, Globe, Undo, Contact, KeyRound, MessagesSquare } from "lucide-react";

const features = [
  {
    name: "WhatsApp-Powered Control",
    desc: "Control your desktop from any phone via WhatsApp. No app to install — it works where you already chat. Send a message, and the LLM interprets it, validates it against policy, and executes it on your desktop.",
    icon: MessageSquare,
    color: "text-emerald-400",
  },
  {
    name: "6 LLM Providers",
    desc: "Ollama (local, offline), Claude, Groq, Grok (xAI), Gemini, and Vercel AI SDK. All implemented as a unified ProviderRegistry trait in Rust. Switch providers at runtime from the GUI. Live model list fetching for Ollama.",
    icon: Bot,
    color: "text-sky-400",
  },
  {
    name: "Per-Tool Permissions",
    desc: "Each tool category — Shell, File Access, Media Control, App Launching, WhatsApp — is independently toggleable. Shell is DISABLED by default. You must explicitly enable it. Configure from the Permissions tab in the GUI.",
    icon: ShieldCheck,
    color: "text-emerald-400",
  },
  {
    name: "Structured Actions",
    desc: "No free-form shell execution. Actions are typed: open_app, set_volume, play_media, get_volume, list_images, send_file. Each action carries its params for logging, undo, and audit trails.",
    icon: Layers,
    color: "text-purple-400",
  },
  {
    name: "Undo Journal",
    desc: "Every action is logged with a reverse action. Undo volume changes, pause music, revert file operations. Per-contact undo support — only the user who performed an action can undo it.",
    icon: Undo,
    color: "text-rose-400",
  },
  {
    name: "Contact Modes",
    desc: "Four modes per contact: Assistant (full control), Chat (text only), Summarize (2-3 sentence summary), Blocked (rejected). Default mode is Summarize for non-configured contacts.",
    icon: Zap,
    color: "text-amber-400",
  },
  {
    name: "WhatsApp Allowlist",
    desc: "Only approved WhatsApp numbers can control the assistant. Default: only 'self' is allowed. Add contacts via the GUI. Non-allowed contacts get summarized or blocked.",
    icon: Globe,
    color: "text-sky-400",
  },
  {
    name: "Zero Python",
    desc: "100% Rust + Go. No interpreters, no virtualenvs, no pip, no requirements.txt. One-click setup.sh installs everything — just Go, Node.js, and Rust. CI builds multi-platform binaries.",
    icon: Zap,
    color: "text-emerald-400",
  },
  {
    name: "Contacts GUI with Search",
    desc: "Searchable contacts table in the Permissions tab. Toggle allowlist membership and set per-contact modes (Assistant/Chat/Summarize/Blocked) directly from the GUI. No more manual JID entry.",
    icon: Contact,
    color: "text-sky-400",
  },
  {
    name: "Permanent WhatsApp Auth",
    desc: "WhatsApp session is automatically saved to your platform-native credential store (macOS Keychain, Windows Credential Manager, Linux Secret Service) on first connect. On subsequent launches, the session is restored — no QR scan needed. Logout button on the Dashboard to clear the saved session.",
    icon: KeyRound,
    color: "text-amber-400",
  },
  {
    name: "Built-in Chat View",
    desc: "Full chat interface with searchable contact list, message history display (incoming/outgoing bubbles with timestamps), and a pending actions panel for reviewing and approving/rejecting high-risk operations.",
    icon: MessagesSquare,
    color: "text-purple-400",
  },
];

export default function Features() {
  return (
    <article className="space-y-12">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-sky-400">
        Overview
      </div>
      <h1 className="text-5xl font-black uppercase tracking-tighter sm:text-6xl">Features</h1>
      <p className="text-xl font-medium leading-relaxed text-white/40">
        Complete feature overview of Whatszara — from multi-LLM support to the permission system to the undo journal.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {features.map((f) => (
          <div key={f.name} className="rounded-[40px] border border-white/5 bg-[#0a0c10]/50 p-10 hover:bg-[#0a0c10]/80 transition">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 mb-8">
              <f.icon size={24} className={f.color} />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-4">{f.name}</h3>
            <p className="text-base font-medium leading-relaxed text-white/40">{f.desc}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
