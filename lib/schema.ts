import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

/* ──────────────────────────────────────────
   데이터베이스 스키마 정의
   - 여기에 새로운 테이블을 추가하세요.
   - 수정 후 npm run db:push 로 DB에 반영합니다.
   ────────────────────────────────────────── */

// ── 사용자 테이블 ──
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  role: varchar("role", { length: 20 }).default("student"), // student, teacher, admin
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ── 학습 기록 테이블 ──
export const learningRecords = pgTable("learning_records", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  subject: varchar("subject", { length: 50 }).notNull(),  // 예: "이차함수", "근의공식"
  question: text("question").notNull(),
  answer: text("answer"),
  isCorrect: boolean("is_correct"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ── 챗봇 대화 기록 테이블 ──
export const chatHistory = pgTable("chat_history", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 100 }).notNull(),
  role: varchar("role", { length: 20 }).notNull(), // user, assistant
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ──────────────────────────────────────────
   여기에 새로운 테이블을 추가하세요.
   예시:
   export const quizzes = pgTable("quizzes", { ... });
   export const courses = pgTable("courses", { ... });
   ────────────────────────────────────────── */
