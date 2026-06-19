export default function UI() {
  return (
    <article className="space-y-12">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-sky-400">
        Frontend
      </div>
      <h1 className="text-5xl font-black uppercase tracking-tighter sm:text-6xl">Frontend UI</h1>
      <p className="text-xl font-medium leading-relaxed text-white/40">
        The Tauri desktop app ships with a built-in web-based dashboard for managing providers, permissions, chat, and monitoring.
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
              <li>• Live model list fetching for all providers</li>
              <li>• API key fields for each provider (Claude, Groq, Grok, Gemini)</li>
              <li>• Ollama endpoint URL input with "Apply Endpoint" button</li>
              <li>• First live-fetched model auto-selected as default</li>
            </ul>
          </div>
        </Section>

        <Section title="Permissions Tab">
          <div className="rounded-[40px] border border-white/5 bg-[#0a0c10]/60 p-8 space-y-4 text-white/60">
            <p>Full policy management interface with searchable contacts table:</p>
            <ul className="space-y-2">
              <li>• Per-tool permission toggles (Shell, File, Media, Apps, WhatsApp)</li>
              <li>• Searchable contacts table with allowlist checkboxes</li>
              <li>• Per-contact mode dropdown (Assistant/Chat/Summarize/Blocked)</li>
              <li>• Risk profile reference cards</li>
              <li>• All changes sync to the backend instantly</li>
            </ul>
          </div>
        </Section>

        <Section title="Chat Tab">
          <div className="rounded-[40px] border border-white/5 bg-[#0a0c10]/60 p-8 space-y-4 text-white/60">
            <p>Built-in chat interface for monitoring conversations:</p>
            <ul className="space-y-2">
              <li>• Left panel: searchable contact list with avatars</li>
              <li>• Right panel: message history with incoming/outgoing bubbles</li>
              <li>• Message metadata: timestamps and media type indicators</li>
              <li>• <strong className="text-amber-400">Pending actions panel</strong> — shows queued medium/high-risk operations with Approve/Reject buttons</li>
              <li>• Badge count on pending actions showing number of items awaiting review</li>
              <li>• 3-second polling for new pending actions</li>
              <li>• Messages fetched from SQLite via list_messages command</li>
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
              <li>• WhatsApp Bridge URL and API key (for Go bridge Bearer auth)</li>
              <li>• Ollama endpoint URL input</li>
              <li>• API key inputs for all 5 remote LLM providers</li>
              <li>• <strong className="text-emerald-400">Config save/load/clear</strong> — persist settings to platform-native credential store, restore on startup, or clear stored config</li>
              <li>• Config auto-saved on every permission/allowlist/mode change</li>
            </ul>
          </div>
        </Section>
      </div>

      <Section title="Tauri Commands">
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
              ["set_ollama_endpoint", "Set Ollama URL"],
              ["set_api_key", "Set a provider's API key"],
              ["get_policy", "Get policy state"],
              ["update_permissions", "Toggle tool perms"],
              ["update_allowlist", "Add/remove JID"],
              ["update_contact_mode", "Set contact mode"],
              ["list_chats", "List WhatsApp chats"],
              ["search_contacts", "Search contacts"],
              ["list_contacts", "All contacts merged"],
              ["list_messages", "Messages for a chat"],
              ["logout_bridge", "Disconnect & clear auth"],
              ["get_pending_actions", "List pending approvals"],
              ["approve_action", "Approve pending action"],
              ["reject_action", "Reject pending action"],
              ["save_config", "Save config to Keychain"],
              ["load_config", "Load config from Keychain"],
              ["clear_config", "Clear config from Keychain"],
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
