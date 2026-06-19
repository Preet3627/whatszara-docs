"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_INFO } from "@/lib/version";

export const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Features", href: "#features" },
    { label: "Downloads", href: "#downloads" },
    { label: "GitHub", href: APP_INFO.github, external: true },
    { label: "Docs", href: "/docs" },
  ];

  return (
    <nav className="fixed left-0 top-0 z-[60] w-full bg-transparent py-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-12">
        <Link href="/" className="flex items-center gap-3 cursor-pointer group">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl shadow-lg shadow-emerald-500/20">
            <img src="/icon.png" alt="Whatszara Logo" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black uppercase tracking-tighter leading-none">{APP_INFO.name}</span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400/60">Desktop Assistant</span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) =>
            item.external ? (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 transition hover:text-emerald-400">
                {item.label}
              </a>
            ) : (
              <Link key={item.label} href={item.href}
                    className={`text-[10px] font-black uppercase tracking-[0.3em] transition ${pathname === item.href ? "text-emerald-400" : "text-white/40 hover:text-emerald-400"}`}>
                {item.label}
              </Link>
            )
          )}
        </div>

        <Link href="#downloads"
              className="hidden rounded-full bg-emerald-500 px-6 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-black transition hover:bg-emerald-400 sm:block">
          Get Whatszara
        </Link>
      </div>
    </nav>
  );
};
