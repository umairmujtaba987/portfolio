"use client";

import { useState } from "react";
import { Network, Server, Shield, Database, Cpu, Zap, Radio, CheckCircle } from "lucide-react";
import { playClickSound } from "@/lib/sounds";

interface TopologyNode {
  id: string;
  name: string;
  type: "ingress" | "service" | "cache" | "database" | "worker";
  status: "healthy" | "active";
  latency: string;
  role: string;
}

export function ArchitectureSandbox() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("postgres");

  const nodes: TopologyNode[] = [
    {
      id: "ingress",
      name: "API Gateway (FastAPI / Nginx)",
      type: "ingress",
      status: "active",
      latency: "1.2 ms",
      role: "High-throughput asynchronous rate-limiting, SSL termination, and batch payload validation.",
    },
    {
      id: "cache",
      name: "Redis State & Ephemeral Locks",
      type: "cache",
      status: "healthy",
      latency: "0.8 ms",
      role: "Distributed sliding-window rate limiters, session caches, and pessimistic reservation locks.",
    },
    {
      id: "service",
      name: "Laravel & FastAPI Core Services",
      type: "service",
      status: "active",
      latency: "8.5 ms",
      role: "Domain business logic, transactional state machines, and RESTful service orchestration.",
    },
    {
      id: "postgres",
      name: "PostgreSQL Primary (Indexed)",
      type: "database",
      status: "healthy",
      latency: "14.2 ms",
      role: "ACID compliance, schema sharding, composite covering indexes, and materialized reporting rollups.",
    },
    {
      id: "worker",
      name: "Cron & Queue Background Workers",
      type: "worker",
      status: "active",
      latency: "Background",
      role: "Asynchronous notification dispatch, expired mutex cleanup, and CDC data reconciliation.",
    },
  ];

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[3];

  return (
    <section id="architecture" className="py-24 relative bg-[#07090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <Network size={14} /> 03. System Architecture // The Engine Room
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Distributed Reliability & Design Principles.
          </h2>
          <p className="text-zinc-400 max-w-2xl mt-3 text-sm sm:text-base">
            Every architectural decision is guided by strict fault tolerance, zero-loss idempotency, and predictable low latency under high load.
          </p>
        </div>

        {/* Interactive Topology Sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Topology Canvas */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-[#0a0d13] border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between pb-6 border-b border-white/[0.06] mb-6">
              <span className="text-xs font-mono text-zinc-400 uppercase flex items-center gap-2">
                <Radio size={14} className="text-emerald-400 animate-pulse" /> Live Cluster Topology Simulation
              </span>
              <span className="text-xs font-mono text-cyan-400">STATUS: 100% OPERATIONAL</span>
            </div>

            {/* Interactive Node Flow */}
            <div className="space-y-4">
              {nodes.map((node) => (
                <div
                  key={node.id}
                  onClick={() => {
                    playClickSound();
                    setSelectedNodeId(node.id);
                  }}
                  className={`p-4 rounded-xl border font-mono transition-all cursor-pointer flex items-center justify-between ${
                    selectedNodeId === node.id
                      ? "bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_20px_rgba(0,242,254,0.15)]"
                      : "bg-white/[0.02] border-white/[0.06] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        node.status === "active" ? "bg-cyan-400 animate-pulse" : "bg-emerald-400"
                      }`}
                    />
                    <div>
                      <div className="text-sm font-bold text-white">{node.name}</div>
                      <div className="text-xs text-zinc-500">{node.type.toUpperCase()} NODE</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-cyan-300 font-bold">{node.latency}</span>
                    <div className="text-[10px] text-emerald-400 uppercase">{node.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Node Inspector Card */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-[#0c0e14] border border-white/10 space-y-5">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Cpu size={14} /> Node Telemetry Inspector
            </div>

            <div>
              <h3 className="text-xl font-bold text-white font-mono">{selectedNode.name}</h3>
              <div className="text-xs font-mono text-zinc-500 mt-1 uppercase">
                Architecture Spec // {selectedNode.type}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs leading-relaxed text-zinc-300">
              {selectedNode.role}
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between py-2 border-b border-white/[0.06]">
                <span className="text-zinc-500">Service Latency</span>
                <span className="text-cyan-300 font-bold">{selectedNode.latency}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/[0.06]">
                <span className="text-zinc-500">Availability</span>
                <span className="text-emerald-400 font-bold">99.99%</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-zinc-500">Failure Domain</span>
                <span className="text-zinc-300">Automated Circuit Breaker</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Backend Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {[
            {
              title: "Idempotent State Machines",
              desc: "Ensure retry-safe webhook ingestion, pessimistic reservation mutex locks, and distributed state consistency.",
              icon: Shield,
            },
            {
              title: "Sub-50ms Indexing",
              desc: "Covering indexes, composite B-Trees, and materialized views replacing unindexed N+1 queries.",
              icon: Database,
            },
            {
              title: "Zero-Downtime Refactoring",
              desc: "Stabilizing fragile legacy systems (PHP 5.6 / CI 2) while maintaining 100% production uptime.",
              icon: Server,
            },
            {
              title: "Async Event Queues",
              desc: "Decoupling heavy reporting, contract generation, and notifications into Redis/database queue workers.",
              icon: Zap,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/[0.015] border border-white/[0.06] hover:border-cyan-500/30 transition-all space-y-3"
            >
              <item.icon size={20} className="text-cyan-400" />
              <h4 className="text-base font-bold text-white font-mono">{item.title}</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

