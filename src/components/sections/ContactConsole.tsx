"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { Send, Mail, Phone, MapPin, CheckCircle, AlertCircle, Download, FileText } from "lucide-react";
import { submitContactMessage } from "@/server/actions/contact";
import { playClickSound, playSuccessChime } from "@/lib/sounds";
import { PROFILE } from "@/lib/data";

export function ContactConsole() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    success?: boolean;
    message?: string;
    fieldErrors?: Record<string, string[]>;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    setLoading(true);
    setStatus(null);

    try {
      const response = await submitContactMessage(formData);
      setStatus(response);

      if (response.success) {
        playSuccessChime();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#00f2fe", "#10b981", "#ffffff"],
        });
        setFormData({ name: "", email: "", company: "", budget: "", message: "" });
      }
    } catch {
      setStatus({
        success: false,
        message: "Network transmission error. Please reach out directly via email.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <Mail size={14} /> 05. Dispatch Console // Direct Link
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Initiate Collaboration.
          </h2>
          <p className="text-zinc-400 max-w-xl mt-3 text-sm sm:text-base">
            Looking for a Senior Backend Specialist or Distributed Systems Engineer? Transmit your project details or schedule a technical discussion.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Direct Communication Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0c0e14] border border-white/[0.08] space-y-6">
              <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,242,254,0.8)]" />
                Direct Communication Node
              </h3>

              <div className="space-y-4 font-mono text-xs">
                <a
                  href={`mailto:${PROFILE.email}`}
                  onClick={playClickSound}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-400/40 text-zinc-300 hover:text-cyan-300 transition-colors"
                >
                  <Mail size={16} className="text-cyan-400 shrink-0" />
                  <span className="truncate">{PROFILE.email}</span>
                </a>

                <a
                  href={`tel:${PROFILE.phone}`}
                  onClick={playClickSound}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-400/40 text-zinc-300 hover:text-emerald-300 transition-colors"
                >
                  <Phone size={16} className="text-emerald-400 shrink-0" />
                  <span>{PROFILE.phone}</span>
                </a>

                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClickSound}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-400/40 text-zinc-300 hover:text-cyan-300 transition-colors"
                >
                  <svg className="w-4 h-4 text-cyan-400 shrink-0 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span className="truncate">linkedin.com/in/umair-mujtaba-425981181</span>
                </a>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-zinc-300">
                  <MapPin size={16} className="text-amber-400 shrink-0" />
                  <span>Islamabad, Pakistan (UTC+5 / PKT)</span>
                </div>
              </div>

              {/* Resume Download Feature */}
              <div className="pt-4 border-t border-white/[0.06]">
                <a
                  href={PROFILE.resumePath}
                  download="UmairMujtaba_SE_Resume.pdf"
                  onClick={playClickSound}
                  className="w-full py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-400/40 text-white font-mono text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <Download size={14} className="text-cyan-400" />
                  <span>Download UmairMujtaba_SE_Resume.pdf</span>
                </a>
              </div>
            </div>
          </div>

          {/* Type-Safe Server Action Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#0c0e14] border border-white/[0.08]">
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 uppercase tracking-wider block mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Alexander Vance"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-400 focus:outline-none text-zinc-100 placeholder-zinc-600 transition-all"
                  />
                  {status?.fieldErrors?.name && (
                    <span className="text-red-400 text-[10px] mt-1 block">
                      {status.fieldErrors.name[0]}
                    </span>
                  )}
                </div>

                <div>
                  <label className="text-zinc-400 uppercase tracking-wider block mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alexander@enterprise.org"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-400 focus:outline-none text-zinc-100 placeholder-zinc-600 transition-all"
                  />
                  {status?.fieldErrors?.email && (
                    <span className="text-red-400 text-[10px] mt-1 block">
                      {status.fieldErrors.email[0]}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 uppercase tracking-wider block mb-1.5">
                    Organization / Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. HealthTech Global"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-400 focus:outline-none text-zinc-100 placeholder-zinc-600 transition-all"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 uppercase tracking-wider block mb-1.5">
                    Scope / Budget
                  </label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="e.g. Full-time / Consulting"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-400 focus:outline-none text-zinc-100 placeholder-zinc-600 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-400 uppercase tracking-wider block mb-1.5">
                  Project Architectural Scope & Inquiries *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detail your backend architecture, query optimization requirements, or engineering team needs..."
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-400 focus:outline-none text-zinc-100 placeholder-zinc-600 transition-all resize-none"
                />
                {status?.fieldErrors?.message && (
                  <span className="text-red-400 text-[10px] mt-1 block">
                    {status.fieldErrors.message[0]}
                  </span>
                )}
              </div>

              {/* Status Banner */}
              {status && (
                <div
                  className={`p-4 rounded-xl flex items-start gap-2.5 text-xs ${
                    status.success
                      ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
                      : "bg-red-500/10 border border-red-500/30 text-red-300"
                  }`}
                >
                  {status.success ? (
                    <CheckCircle size={16} className="shrink-0 mt-0.5 text-emerald-400" />
                  ) : (
                    <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-400" />
                  )}
                  <span>{status.message}</span>
                </div>
              )}

              {/* Submit Trigger */}
              <button
                type="submit"
                disabled={loading}
                data-cursor="send"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-zinc-950 font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-50 shadow-lg shadow-cyan-500/20"
              >
                <Send size={14} className={loading ? "animate-spin" : ""} />
                <span>{loading ? "TRANSMITTING PAYLOAD..." : "DISPATCH TRANSMISSION"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

