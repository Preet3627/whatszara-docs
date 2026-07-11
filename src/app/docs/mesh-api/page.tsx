import { Network, Search, Key, Server, ExternalLink, BookOpen } from "lucide-react";

export default function MeshApiPage() {
  return (
    <article className="space-y-12">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">
        <Network size={14} /> Architecture
      </div>
      <h1 className="text-5xl font-black uppercase tracking-tighter sm:text-6xl">Mesh API</h1>
      <p className="text-xl font-medium leading-relaxed text-white/40">
        Whatszara uses Mesh API as its single AI router — one endpoint, one API key, 1000+ models.
      </p>

      <Section title="Overview">
        <div className="space-y-4 text-white/60">
          <p>
            Mesh API (<a href="https://meshapi.ai" target="_blank" className="text-emerald-400 hover:underline">meshapi.ai</a>) is a unified API gateway that provides access to 1000+ models from providers
            including <strong className="text-white">OpenAI, Anthropic, Google, Groq, xAI, Meta, Mistral, DeepSeek, Cohere</strong>, and more —
            all through a single OpenAI-compatible endpoint.
          </p>
          <p>
            The <strong className="text-white">Mesh API Edition</strong> uses a single <code className="text-emerald-400">MeshApiProvider</code>
            in <code className="text-emerald-400">llm.rs</code> as the sole LLM provider.
          </p>
          <div className="rounded-[40px] border border-emerald-500/10 bg-emerald-500/5 p-8 text-center text-sm font-mono text-emerald-400/80 leading-loose">
            1 Mesh API router → 1000+ models available through every feature
          </div>
        </div>
      </Section>

      <Section title="How It Works">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
            <h4 className="text-sm font-black uppercase tracking-widest text-emerald-400 mb-2">Single Endpoint</h4>
            <p className="text-sm text-white/60">All requests go to <code className="text-emerald-400">POST /v1/chat/completions</code> on the configured Mesh API URL. The router handles provider selection and failover.</p>
          </div>
          <div className="rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
            <h4 className="text-sm font-black uppercase tracking-widest text-sky-400 mb-2">Model Selection</h4>
            <p className="text-sm text-white/60">Pick any model from the live browser. The model ID is sent as the <code className="text-emerald-400">model</code> field — Mesh API routes it to the correct provider.</p>
          </div>
          <div className="rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
            <h4 className="text-sm font-black uppercase tracking-widest text-purple-400 mb-2">BYOK Headers</h4>
            <p className="text-sm text-white/60">If a model requires a provider-specific key, set it via <code className="text-emerald-400">x-mesh-*</code> headers. Mesh API forwards the key to the upstream provider.</p>
          </div>
        </div>
      </Section>

      <Section title="Model Browser">
        <p className="text-white/60 mb-6">
          The Settings tab includes a live model browser that fetches all available models from Mesh API:
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-[40px] border border-white/5 bg-[#0a0c10]/60 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10">
                <Search size={24} className="text-emerald-400" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight">List Models</h3>
            </div>
            <p className="text-white/60 text-sm mb-4">Fetches the flat JSON array from <code className="text-emerald-400">GET /v1/models</code>. Each model entry includes:</p>
            <ul className="space-y-2 text-sm text-white/50">
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> <strong className="text-white">id</strong> — unique model identifier</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> <strong className="text-white">name</strong> — human-readable name</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> <strong className="text-white">provider</strong> — upstream provider</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> <strong className="text-white">capabilities</strong> — chat, vision, tools, etc.</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> <strong className="text-white">pricing</strong> — per-token cost</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> <strong className="text-white">context_window</strong> — max tokens</li>
            </ul>
          </div>
          <div className="rounded-[40px] border border-white/5 bg-[#0a0c10]/60 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10">
                <ExternalLink size={24} className="text-sky-400" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight">Model Details</h3>
            </div>
            <p className="text-white/60 text-sm mb-4">Per-model details fetched from <code className="text-emerald-400">GET /v1/models/:id</code>:</p>
            <ul className="space-y-2 text-sm text-white/50">
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-sky-500" /> Full capability list</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-sky-500" /> Pricing per 1K tokens (input/output)</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-sky-500" /> Context window size</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-sky-500" /> Provider and model type metadata</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-sky-500" /> Displayed in a clean card layout</li>
            </ul>
            <p className="text-white/40 text-xs mt-4">The first model in the fetched list is auto-selected as the active provider.</p>
          </div>
        </div>
      </Section>

      <Section title="BYOK (Bring Your Own Key)">
        <p className="text-white/60 mb-6">
          Some Mesh API models require provider-specific API keys. These are sent as HTTP headers on each request:
        </p>
        <div className="rounded-[40px] border border-white/5 bg-[#0a0c10]/60 p-8 space-y-6">
          <pre className="rounded-3xl border border-white/5 bg-[#03040b] p-6 text-sm text-white/60 overflow-x-auto">
{`x-mesh-openai-key: sk-...
x-mesh-anthropic-key: sk-ant-...
x-mesh-groq-key: gsk-...
x-mesh-xai-key: ...
x-mesh-gemini-key: ...`}
          </pre>
          <p className="text-white/40 text-sm">
            Configure these alongside your Mesh API key in the Settings tab. All keys are persisted to the
            platform-native credential store via <strong className="text-white">Save Config</strong> and restored on startup via <strong className="text-white">Load Config</strong>.
          </p>
        </div>
      </Section>

      <Section title="Configuration">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                <Server size={20} className="text-emerald-400" />
              </div>
              <h4 className="text-sm font-black uppercase tracking-widest">Endpoint</h4>
            </div>
            <p className="text-sm text-white/60">Enter the Mesh API URL in Settings → Endpoint. Default: <code className="text-emerald-400">https://meshapi.ai</code>. Click <strong className="text-white">Apply</strong> to save.</p>
          </div>
          <div className="rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10">
                <Key size={20} className="text-sky-400" />
              </div>
              <h4 className="text-sm font-black uppercase tracking-widest">API Key</h4>
            </div>
            <p className="text-sm text-white/60">Your <code className="text-emerald-400">rsk_...</code> key from meshapi.ai. Enter it in the Settings tab alongside optional BYOK headers.</p>
          </div>
          <div className="rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6 sm:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10">
                <BookOpen size={20} className="text-purple-400" />
              </div>
              <h4 className="text-sm font-black uppercase tracking-widest">Model Persistence</h4>
            </div>
            <p className="text-sm text-white/60">
              The selected model and all API keys are persisted via <code className="text-emerald-400">save_model_config</code> /
              <code className="text-emerald-400">load_model_config</code> in <code className="text-emerald-400">llm.rs</code>. On startup, the last-used
              model is restored automatically. The config includes: endpoint URL, Mesh API key, selected model ID, and all BYOK headers.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Implementation">
        <div className="space-y-4 text-white/60">
          <p>The Mesh API integration lives in <code className="text-emerald-400">src-tauri/src/llm.rs</code>:</p>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-[40px] border border-white/5 bg-[#0a0c10]/60 p-8">
              <h4 className="text-sm font-black uppercase tracking-widest text-emerald-400 mb-4">MeshApiProvider</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Replaces 6 individual provider structs</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> OpenAI-compatible chat completions endpoint</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> BYOK header injection on every request</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Model config persistence via keychain</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Error handling with user-friendly messages</li>
              </ul>
            </div>
            <div className="rounded-[40px] border border-white/5 bg-[#0a0c10]/60 p-8">
              <h4 className="text-sm font-black uppercase tracking-widest text-sky-400 mb-4">Key Functions</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-sky-500" /> <code className="text-emerald-400">list_models()</code> — GET /v1/models</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-sky-500" /> <code className="text-emerald-400">get_model_details(id)</code> — GET /v1/models/:id</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-sky-500" /> <code className="text-emerald-400">save_model_config()</code> — keychain persist</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-sky-500" /> <code className="text-emerald-400">load_model_config()</code> — keychain restore</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-sky-500" /> <code className="text-emerald-400">send_conversation()</code> — chat completions</li>
              </ul>
            </div>
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
