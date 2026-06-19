import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Whatszara — Desktop Assistant via WhatsApp + LLM",
  description: "Control your desktop from anywhere using WhatsApp messages. Talk to an LLM through WhatsApp, and it executes your commands with a secure permission system.",
  icons: {
    icon: "/favicon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Whatszara — Desktop Assistant via WhatsApp + LLM",
    description: "Control your desktop from anywhere using WhatsApp messages via LLM-powered automation.",
    type: "website",
    images: ["/icon.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-outfit">{children}</body>
    </html>
  );
}
