import { NextResponse } from "next/server";
import db from "@/lib/db";
import { users } from "@/lib/schema";

/* ──────────────────────────────────────────
   DB 연결 테스트 API
   GET /api/db-test → DB 연결 상태 확인
   ────────────────────────────────────────── */

export async function GET() {
  try {
    // 간단한 쿼리로 연결 테스트
    const result = await db.select().from(users).limit(1);
    return NextResponse.json({
      status: "connected",
      message: "Neon Postgres 연결 성공!",
      userCount: result.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        message: error.message || "DB 연결 실패",
      },
      { status: 500 }
    );
  }
}
