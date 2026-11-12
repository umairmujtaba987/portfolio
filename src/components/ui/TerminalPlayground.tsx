"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from "lucide-react";
import { playClickSound } from "@/lib/sounds";
import { PROFILE, PROJECTS, EXPERIENCES, SKILL_CATEGORIES } from "@/lib/data";

interface TerminalPlaygroundProps {
  isModal?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

interface CommandLog {
  command?: string;
  output: string | React.ReactNode;
  isError?: boolean;
}

export function TerminalPlayground({
  isModal = false,
  isOpen = false,
  onClose,
}: TerminalPlaygroundProps) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      output: (
        <div>
          <span className="text-cyan-400 font-bold">UMAIR_OS v2.4.0 (x86_64-pc-systems)</span>
          <div className="text-zinc-400 text-xs mt-1">
            Type <span className="text-cyan-300 font-semibold underline">help</span> to view available system commands or <span className="text-cyan-300 font-semibold underline">cat resume</span>.
          </div>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isModal && isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isModal, isOpen]);

  useEffect(() => {
    // Only scroll internal terminal box when user runs commands
    if (logs.length > 1 && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [logs.length]);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    playClickSound();
    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    const parts = cmd.toLowerCase().split(" ");
    const mainCmd = parts[0];

    let response: React.ReactNode = "";

    switch (mainCmd) {
      case "help":
        response = (
          <div className="space-y-1 text-xs">
            <div className="text-cyan-300 font-semibold">Available Commands:</div>
            <div><span className="text-emerald-400">help</span> - Display this reference index</div>
            <div><span className="text-emerald-400">projects</span> - Output flagship architecture projects</div>
            <div><span className="text-emerald-400">skills</span> - Display categorized engineering proficiencies</div>
            <div><span className="text-emerald-400">experience</span> - View career history & production roles</div>
            <div><span className="text-emerald-400">cat resume</span> - View technical resume summary</div>
            <div><span className="text-emerald-400">benchmark</span> - Run simulated query optimization test</div>
            <div><span className="text-emerald-400">download</span> - Download UmairMujtaba_SE_Resume.pdf</div>
            <div><span className="text-emerald-400">contact</span> - Show direct contact details</div>
            <div><span className="text-emerald-400">clear</span> - Flush terminal screen</div>
            {isModal && <div><span className="text-emerald-400">exit</span> - Close terminal window</div>}
          </div>
        );
        break;

      case "projects":
        response = (
          <div className="space-y-2 text-xs">
            <div className="text-cyan-300 font-semibold">Flagship Engineered Systems:</div>
            {PROJECTS.map((p, idx) => (
              <div key={idx} className="border-l-2 border-cyan-500/40 pl-2">
                <span className="text-white font-bold">{p.title}</span>{" "}
                <span className="text-zinc-500">[{p.technologies.slice(0, 3).join(", ")}]</span>
                <div className="text-zinc-400">{p.subtitle}</div>
              </div>
            ))}
          </div>
        );
        break;

      case "skills":
        response = (
          <div className="space-y-3 text-xs">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <div key={idx}>
                <div className="text-cyan-300 font-semibold">{cat.name}:</div>
                <div className="text-zinc-400 pl-2">
                  {cat.skills.map((s) => `${s.name} (${s.level}%)`).join(" • ")}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "experience":
        response = (
          <div className="space-y-2 text-xs">
            {EXPERIENCES.map((e, idx) => (
              <div key={idx} className="border-l-2 border-emerald-500/40 pl-2">
                <div className="text-white font-bold">{e.role} @ {e.company}</div>
                <div className="text-zinc-500 text-[11px]">{e.period} • {e.location}</div>
                <div className="text-zinc-400 mt-1">{e.highlights[0]}</div>
              </div>
            ))}
          </div>
        );
        break;

      case "cat":
        if (parts[1] === "resume" || parts[1] === "resume.json") {
          response = (
            <div className="text-xs space-y-2">
              <div className="text-cyan-300 font-semibold">{PROFILE.name} — {PROFILE.title}</div>
              <div className="text-zinc-300">{PROFILE.bio}</div>
              <div className="text-zinc-400">
                <span className="text-cyan-400">Email:</span> {PROFILE.email} |{" "}
                <span className="text-cyan-400">Phone:</span> {PROFILE.phone} |{" "}
                <span className="text-cyan-400">Location:</span> {PROFILE.location}
              </div>
            </div>
          );
        } else {
          response = <span className="text-red-400">Usage: cat resume</span>;
        }
        break;

      case "benchmark":
        response = (
          <div className="text-xs space-y-1 text-emerald-400 font-mono">
            <div>[BENCHMARK] Executing multi-district query on 1,240,000 synthetic rows...</div>
            <div>- Unindexed Seq Scan: 1,280 ms (High Disk I/O)</div>
            <div>- Indexed Covering Scan: 32 ms (In-Memory Buffer)</div>
            <div className="text-cyan-300 font-bold">✓ Latency Delta: -97.5% drop. Zero lock contention.</div>
          </div>
        );
        break;

      case "contact":
        response = (
          <div className="text-xs space-y-1">
            <div><span className="text-cyan-300">Email:</span> {PROFILE.email}</div>
            <div><span className="text-cyan-300">Phone:</span> {PROFILE.phone}</div>
            <div><span className="text-cyan-300">LinkedIn:</span> {PROFILE.linkedin}</div>
            <div><span className="text-cyan-300">Location:</span> {PROFILE.location} (PKT / UTC+5)</div>
          </div>
        );
        break;

      case "download":
        if (typeof window !== "undefined") {
          const a = document.createElement("a");
          a.href = PROFILE.resumePath;
          a.download = "UmairMujtaba_SE_Resume.pdf";
          a.click();
        }
        response = <span className="text-emerald-400">Initiating resume download...</span>;
        break;

      case "clear":
        setLogs([]);
        return;

      case "exit":
        if (isModal && onClose) {
          onClose();
          return;
        }
        response = <span>Exit available in modal mode.</span>;
        break;

      default:
        response = (
          <span className="text-red-400">
            command not found: {mainCmd}. Type &quot;help&quot; for a list of system commands.
          </span>
        );
    }

    setLogs((prev) => [...prev, { command: rawCmd, output: response }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
      setInputVal("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= history.length) {
          setHistoryIndex(-1);
          setInputVal("");
        } else {
          setHistoryIndex(nextIndex);
          setInputVal(history[nextIndex]);
        }
      }
    }
  };

  const terminalContent = (
    <div className="rounded-2xl bg-[#090b10] border border-white/10 font-mono text-zinc-300 shadow-2xl overflow-hidden flex flex-col h-[460px] sm:h-[500px]">
      {/* Chrome Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border-b border-white/[0.06] select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs text-zinc-500 ml-2 font-mono flex items-center gap-1.5">
            <TerminalIcon size={12} className="text-cyan-400" /> umair@systems:~ (bash)
          </span>
        </div>

        {isModal && onClose && (
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Terminal Screen Body */}
      <div
        ref={scrollContainerRef}
        className="flex-1 p-4 overflow-y-auto space-y-3 text-xs leading-relaxed"
      >
        {logs.map((log, index) => (
          <div key={index} className="space-y-1">
            {log.command && (
              <div className="flex items-center gap-2 text-zinc-500">
                <span className="text-cyan-400">umair@systems:~$</span>
                <span className="text-zinc-200">{log.command}</span>
              </div>
            )}
            <div className="text-zinc-300 pl-4">{log.output}</div>
          </div>
        ))}
      </div>

      {/* Input Line */}
      <div className="p-3 bg-white/[0.01] border-t border-white/[0.06] flex items-center gap-2">
        <span className="text-cyan-400 text-xs font-semibold">umair@systems:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type 'help', 'benchmark', or 'cat resume'..."
          className="flex-1 bg-transparent border-none outline-none text-xs font-mono text-zinc-100 placeholder-zinc-600 focus:ring-0"
        />
        <button
          onClick={() => {
            handleCommand(inputVal);
            setInputVal("");
          }}
          className="text-zinc-500 hover:text-cyan-400 transition-colors p-1"
          aria-label="Send Command"
        >
          <CornerDownLeft size={14} />
        </button>
      </div>
    </div>
  );

  if (!isModal) {
    return terminalContent;
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => {
          playClickSound();
          onClose?.();
        }}
      />
      <div className="relative z-10 w-full max-w-3xl animate-in fade-in zoom-in-95 duration-200">
        {terminalContent}
      </div>
    </div>
  );
}

