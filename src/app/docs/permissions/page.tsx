export default function SecurityModel() {
  return (
    <article className="space-y-16">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">
        Security Architecture
      </div>
      <h1 className="text-5xl font-black uppercase tracking-tighter sm:text-6xl">Security Model</h1>

      {/* Philosophy */}
      <Section title="Philosophy">
        <div className="space-y-4 text-white/60 text-lg leading-relaxed">
          <p>Whatszara follows <strong className="text-white">four principles</strong>:</p>
          <ol className="list-decimal list-inside space-y-3 pl-4">
            <li><strong className="text-emerald-400">Least Privilege</strong> — only the minimum required permissions are granted</li>
            <li><strong className="text-emerald-400">Human Approval for Dangerous Actions</strong> — high-risk actions always need confirmation</li>
            <li><strong className="text-emerald-400">Remote-First Security</strong> — designed for access from untrusted networks</li>
            <li><strong className="text-emerald-400">Complete Auditability</strong> — every action is logged and reversible</li>
          </ol>
          <p className="mt-6 text-base">The AI never directly executes arbitrary actions. All actions follow a strict pipeline:</p>
          <div className="rounded-[40px] border border-emerald-500/10 bg-emerald-500/5 p-8 text-center text-sm font-mono text-emerald-400/80 leading-loose">
            Message → LLM → Structured Action → Policy Engine → Approval (if required) → Execute → Audit Log → Undo Journal
          </div>
        </div>
      </Section>

      {/* Contact Modes */}
      <Section title="Contact Modes">
        <p className="text-white/60">Every WhatsApp contact is assigned a mode that governs what they can do.</p>
        <div className="grid gap-8">
          <ModeCard title="Assistant" color="text-emerald-400" border="border-emerald-500/20" bg="bg-emerald-500/[0.03]"
            desc="Full AI assistant. Can propose and execute desktop actions."
            examples={["Open applications", "Control media", "Read files", "Send files", "Execute approved actions"]}
            note="Default: Self only" />

          <ModeCard title="Chat" color="text-sky-400" border="border-sky-500/20" bg="bg-sky-500/[0.03]"
            desc="AI responds with text only. No desktop actions. Useful for friends or family members."
            examples={[]}
            note="">
            <div className="space-y-3 text-sm">
              <p><strong className="text-white">User:</strong> &quot;What&apos;s the weather?&quot;</p>
              <p><strong className="text-emerald-400">AI:</strong> Returns answer.</p>
              <p><strong className="text-white">User:</strong> &quot;Open Chrome&quot;</p>
              <p><strong className="text-rose-400">AI:</strong> Action denied.</p>
            </div>
          </ModeCard>

          <ModeCard title="Summarize" color="text-amber-400" border="border-amber-500/20" bg="bg-amber-500/[0.03]"
            desc="Incoming messages are summarized. No AI conversations. No actions."
            examples={[]}
            note="">
            <p className="text-sm text-white/40 italic">&quot;17 unread messages from Family Group discussing weekend plans.&quot;</p>
          </ModeCard>

          <ModeCard title="Blocked" color="text-rose-400" border="border-rose-500/20" bg="bg-rose-500/[0.03]"
            desc="Messages are ignored. No AI processing. No actions."
            examples={[]}
            note="" />
        </div>
      </Section>

      {/* Tool Permissions */}
      <Section title="Tool Permissions">
        <p className="text-white/60">Each capability can be enabled or disabled independently.</p>
        <div className="grid gap-6 sm:grid-cols-2">
          <PermCard title="File Access" defaultState="Enabled" stateColor="text-emerald-400"
            actions={["list_files", "list_images", "send_file", "get_desktop_paths"]} />
          <PermCard title="Media Control" defaultState="Enabled" stateColor="text-emerald-400"
            actions={["get_volume", "set_volume", "play_media", "pause_media", "next_track", "previous_track"]} />
          <PermCard title="App Launching" defaultState="Enabled" stateColor="text-emerald-400"
            actions={["open_app"]} />
          <PermCard title="WhatsApp Tools" defaultState="Enabled" stateColor="text-emerald-400"
            actions={["send_message", "search_contacts", "list_chats"]} />
          <PermCard title="Shell Access" defaultState="Disabled" stateColor="text-rose-400"
            actions={["execute_shell", "run_command"]}
            note="Requires explicit opt-in. Disabled by default for safety." />
        </div>
      </Section>

      {/* Session Trust */}
      <Section title="Session Trust">
        <p className="text-white/60">
          Session Trust reduces approval fatigue while maintaining safety.
          A trusted session is a temporary period during which approved low-risk and medium-risk actions
          can execute without repeated confirmation. Trust never bypasses high-risk protections.
        </p>

        <div className="rounded-[40px] border border-white/5 bg-[#0a0c10]/60 p-8 space-y-4">
          <h4 className="text-sm font-black uppercase tracking-widest text-emerald-400">Creating A Trusted Session</h4>
          <p className="text-white/60">User approves: &quot;Trust this session for 15 minutes&quot;</p>
          <div className="flex flex-wrap gap-4 text-sm">
            {["15 minutes", "30 minutes", "1 hour"].map((d) => (
              <span key={d} className="rounded-full border border-white/5 bg-white/5 px-6 py-3 text-white/60">{d}</span>
            ))}
          </div>
          <p className="text-white/40 text-sm">Default: 15 minutes</p>
        </div>

        <div className="rounded-[40px] border border-sky-500/10 bg-sky-500/[0.03] p-8 space-y-4">
          <h4 className="text-sm font-black uppercase tracking-widest text-sky-400">During Trusted Session</h4>
          <p className="text-white/60">Allowed without additional approval:</p>
          <ul className="grid gap-2 sm:grid-cols-2 text-white/50 text-sm">
            {["Open applications", "Volume changes", "Media controls", "Read-only file operations", "Send approved files"].map((a) => (
              <li key={a} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-500" /> {a}
              </li>
            ))}
          </ul>
          <p className="text-white/40 text-sm mt-4">These execute immediately without further prompts.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-[40px] border border-rose-500/10 bg-rose-500/[0.03] p-8">
            <h4 className="text-sm font-black uppercase tracking-widest text-rose-400 mb-4">Trust Expiration</h4>
            <ul className="space-y-2 text-white/50 text-sm">
              {["Time limit reached", "Computer locks", "User logs out", "Whatszara restarts", "User manually revokes trust"].map((r) => (
                <li key={r} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-rose-500" /> {r}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[40px] border border-purple-500/10 bg-purple-500/[0.03] p-8">
            <h4 className="text-sm font-black uppercase tracking-widest text-purple-400 mb-4">Trust Scope</h4>
            <p className="text-white/50 text-sm mb-4">Trust is bound to:</p>
            <ul className="space-y-2 text-white/50 text-sm">
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-purple-500" /> Specific WhatsApp contact</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-purple-500" /> Specific device</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-purple-500" /> Specific session</li>
            </ul>
            <p className="text-rose-400 text-sm font-black uppercase tracking-wider mt-4">Trust is never shared across contacts.</p>
          </div>
        </div>
      </Section>

      {/* Risk Levels */}
      <Section title="Risk Levels">
        <div className="grid gap-8">
          <RiskCard title="Low Risk" color="text-emerald-400" border="border-emerald-500/20"
            approvals={["None"]} log="Yes" undo="Not required"
            examples={["Get current volume", "Get current song", "List files", "Read system information", "Take screenshot"]} />

          <RiskCard title="Medium Risk" color="text-amber-400" border="border-amber-500/20"
            approvals={["WhatsApp approval", "Trusted Session"]} log="Yes" undo="Recommended"
            examples={["Open applications", "Play music", "Send files", "Change volume", "Create folders"]} />

          <RiskCard title="High Risk" color="text-rose-400" border="border-rose-500/20"
            approvals={["Required every time", "Trusted Session cannot bypass"]} log="Yes" undo="Required whenever possible"
            examples={["Delete files", "Install software", "Modify configurations", "Run shell commands"]} />
        </div>
      </Section>

      {/* Approval Flow */}
      <Section title="Approval Flow">
        <div className="grid gap-8">
          <div className="rounded-[40px] border border-amber-500/10 bg-amber-500/[0.03] p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 text-sm font-black">M</div>
              <h3 className="text-xl font-black uppercase tracking-tight">Medium Risk</h3>
            </div>
            <p className="text-white/60 mb-6">AI proposes action. User must reply with approval code.</p>
            <div className="rounded-3xl border border-white/5 bg-[#03040b] p-6 font-mono text-sm space-y-3">
              <p className="text-emerald-400/80">AI: &quot;Open Visual Studio Code&quot;</p>
              <p className="text-white/30">Risk: Medium</p>
              <p className="text-white/30">Reply: <span className="text-sky-400">APPROVE A82K</span></p>
              <p className="text-white/40 text-xs">Execution begins only after approval.</p>
            </div>
          </div>

          <div className="rounded-[40px] border border-rose-500/10 bg-rose-500/[0.03] p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500/10 text-rose-400 text-sm font-black">H</div>
              <h3 className="text-xl font-black uppercase tracking-tight">High Risk</h3>
            </div>
            <p className="text-white/60 mb-6">AI proposes action and shows impact. User must confirm.</p>
            <div className="rounded-3xl border border-white/5 bg-[#03040b] p-6 font-mono text-sm space-y-3">
              <p className="text-emerald-400/80">AI: &quot;Delete Downloads Folder&quot;</p>
              <p className="text-white/30">Files affected: 1,284</p>
              <p className="text-white/30">Risk: High</p>
              <p className="text-white/30">Reply: <span className="text-sky-400">APPROVE K91P</span></p>
              <p className="text-white/40 text-xs">Execution begins only after confirmation.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Audit & Undo */}
      <Section title="Audit Log">
        <div className="rounded-[40px] border border-white/5 bg-[#0a0c10]/60 p-8 lg:p-12">
          <p className="text-white/60 mb-6">Every action records:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {["Timestamp", "Contact", "Action type", "Parameters", "Approval method", "Result", "Undo reference"].map((f) => (
              <div key={f} className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 text-sm text-white/40 font-black uppercase tracking-wider">
                {f}
              </div>
            ))}
          </div>
          <p className="text-rose-400 text-sm font-black uppercase tracking-wider mt-6">Logs cannot be edited.</p>
        </div>
      </Section>

      <Section title="Undo Journal">
        <div className="rounded-[40px] border border-emerald-500/10 bg-emerald-500/[0.03] p-8 lg:p-12">
          <p className="text-white/60 mb-6">Every reversible action receives an Undo ID.</p>
          <div className="rounded-3xl border border-white/5 bg-[#03040b] p-6 font-mono text-sm space-y-3">
            <p className="text-white/30">Action: Move 25 screenshots</p>
            <p className="text-emerald-400">Undo ID: <span className="text-sky-400 font-black">UNDO-4821</span></p>
            <p className="text-white/30 mt-4">User: <span className="text-sky-400">Undo UNDO-4821</span></p>
            <p className="text-emerald-400/80">Whatszara restores original state.</p>
          </div>
        </div>
      </Section>

      {/* Security Guarantees */}
      <Section title="Security Guarantees">
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            "Shell access disabled by default",
            "All actions pass policy evaluation",
            "Contact allowlist enforced before action generation",
            "High-risk actions always require approval",
            "Trusted sessions never bypass high-risk approval",
            "All actions are logged",
            "Reversible actions are journaled",
            "Permissions are configurable per tool",
          ].map((g) => (
            <div key={g} className="flex items-center gap-4 rounded-3xl border border-white/5 bg-white/[0.03] p-6">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <span className="text-sm font-medium text-white/60">{g}</span>
            </div>
          ))}
        </div>
      </Section>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-black uppercase tracking-tight text-white">{title}</h2>
      {children}
    </section>
  );
}

function ModeCard({ title, color, border, bg, desc, examples, note, children }: {
  title: string; color: string; border: string; bg: string;
  desc: string; examples: string[]; note: string; children?: React.ReactNode;
}) {
  return (
    <div className={`rounded-[40px] border ${border} ${bg} p-8 lg:p-10`}>
      <h3 className={`text-2xl font-black uppercase tracking-tight mb-4 ${color}`}>{title}</h3>
      <p className="text-white/60 mb-4">{desc}</p>
      {examples.length > 0 && (
        <ul className="grid gap-2 sm:grid-cols-2 text-white/50 text-sm mb-4">
          {examples.map((e) => (
            <li key={e} className="flex items-center gap-2"><span className={`h-1.5 w-1.5 rounded-full ${color.replace('text', 'bg')}`} /> {e}</li>
          ))}
        </ul>
      )}
      {children}
      {note && <p className="text-sm font-black uppercase tracking-wider text-white/20 mt-4">{note}</p>}
    </div>
  );
}

function PermCard({ title, defaultState, stateColor, actions, note }: {
  title: string; defaultState: string; stateColor: string;
  actions: string[]; note?: string;
}) {
  return (
    <div className="rounded-[40px] border border-white/5 bg-[#0a0c10]/50 p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-black uppercase tracking-tight">{title}</h3>
        <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${stateColor}`}>{defaultState}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {actions.map((a) => (
          <code key={a} className="rounded-full border border-white/5 bg-white/[0.03] px-4 py-2 text-[11px] font-mono text-white/40">{a}</code>
        ))}
      </div>
      {note && <p className="text-[10px] font-black uppercase tracking-wider text-rose-400/60 mt-4">{note}</p>}
    </div>
  );
}

function RiskCard({ title, color, border, approvals, log, undo, examples }: {
  title: string; color: string; border: string;
  approvals: string[]; log: string; undo: string; examples: string[];
}) {
  return (
    <div className={`rounded-[40px] border ${border} bg-[#0a0c10]/40 p-8 lg:p-10`}>
      <div className="flex items-center gap-4 mb-6">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 ${color}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <h3 className={`text-2xl font-black uppercase tracking-tight ${color}`}>{title}</h3>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-3">Examples</p>
          <ul className="space-y-2 text-white/50 text-sm">
            {examples.map((e) => (
              <li key={e} className="flex items-center gap-2"><span className={`h-1.5 w-1.5 rounded-full ${color.replace('text', 'bg')}`} /> {e}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          {approvals.length > 0 && (
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-2">Approval</p>
              {approvals.map((a) => (
                <p key={a} className="text-sm text-white/50 flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/20" /> {a}</p>
              ))}
            </div>
          )}
          <div className="flex gap-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-1">Logged</p>
              <p className={`text-sm font-black ${log === "Yes" ? "text-emerald-400" : "text-white/40"}`}>{log}</p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-1">Undo</p>
              <p className="text-sm text-white/50">{undo}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
