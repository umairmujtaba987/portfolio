import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Umair Mujtaba — Software Engineer | Distributed Systems & Backend",
  description:
    "Portfolio of Umair Mujtaba, a Backend & Systems Software Engineer specializing in Laravel, FastAPI, Django, CodeIgniter, PostgreSQL optimization, and high-throughput enterprise systems.",
  keywords: [
    "Umair Mujtaba",
    "Software Engineer",
    "Backend Engineer",
    "Laravel",
    "FastAPI",
    "PostgreSQL Optimization",
    "CodeIgniter",
    "Distributed Systems",
    "Islamabad",
    "Healthcare Systems",
  ],
  authors: [{ name: "Umair Mujtaba" }],
  openGraph: {
    title: "Umair Mujtaba — Software Engineer | Distributed Systems & Backend",
    description:
      "Architecting fault-tolerant backend systems, bulletproof databases & low-latency APIs. Built for high-volume enterprise telemetry.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Umair Mujtaba — Software Engineer",
    description: "Distributed Systems & High-Volume Backend Architecture.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
    >
      <body className="min-h-screen bg-[#07080b] text-[#f3f4f6] selection:bg-cyan-500/20 selection:text-cyan-200 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
