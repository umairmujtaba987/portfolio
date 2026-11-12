import { NextResponse } from "next/server";
import { queryBenchmarkSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = queryBenchmarkSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.format() },
        { status: 400 }
      );
    }

    const { queryType, datasetSize } = parsed.data;

    // Simulation multiplier based on dataset size
    const sizeMultiplier: Record<string, { factor: number; rows: number }> = {
      "100k": { factor: 1, rows: 100000 },
      "500k": { factor: 3.5, rows: 500000 },
      "2M": { factor: 12.2, rows: 2000000 },
      "5M": { factor: 28.5, rows: 5000000 },
    };

    const multiplier = sizeMultiplier[datasetSize] || { factor: 1, rows: 100000 };

    let baseUnindexed = 1200;
    let baseIndexed = 25;
    let queryName = "District Child Immunization Rollup";
    let indexType = "Composite Covering Index (status, date) INCLUDE (district_id)";

    if (queryType === "disease_surveillance") {
      baseUnindexed = 3400;
      baseIndexed = 42;
      queryName = "Multi-District Outbreak Case Aggregate";
      indexType = "Derived Hash Join + B-Tree index on (outbreak_id, reported_date)";
    } else if (queryType === "inventory_audit") {
      baseUnindexed = 520;
      baseIndexed = 12;
      queryName = "Expired Reservation Mutex Release";
      indexType = "Filtered Partial Index (status = 'pending') on created_at";
    }

    const unindexedMs = Math.round((baseUnindexed * multiplier.factor) + (Math.random() * 80 - 40));
    const indexedMs = Math.round((baseIndexed * Math.log10(multiplier.rows / 10000)) + (Math.random() * 6 - 3));
    const speedup = ((unindexedMs - indexedMs) / unindexedMs) * 100;

    // Store in Prisma benchmark history
    try {
      await prisma.queryBenchmarkRun.create({
        data: {
          queryType,
          unindexedMs,
          indexedMs: Math.max(indexedMs, 4),
          rowsScanned: multiplier.rows,
        },
      });
    } catch {
      // Non-blocking log
    }

    return NextResponse.json({
      success: true,
      data: {
        queryName,
        indexType,
        datasetSize,
        rowsScanned: multiplier.rows,
        unindexedTimeMs: unindexedMs,
        indexedTimeMs: Math.max(indexedMs, 4),
        speedupPercentage: Math.min(Math.round(speedup * 10) / 10, 99.2),
        planComparison: {
          unindexed: "Seq Scan on table -> Filter -> Sort -> Aggregate (Disk Temp File Spill)",
          indexed: "Index Only Scan using covering_idx -> Parallel Hash Aggregate (In-Memory)",
        },
      },
    });
  } catch (error) {
    console.error("Benchmark error:", error);
    return NextResponse.json(
      { success: false, error: "Benchmark computation failed" },
      { status: 500 }
    );
  }
}

