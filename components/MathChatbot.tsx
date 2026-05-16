"use client";

import React, { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, GraduationCap, MinusCircle, User } from "lucide-react";

/* ──────────────────────────────────────────
   AI 수학 튜터 챗봇 컴포넌트
   - 우측 하단 플로팅 UI
   - 실시간 스트리밍 대화 지원
   ────────────────────────────────────────── */

export default function MathChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  // 메시지 추가 시 자동 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {/* ── 플로팅 버튼 ── */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-white shadow-2xl hover:bg-indigo-700 transition-colors"
      >
        <MessageCircle size={32} />
        <span className="absolute -top-1 -right-1 flex h-5 w-5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex h-5 w-5 rounded-full bg-red-500 text-[10px] items-center justify-center font-bold">1</span>
        </span>
      </motion.button>

      {/* ── 채팅창 레이어 ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-50 flex h-[600px] w-[400px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-indigo-200/50"
          >
            {/* 헤더 */}
            <div className="flex items-center justify-between bg-indigo-600 px-6 py-4 text-white">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-white/20 p-2">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 className="font-bold">승평 AI 수학 튜터</h3>
                  <p className="text-xs text-indigo-100">무엇이든 물어보세요!</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="rounded-full p-1 hover:bg-white/10 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* 메시지 영역 */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto bg-slate-50 p-6 space-y-4">
              {messages.length === 0 && (
                <div className="flex h-full flex-col items-center justify-center text-center text-slate-400 space-y-3">
                  <Activity className="h-12 w-12 text-slate-200" />
                  <p className="text-sm font-medium">수학 문제 풀이나 개념이 궁금한가요?<br/>궁금한 내용을 입력해 보세요!</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {["이차함수 꼭짓점 구하는 법", "근의 공식 알려줘", "기울기가 뭐야?"].map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs text-slate-500">#{tag}</span>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex max-w-[85%] items-start gap-2 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`mt-1 rounded-full p-1.5 ${m.role === "user" ? "bg-indigo-100 text-indigo-600" : "bg-white border border-slate-200 text-indigo-600"}`}>
                      {m.role === "user" ? <User size={14} /> : <GraduationCap size={14} />}
                    </div>
                    <div className={`rounded-2xl px-4 py-2.5 text-sm shadow-sm ${m.role === "user" ? "bg-indigo-600 text-white rounded-tr-none" : "bg-white text-slate-700 border border-slate-100 rounded-tl-none leading-relaxed"}`}>
                      {m.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl bg-white border border-slate-100 px-4 py-2.5 shadow-sm">
                    <span className="flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400 [animation-delay:-0.3s]"></span>
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400 [animation-delay:-0.15s]"></span>
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400"></span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* 입력 영역 */}
            <form onSubmit={handleSubmit} className="border-t border-slate-100 p-4 bg-white">
              <div className="flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-1 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="수학 질문을 입력하세요..."
                  className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  disabled={!input || isLoading}
                  className="rounded-xl bg-indigo-600 p-2 text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95 disabled:opacity-50 disabled:bg-slate-400"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
