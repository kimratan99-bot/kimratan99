import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

/* ──────────────────────────────────────────
   Neon Postgres 데이터베이스 연결
   - Vercel 환경변수 DATABASE_URL을 자동으로 사용합니다.
   - 이 파일을 import하면 어디서든 db를 사용할 수 있습니다.
   ────────────────────────────────────────── */

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema });

export default db;
