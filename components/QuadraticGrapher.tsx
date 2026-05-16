"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sliders, Activity, Info, RotateCcw, Target, Hash } from "lucide-react";

/* ──────────────────────────────────────────
   이차함수 그래프 도구 (Quadratic Grapher)
   - y = ax² + bx + c 시각화
   - Canvas 기반 고성능 렌더링
   ────────────────────────────────────────── */

export default function QuadraticGrapher() {
  // 계수 상태 관리 (a, b, c)
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [showPoints, setShowPoints] = useState(true);
  const [zoom, setZoom] = useState(40); // 1단위당 픽셀 수

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 수학적 계산 (꼭짓점, 절편 등)
  const vertex = useMemo(() => {
    const vx = -b / (2 * a);
    const vy = a * vx * vx + b * vx + c;
    return { x: vx, y: vy };
  }, [a, b, c]);

  const roots = useMemo(() => {
    const d = b * b - 4 * a * c;
    if (d < 0) return [];
    if (d === 0) return [-b / (2 * a)];
    return [
      (-b + Math.sqrt(d)) / (2 * a),
      (-b - Math.sqrt(d)) / (2 * a),
    ];
  }, [a, b, c]);

  // 그래프 그리기 로직
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 반응형 크기 설정
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const centerX = width / 2;
    const centerY = height / 2;

    ctx.clearRect(0, 0, width, height);

    // 1. 그리드 그리기
    ctx.strokeStyle = "#e2e8f0"; // slate-200
    ctx.lineWidth = 1;
    
    // 세로선
    for (let x = centerX % zoom; x < width; x += zoom) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    // 가로선
    for (let y = centerY % zoom; y < height; y += zoom) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // 2. 축 그리기
    ctx.strokeStyle = "#64748b"; // slate-500
    ctx.lineWidth = 2;
    // X축
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
    // Y축
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // 3. 함수 그래프 그리기 (y = ax² + bx + c)
    ctx.strokeStyle = "#6366f1"; // indigo-500
    ctx.lineWidth = 3;
    ctx.beginPath();

    let first = true;
    for (let px = 0; px < width; px++) {
      const x = (px - centerX) / zoom;
      const y = a * x * x + b * x + c;
      const py = centerY - y * zoom;

      if (py >= 0 && py <= height) {
        if (first) {
          ctx.moveTo(px, py);
          first = false;
        } else {
          ctx.lineTo(px, py);
        }
      }
    }
    ctx.stroke();

    // 4. 주요 지점 표시 (꼭짓점, 절편)
    if (showPoints) {
      // 꼭짓점 (Red)
      const vpx = centerX + vertex.x * zoom;
      const vpy = centerY - vertex.y * zoom;
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.arc(vpx, vpy, 5, 0, Math.PI * 2);
      ctx.fill();

      // X절편 (Green)
      ctx.fillStyle = "#22c55e";
      roots.forEach(r => {
        const rpx = centerX + r * zoom;
        ctx.beginPath();
        ctx.arc(rpx, centerY, 5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Y절편 (Amber)
      ctx.fillStyle = "#f59e0b";
      const yInter = centerY - c * zoom;
      ctx.beginPath();
      ctx.arc(centerX, yInter, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [a, b, c, zoom, showPoints, vertex, roots]);

  return (
    <div className="flex flex-col gap-6 lg:flex-row overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
      {/* ── 컨트롤 패널 (좌측) ── */}
      <div className="w-full lg:w-96 p-8 bg-slate-50 border-r border-slate-200">
        <div className="flex items-center gap-2 mb-8">
          <div className="p-2 bg-indigo-600 rounded-lg text-white">
            <Sliders size={20} />
          </div>
          <h2 className="text-xl font-bold text-slate-800">함수 컨트롤러</h2>
        </div>

        <div className="space-y-8">
          {/* 수식 표시 */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
            <p className="text-sm text-slate-400 mb-1">현재 수식</p>
            <div className="text-2xl font-mono font-bold text-indigo-600">
              y = {a.toFixed(1)}x² {b >= 0 ? "+" : "-"} {Math.abs(b).toFixed(1)}x {c >= 0 ? "+" : "-"} {Math.abs(c).toFixed(1)}
            </div>
          </div>

          {/* 슬라이더 그룹 */}
          <div className="space-y-6">
            <SliderControl label="a (곡률)" value={a} min={-5} max={5} step={0.1} onChange={setA} color="text-indigo-600" />
            <SliderControl label="b (축 이동)" value={b} min={-10} max={10} step={0.1} onChange={setB} color="text-emerald-600" />
            <SliderControl label="c (Y절편)" value={c} min={-10} max={10} step={0.1} onChange={setC} color="text-amber-600" />
          </div>

          {/* 토글 및 리셋 */}
          <div className="flex flex-col gap-3 pt-4">
            <button 
              onClick={() => setShowPoints(!showPoints)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${showPoints ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-600'}`}
            >
              <span className="flex items-center gap-2 text-sm font-semibold">
                <Target size={16} /> 주요 지점 표시
              </span>
              <div className={`w-8 h-4 rounded-full relative transition-colors ${showPoints ? 'bg-indigo-500' : 'bg-slate-300'}`}>
                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${showPoints ? 'right-0.5' : 'left-0.5'}`} />
              </div>
            </button>

            <button 
              onClick={() => { setA(1); setB(0); setC(0); setZoom(40); }}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <RotateCcw size={16} /> 초기화
            </button>
          </div>
        </div>
      </div>

      {/* ── 그래프 영역 (우측) ── */}
      <div className="flex-1 relative bg-white p-4 min-h-[500px]">
        {/* 그래프 정보 오버레이 */}
        <div className="absolute top-8 left-8 z-10 flex flex-col gap-2 pointer-events-none">
          <div className="bg-white/90 backdrop-blur shadow-sm border border-slate-200 px-4 py-2 rounded-xl text-sm">
            <span className="text-red-500 font-bold">●</span> 꼭짓점: ({vertex.x.toFixed(2)}, {vertex.y.toFixed(2)})
          </div>
          {roots.length > 0 && (
            <div className="bg-white/90 backdrop-blur shadow-sm border border-slate-200 px-4 py-2 rounded-xl text-sm">
              <span className="text-emerald-500 font-bold">●</span> X절편: {roots.map(r => r.toFixed(2)).join(", ")}
            </div>
          )}
        </div>

        {/* 줌 컨트롤 */}
        <div className="absolute bottom-8 right-8 z-10 flex flex-col gap-2">
           <button onClick={() => setZoom(z => Math.min(z + 10, 100))} className="p-3 bg-white shadow-xl border border-slate-200 rounded-full hover:bg-slate-50 text-slate-600 transition-all">+</button>
           <button onClick={() => setZoom(z => Math.max(z - 10, 10))} className="p-3 bg-white shadow-xl border border-slate-200 rounded-full hover:bg-slate-50 text-slate-600 transition-all">-</button>
        </div>

        {/* 캔버스 */}
        <canvas 
          ref={canvasRef} 
          className="w-full h-full cursor-crosshair rounded-2xl"
        />
      </div>
    </div>
  );
}

// ── 보조 컴포넌트: 슬라이더 컨트롤 ──
function SliderControl({ label, value, min, max, step, onChange, color }: any) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-sm font-bold text-slate-700">{label}</label>
        <span className={`font-mono font-bold ${color}`}>{value.toFixed(1)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
      />
    </div>
  );
}
