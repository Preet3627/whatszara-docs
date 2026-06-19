export default function Permissions() {
  return (
    <article className="space-y-12">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">
        Security
      </div>
      <h1 className="text-5xl font-black uppercase tracking-tighter sm:text-6xl">Policy & Permissions</h1>
      <p className="text-xl font-medium leading-relaxed text-white/40">
        Whatszara uses a propose → evaluate → execute flow. Every action is validated against policy before execution.
      </p>

      <Section title="Risk Profiles">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="p-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Risk Level</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Example Actions</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Verification Required</th>
              </tr>
            </thead>
            <tbody className="text-white/60">
              <tr className="border-b border-white/5">
                <td className="p-4 font-black text-emerald-400">Low</td>
                <td className="p-4">Read volume, list files, get time</td>
                <td className="p-4">None (logged only)</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="p-4 font-black text-amber-400">Medium</td>
                <td className="p-4">Open apps, play music, send files</td>
                <td className="p-4">Image-to-text CAPTCHA</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="p-4 font-black text-rose-400">High</td>
                <td className="p-4">Shell commands, delete, install</td>
                <td className="p-4">reCAPTCHA + image-to-text + confirm</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Per-Tool Permissions">
        <p className="text-white/60">Each tool category can be independently enabled or disabled:</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="p-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Category</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Default</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Actions</th>
              </tr>
            </thead>
            <tbody className="text-white/60">
              <tr className="border-b border-white/5">
                <td className="p-4 font-black text-rose-400">Shell</td>
                <td className="p-4 text-rose-400 font-black">Disabled</td>
                <td className="p-4">execute_shell, run_command</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="p-4 font-black">File Access</td>
                <td className="p-4 text-emerald-400 font-black">Enabled</td>
                <td className="p-4">list_files, list_images, send_file, get_desktop_paths</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="p-4 font-black">Media Control</td>
                <td className="p-4 text-emerald-400 font-black">Enabled</td>
                <td className="p-4">get_volume, set_volume, play_media, pause_media, next_track, prev_track</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="p-4 font-black">App Launching</td>
                <td className="p-4 text-emerald-400 font-black">Enabled</td>
                <td className="p-4">open_app</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="p-4 font-black">WhatsApp</td>
                <td className="p-4 text-emerald-400 font-black">Enabled</td>
                <td className="p-4">send_message, search_contacts, list_chats</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-white/40 mt-4">Shell is disabled by default for safety. Enable it explicitly in the Permissions tab.</p>
      </Section>

      <Section title="Allowlist">
        <div className="space-y-4 text-white/60">
          <p>Only WhatsApp JIDs in the allowlist can control the assistant.</p>
          <ul className="space-y-2">
            <li>• Default: only <code className="text-emerald-400">self</code> is in the allowlist</li>
            <li>• Add contacts via the Permissions tab in the GUI</li>
            <li>• Non-allowed contacts: mode defaults to Summarize (2-3 sentence summary)</li>
            <li>• Can also be configured programmatically via the <code className="text-emerald-400">update_allowlist</code> Tauri command</li>
          </ul>
        </div>
      </Section>

      <Section title="Contact Modes">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="p-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Mode</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Behavior</th>
              </tr>
            </thead>
            <tbody className="text-white/60">
              <tr className="border-b border-white/5">
                <td className="p-4 font-black text-emerald-400">Assistant</td>
                <td className="p-4">Full desktop control — LLM can execute actions on your behalf</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="p-4 font-black text-sky-400">Chat</td>
                <td className="p-4">LLM responds with text only — no actions executed</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="p-4 font-black text-amber-400">Summarize</td>
                <td className="p-4">Messages are summarized in 2-3 sentences (default mode)</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="p-4 font-black text-rose-400">Blocked</td>
                <td className="p-4">Contact is rejected at the policy level — no response sent</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Execution Flow">
        <div className="space-y-4">
          {[
            ["1", "Message arrives from WhatsApp"],
            ["2", "Policy engine checks allowlist + contact mode"],
            ["3", "If Blocked → rejected. If Chat → LLM responds (no actions). If Summarize → LLM summarizes"],
            ["4", "If Assistant → LLM interprets and proposes an action"],
            ["5", "Policy engine evaluates: tool enabled? risk level? verification needed?"],
            ["6", "If approved → action executes. Result logged in undo journal"],
            ["7", "If requires verification → contact must complete CAPTCHA/confirmation first"],
          ].map(([num, text]) => (
            <div key={num} className="flex items-start gap-6 rounded-3xl border border-white/5 bg-[#0a0c10]/40 p-6">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-black">{num}</span>
              <span className="text-white/60">{text}</span>
            </div>
          ))}
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
