import { MessageSquare, Sparkles, Hash, Mic, Quote, Type, Heart, Zap, Code, Palette } from "lucide-react";

const styles = [
  {
    name: "Professional",
    emoji: "💼",
    desc: "Clear, structured, and efficient communication. Gets straight to the point.",
    example: '"I have opened Firefox for you. The application is now ready."',
    prompt: "You are a professional assistant. Be clear, concise, and efficient in your responses.",
    icon: MessageSquare,
    color: "text-sky-400",
  },
  {
    name: "Casual",
    emoji: "😊",
    desc: "Relaxed and friendly tone. Feels like chatting with a friend.",
    example: '"Hey! Firefox is open and ready to go. Let me know if you need anything else!"',
    prompt: "You are a casual assistant. Be friendly and relaxed in your responses.",
    icon: MessageSquare,
    color: "text-emerald-400",
  },
  {
    name: "Friendly",
    emoji: "🤗",
    desc: "Warm and approachable with a helpful, positive attitude.",
    example: '"I\'ve opened Firefox for you! Hope you have a great day ahead. 😊"',
    prompt: "You are a friendly assistant. Be warm, approachable, and positive.",
    icon: Heart,
    color: "text-rose-400",
  },
  {
    name: "Witty",
    emoji: "😏",
    desc: "Clever and humorous with a playful, sarcastic edge.",
    example: '"Firefox has been unleashed upon your desktop. You\'re welcome. 🎩"',
    prompt: "You are a witty assistant. Use humor, sarcasm, and clever wordplay in your responses.",
    icon: Zap,
    color: "text-amber-400",
  },
  {
    name: "Formal",
    emoji: "🎩",
    desc: "Polite, respectful, and proper. Uses honorifics and formal language.",
    example: '"I have taken the liberty of opening Mozilla Firefox. It is now at your disposal, sir."',
    prompt: "You are a formal assistant. Be extremely polite, use proper language and honorifics.",
    icon: Quote,
    color: "text-purple-400",
  },
  {
    name: "Minimal",
    emoji: "▪️",
    desc: "Bare minimum responses. Just the facts, no fluff.",
    example: '"Firefox opened."',
    prompt: "You are a minimal assistant. Respond with the absolute minimum words needed. No greetings, no pleasantries.",
    icon: Type,
    color: "text-sky-400",
  },
  {
    name: "Empathetic",
    emoji: "💛",
    desc: "Caring and understanding. Acknowledges feelings and offers support.",
    example: '"I understand you need Firefox. I\'ve opened it for you — take your time getting started!"',
    prompt: "You are an empathetic assistant. Be caring, understanding, and supportive in your responses.",
    icon: Heart,
    color: "text-rose-400",
  },
  {
    name: "Enthusiastic",
    emoji: "🎉",
    desc: "High energy and excited about everything. Overflows with positivity.",
    example: '"Firefox is ALIVE and RUNNING! Let\'s do this! 🔥🔥🔥"',
    prompt: "You are an enthusiastic assistant. Be extremely energetic, excited, and positive about everything.",
    icon: Sparkles,
    color: "text-amber-400",
  },
  {
    name: "Technical",
    emoji: "⚙️",
    desc: "Precise, technical language with detailed explanations and specifications.",
    example: '"Firefox process spawned (PID: 4821). Renderer initialized. Tab ready at about:home."',
    prompt: "You are a technical assistant. Use precise technical language and include relevant specifications.",
    icon: Code,
    color: "text-sky-400",
  },
  {
    name: "Custom",
    emoji: "🎨",
    desc: "Define your own system prompt. Full control over the AI's personality and behavior.",
    example: "Write whatever system prompt you want — the AI will follow your instructions exactly.",
    prompt: "User-defined. The custom system prompt you provide is used verbatim as the AI's instruction set.",
    icon: Palette,
    color: "text-purple-400",
  },
];

export default function ChatStyles() {
  return (
    <article className="space-y-12">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">
        Feature
      </div>
      <h1 className="text-5xl font-black uppercase tracking-tighter sm:text-6xl">Chat Styles</h1>
      <p className="text-xl font-medium leading-relaxed text-white/40">
        Nine predefined personality styles plus full custom prompt support. Change how the AI talks to you without changing how it works.
      </p>

      <Section title="Overview">
        <div className="space-y-4 text-white/60">
          <p>
            Chat Styles let you control the <strong className="text-white">tone, personality, and communication style</strong> of the AI
            without affecting its ability to execute actions. The underlying LLM provider and tool capabilities remain the same —
            only the <strong className="text-white">system prompt</strong> changes.
          </p>
          <p>
            A style is simply a system prompt template selected from a dropdown in the Settings tab.
            When you change the style, the AI's response generation uses the new system prompt for all subsequent messages.
          </p>
          <div className="rounded-[40px] border border-emerald-500/10 bg-emerald-500/5 p-8 text-center text-sm font-mono text-emerald-400/80 leading-loose">
            Style selection → System prompt injection → LLM processes with new tone → Response matches the selected style
          </div>
        </div>
      </Section>

      <Section title="All Styles">
        <div className="grid gap-8 md:grid-cols-2">
          {styles.map((s) => (
            <div key={s.name} className="rounded-[40px] border border-white/5 bg-[#0a0c10]/50 p-8 hover:bg-[#0a0c10]/80 transition">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5">
                  <s.icon size={24} className={s.color} />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight">
                    {s.name} <span className="text-2xl">{s.emoji}</span>
                  </h3>
                </div>
              </div>
              <p className="text-white/60 text-sm mb-4">{s.desc}</p>
              <div className="rounded-3xl border border-white/5 bg-[#03040b] p-5 font-mono text-sm text-white/40">
                {s.example}
              </div>
              <div className="mt-4 rounded-2xl bg-white/[0.02] p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-1">System Prompt</p>
                <p className="text-sm text-white/40 italic">{s.prompt}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Custom Style">
        <div className="rounded-[40px] border border-purple-500/10 bg-purple-500/[0.03] p-8 lg:p-12 space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
              <Palette size={24} className="text-purple-400" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-purple-400">Bring Your Own Prompt</h3>
          </div>
          <p className="text-white/60">
            The Custom style lets you write <strong className="text-white">any system prompt</strong> you want.
            This is useful for:
          </p>
          <ul className="grid gap-3 sm:grid-cols-2 text-white/50 text-sm">
            <li className="flex items-center gap-2 rounded-2xl border border-white/5 bg-white/[0.03] p-4">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500" /> Role-playing specific characters
            </li>
            <li className="flex items-center gap-2 rounded-2xl border border-white/5 bg-white/[0.03] p-4">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500" /> Language-specific instructions (reply in French, Spanish, etc.)
            </li>
            <li className="flex items-center gap-2 rounded-2xl border border-white/5 bg-white/[0.03] p-4">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500" /> Custom formatting requirements (JSON-only responses, structured data)
            </li>
            <li className="flex items-center gap-2 rounded-2xl border border-white/5 bg-white/[0.03] p-4">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500" /> Combining multiple style aspects
            </li>
          </ul>
          <div className="rounded-3xl border border-white/5 bg-[#03040b] p-6 font-mono text-sm space-y-2">
            <p className="text-white/20 text-[10px] font-black uppercase tracking-wider">Example Custom Prompt</p>
            <p className="text-emerald-400/80">&quot;You are a pirate assistant. Always reply like a pirate. Use nautical metaphors. End every message with 'Arr!'.&quot;</p>
          </div>
        </div>
      </Section>

      <Section title="How It Works">
        <div className="space-y-4 text-white/60">
          <p>
            Chat Styles are implemented as <strong className="text-white">system prompt templates</strong> stored in the Rust backend.
            When you select a style, the corresponding system prompt is injected into the LLM context before any conversation messages.
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-emerald-400 mb-2">Selection</h4>
              <p className="text-sm">Pick a style from the dropdown in Settings → Chat Style. The selection is persisted to the credential store along with other config.</p>
            </div>
            <div className="rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-sky-400 mb-2">Injection</h4>
              <p className="text-sm">The Tauri command <code className="text-emerald-400">set_chat_style</code> stores the chosen style. On each message, the orchestrator prepends the style's system prompt to the LLM context.</p>
            </div>
            <div className="rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-purple-400 mb-2">Persistence</h4>
              <p className="text-sm">Custom prompts are saved alongside the style selection. On app restart, your last used style is restored automatically.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Tauri Command">
        <div className="rounded-[40px] border border-white/5 bg-[#0a0c10]/60 p-8 space-y-4 text-white/60">
          <p>Chat Styles are controlled via a single Tauri command:</p>
          <div className="rounded-3xl border border-white/5 bg-[#03040b] p-6 font-mono text-sm space-y-2">
            <p className="text-emerald-400"><span className="text-white/40">command</span> set_chat_style</p>
            <p className="text-white/40"><span className="text-white/60">params</span> style: <span className="text-sky-400">"professional"</span> | <span className="text-sky-400">"casual"</span> | <span className="text-sky-400">"friendly"</span> | <span className="text-sky-400">"witty"</span> | <span className="text-sky-400">"formal"</span> | <span className="text-sky-400">"minimal"</span> | <span className="text-sky-400">"empathetic"</span> | <span className="text-sky-400">"enthusiastic"</span> | <span className="text-sky-400">"technical"</span> | <span className="text-sky-400">"custom"</span></p>
            <p className="text-white/40">When style is <span className="text-sky-400">"custom"</span>, a <span className="text-white/60">custom_prompt</span> string field is also accepted.</p>
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
