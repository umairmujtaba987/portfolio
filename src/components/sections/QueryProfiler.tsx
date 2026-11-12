"use client";

import { useState } from "react";
import { Database, Play, CheckCircle2, AlertTriangle, Zap, Server } from "lucide-react";
import { playClickSound, playSuccessChime } from "@/lib/sounds";

interface BenchmarkResult {
  queryName: string;
  indexType: string;
  datasetSize: string;
  rowsScanned: number;
  unindexedTimeMs: number;
  indexedTimeMs: number;
  speedupPercentage: number;
  planComparison: {
    unindexed: string;
    indexed: string;
  };
}

export function QueryProfiler() {
  const [queryType, setQueryType] = useState<"immunization_aggregate" | "disease_surveillance" | "inventory_audit">("immunization_aggregate");
  const [datasetSize, setDatasetSize] = useState<"100k" | "500k" | "2M" | "5M">("500k");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BenchmarkResult>({
    queryName: "District Child Immunization Rollup (SMC/ZD Tracker)",
    indexType: "Composite Covering Index (status, date) INCLUDE (district_id)",
    datasetSize: "500k",
    rowsScanned: 500000,
    unindexedTimeMs: 4200,
    indexedTimeMs: 38,
    speedupPercentage: 99.1,
    planComparison: {
      unindexed: "Seq Scan on child_immunization_records -> Filter -> Disk Temp Spill",
      indexed: "Index Only Scan using mv_rollup_covering_idx -> In-Memory Hash Aggregate",
    },
  });

  const runBenchmark = async () => {
    playClickSound();
    setLoading(true);

    try {
      const res = await fetch("/api/query-benchmark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ queryType, datasetSize }),
      });

      const data = await res.json();
      if (data.success) {
        setResult(data.data);
        playSuccessChime();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="query-profiler" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <Database size={14} /> 02. The Query Profiler // Database Engineering
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            High-Throughput Query Optimization.
          </h2>
          <p className="text-zinc-400 max-w-2xl mt-3 text-sm sm:text-base">
            Simulate real PostgreSQL & MySQL query execution plans from production workloads. Benchmark unindexed table scans against covering indexes, materialized CTEs, and partial indexing.
          </p>
        </div>

        {/* Profiler Workstation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0c0e14] border border-white/10 space-y-6">
            <div>
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2.5">
                Target Workload
              </label>
              <div className="space-y-2">
                {[
                  {
                    id: "immunization_aggregate",
                    label: "SMC Child Immunization Rollup",
                    desc: "PostgreSQL Materialized View & Covering Index",
                  },
                  {
                    id: "disease_surveillance",
                    label: "IDIMS Disease Outbreak Surveillance",
                    desc: "MySQL Correlated Subquery -> Hash Join Optimization",
                  },
                  {
                    id: "inventory_audit",
                    label: "HMC Booking Mutex Release",
                    desc: "Laravel Cron Partial Index Lock-Free Scan",
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      playClickSound();
                      setQueryType(item.id as typeof queryType);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs font-mono transition-all ${
                      queryType === item.id
                        ? "bg-cyan-500/10 border-cyan-500/50 text-white shadow-[0_0_15px_rgba(0,242,254,0.1)]"
                        : "bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:border-white/20"
                    }`}
                  >
                    <div className="font-semibold text-zinc-200">{item.label}</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Dataset Size Selector */}
            <div>
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2.5">
                Dataset Scale (Rows Scanned)
              </label>
              <div className="grid grid-cols-4 gap-2 font-mono text-xs">
                {(["100k", "500k", "2M", "5M"] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      playClickSound();
                      setDatasetSize(size);
                    }}
                    className={`py-2 rounded-lg border text-center transition-all ${
                      datasetSize === size
                        ? "bg-cyan-400 text-zinc-950 font-bold border-cyan-400"
                        : "bg-white/[0.02] border-white/[0.08] text-zinc-400 hover:text-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Execute Button */}
            <button
              onClick={runBenchmark}
              disabled={loading}
              data-cursor="run"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-zinc-950 font-mono font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-50 shadow-lg shadow-cyan-500/20"
            >
              <Play size={14} className={loading ? "animate-spin" : "fill-current"} />
              {loading ? "EXECUTING EXPLAIN ANALYZE..." : "BENCHMARK QUERY LATENCY"}
            </button>
          </div>

          {/* Results Telemetry Display */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-[#090b10] border border-white/10 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div>
                <span className="text-[11px] font-mono text-zinc-500 uppercase">Active Telemetry</span>
                <div className="text-sm font-mono font-bold text-white mt-0.5">{result.queryName}</div>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
                <Zap size={13} /> {result.speedupPercentage}% FASTER
              </div>
            </div>

            {/* Latency Comparison Bars */}
            <div className="space-y-4 font-mono text-xs">
              <div>
                <div className="flex justify-between text-zinc-400 mb-1.5">
                  <span className="flex items-center gap-1 text-red-400">
                    <AlertTriangle size={13} /> Unindexed Query Latency
                  </span>
                  <span className="text-red-400 font-bold">{result.unindexedTimeMs} ms</span>
                </div>
                <div className="h-3 w-full bg-white/[0.04] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500/80 rounded-full transition-all duration-700"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="text-[11px] text-zinc-500 mt-1">{result.planComparison.unindexed}</div>
              </div>

              <div>
                <div className="flex justify-between text-zinc-400 mb-1.5">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 size={13} /> Indexed & Optimized Latency
                  </span>
                  <span className="text-emerald-400 font-bold">{result.indexedTimeMs} ms</span>
                </div>
                <div className="h-3 w-full bg-white/[0.04] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.max(
                        (result.indexedTimeMs / result.unindexedTimeMs) * 100,
                        2.5
                      )}%`,
                    }}
                  />
                </div>
                <div className="text-[11px] text-zinc-500 mt-1">{result.planComparison.indexed}</div>
              </div>
            </div>

            {/* Metrics Chips */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/[0.06]">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-[10px] font-mono text-zinc-500 uppercase">Rows Evaluated</div>
                <div className="text-base font-bold font-mono text-zinc-200 mt-0.5">
                  {new Intl.NumberFormat().format(result.rowsScanned)}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-[10px] font-mono text-zinc-500 uppercase">Latency Reduction</div>
                <div className="text-base font-bold font-mono text-cyan-300 mt-0.5">
                  -{(result.unindexedTimeMs - result.indexedTimeMs).toFixed(0)} ms
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-[10px] font-mono text-zinc-500 uppercase">Lock Contention</div>
                <div className="text-base font-bold font-mono text-emerald-400 mt-0.5">
                  Zero Lock (MVCC)
                </div>
              </div>
            </div>

            {/* Applied Strategy Tag */}
            <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs font-mono text-zinc-300">
              <span className="text-cyan-400 font-semibold">Index Strategy Applied: </span>
              {result.indexType}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

