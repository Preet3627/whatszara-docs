export default function UI() {
  return (
    <article className="space-y-12">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-sky-400">
        Frontend
      </div>
      <h1 className="text-5xl font-black uppercase tracking-tighter sm:text-6xl">Frontend UI</h1>
      <p className="text-xl font-medium leading-relaxed text-white/40">
        The Tauri desktop app ships with a built-in web-based dashboard for managing providers, permissions, and monitoring.
      </p>

      <Section title="Dashboard">
        <div className="rounded-[40px] border border-white/5 bg-[#0a0c10]/60 p-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "WhatsApp", value: "Bridge Status", color: "text-emerald-400" },
              { label: "LLM Provider", value: "Active Provider", color: "text-sky-400" },
              { label: "Actions Today", value: "Journal Count", color: "text-purple-400" },
              { label: "Active Risk", value: "Current Level", color: "text-amber-400" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/5 bg-white/[0.03] p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-2">{stat.label}</p>
                <p className={`text-lg font-black ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-white/40 text-sm">
            The dashboard shows real-time status of the WhatsApp bridge, active LLM provider, action journal count, and current risk level.
            A system tray icon provides quick access — click to show/hide the window.
          </p>
        </div>
      </Section>

      <div className="grid gap-8 lg:grid-cols-2">
        <Section title="Providers Tab">
          <div className="rounded-[40px] border border-white/5 bg-[#0a0c10]/60 p-8 space-y-4 text-white/60">
            <p>Configure and switch between 6 LLM providers:</p>
            <ul className="space-y-2">
              <li>• Toggle providers on/off</li>
              <li>• Select active provider from dropdown</li>
              <li>• Live model list for Ollama</li>
              <li>• Set API keys via environment variables</li>
            </ul>
          </div>
        </Section>

        <Section title="Permissions Tab">
          <div className="rounded-[40px] border border-white/5 bg-[#0a0c10]/60 p-8 space-y-4 text-white/60">
            <p>Full policy management interface:</p>
            <ul className="space-y-2">
              <li>• Per-tool permission toggles (Shell, File, Media, Apps, WhatsApp)</li>
              <li>• Allowlist management — add/remove JIDs</li>
              <li>• Contact mode selection per JID</li>
              <li>• Risk profile reference cards</li>
            </ul>
          </div>
        </Section>

        <Section title="Action Log">
          <div className="rounded-[40px] border border-white/5 bg-[#0a0c10]/60 p-8 space-y-4 text-white/60">
            <p>Monitor all executed actions:</p>
            <ul className="space-y-2">
              <li>• Timestamp, action type, status, reversibility</li>
              <li>• Refresh button for live updates</li>
              <li>• Integrated with undo journal</li>
            </ul>
          </div>
        </Section>

        <Section title="Settings Tab">
          <div className="rounded-[40px] border border-white/5 bg-[#0a0c10]/60 p-8 space-y-4 text-white/60">
            <p>App configuration:</p>
            <ul className="space-y-2">
              <li>• WhatsApp Bridge URL and API key</li>
              <li>• Ollama endpoint</li>
              <li>• Settings saved to localStorage</li>
            </ul>
          </div>
        </Section>
      </div>

      <Section title="Tauri Integration">
        <div className="space-y-4 text-white/60">
          <p>The frontend communicates with the Rust backend via <strong className="text-white">Tauri commands</strong>:</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["get_status", "Dashboard status"],
              ["process_message", "Send message to LLM"],
              ["handle_action", "Execute an action"],
              ["undo_last", "Undo last action"],
              ["list_models", "Fetch available models"],
              ["set_active_provider", "Switch provider"],
              ["get_policy", "Get policy state"],
              ["update_permissions", "Toggle tool perms"],
              ["update_allowlist", "Add/remove JID"],
              ["update_contact_mode", "Set contact mode"],
              ["list_chats", "List WhatsApp chats"],
              ["search_contacts", "Search contacts"],
            ].map(([cmd, desc]) => (
              <div key={cmd} className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
                <code className="text-emerald-400 text-sm font-mono">{cmd}</code>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mt-2">{desc}</p>
              </div>
            ))}
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
