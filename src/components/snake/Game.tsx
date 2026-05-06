"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { StampButton } from "@/components/primitives";

const COLS = 32;
const ROWS = 24;
const TICK = 90; // ms per step
const CELL = 18; // px

type Vec = { x: number; y: number };
type Phase = "idle" | "playing" | "over" | "saved";

const DIRS: Record<string, Vec> = {
  ArrowUp: { x: 0, y: -1 }, w: { x: 0, y: -1 }, W: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 }, s: { x: 0, y: 1 }, S: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 }, a: { x: -1, y: 0 }, A: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }, d: { x: 1, y: 0 }, D: { x: 1, y: 0 },
};

export function SnakeGame({ onSubmitted }: { onSubmitted?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [initials, setInitials] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const stateRef = useRef<{
    snake: Vec[]; dir: Vec; nextDir: Vec; food: Vec; startedAt: number;
  } | null>(null);

  const draw = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    c.width = COLS * CELL * dpr;
    c.height = ROWS * CELL * dpr;
    c.style.width = `${COLS * CELL}px`;
    c.style.height = `${ROWS * CELL}px`;
    ctx.scale(dpr, dpr);
    ctx.fillStyle = "#0A0E0A";
    ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);
    // grid
    ctx.strokeStyle = "rgba(200,255,31,0.04)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath();
      ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, ROWS * CELL); ctx.stroke();
    }
    for (let y = 0; y <= ROWS; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * CELL); ctx.lineTo(COLS * CELL, y * CELL); ctx.stroke();
    }
    const s = stateRef.current;
    if (!s) return;
    // food
    ctx.fillStyle = "#E8B23A";
    ctx.fillRect(s.food.x * CELL + 3, s.food.y * CELL + 3, CELL - 6, CELL - 6);
    // snake
    s.snake.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? "#D4E635" : "#A4B520";
      ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
    });
  }, []);

  const start = useCallback(() => {
    stateRef.current = {
      snake: [{ x: 10, y: 12 }, { x: 9, y: 12 }, { x: 8, y: 12 }],
      dir: { x: 1, y: 0 },
      nextDir: { x: 1, y: 0 },
      food: { x: 18, y: 12 },
      startedAt: Date.now(),
    };
    setScore(0);
    setPhase("playing");
  }, []);

  // tick
  useEffect(() => {
    if (phase !== "playing") return;
    const id = setInterval(() => {
      const s = stateRef.current;
      if (!s) return;
      // commit dir if non-reverse
      const nd = s.nextDir;
      if (nd.x !== -s.dir.x || nd.y !== -s.dir.y) s.dir = nd;
      const head = { x: s.snake[0].x + s.dir.x, y: s.snake[0].y + s.dir.y };
      // walls
      if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
        setPhase("over");
        return;
      }
      // self
      if (s.snake.some((seg) => seg.x === head.x && seg.y === head.y)) {
        setPhase("over");
        return;
      }
      s.snake.unshift(head);
      if (head.x === s.food.x && head.y === s.food.y) {
        setScore((sc) => sc + 10);
        // place food
        let nf: Vec;
        do {
          nf = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
        } while (s.snake.some((seg) => seg.x === nf.x && seg.y === nf.y));
        s.food = nf;
      } else {
        s.snake.pop();
      }
      draw();
    }, TICK);
    return () => clearInterval(id);
  }, [phase, draw]);

  // initial paint
  useEffect(() => { draw(); }, [draw, phase]);

  // input
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phase === "idle" && e.key === "Enter") return start();
      const d = DIRS[e.key];
      if (!d || !stateRef.current) return;
      e.preventDefault();
      stateRef.current.nextDir = d;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, start]);

  async function submit() {
    if (!/^[A-Z0-9]{3}$/.test(initials)) return;
    setSubmitting(true);
    const startedAt = stateRef.current?.startedAt ?? Date.now();
    await fetch("/api/leaderboard", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ initials, score, startedAt }),
    });
    setSubmitting(false);
    setPhase("saved");
    setInitials("");
    onSubmitted?.();
    setTimeout(() => setPhase("idle"), 1800);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-[11px] tracking-widest uppercase text-ink-3">
        <span>SNAKE.EXE · v0.1</span>
        <span>SCORE · <span className="text-ink-0 font-bold">{String(score).padStart(4, "0")}</span></span>
      </div>
      <div className="border border-ink-0 shadow-stamp inline-block relative scanlines bg-term-bg">
        <canvas ref={canvasRef} />
        {phase !== "playing" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-paper-1 border border-ink-0 shadow-stamp p-5 max-w-[320px]">
              {phase === "idle" && (
                <>
                  <div className="font-mono font-bold text-[16px] mb-1">[ READY ]</div>
                  <p className="text-[12px] text-ink-2 mb-3">
                    arrows or WASD. eat the amber. don&apos;t bite yourself.
                  </p>
                  <StampButton variant="acid" onClick={start}>[ START ]</StampButton>
                </>
              )}
              {phase === "saved" && (
                <>
                  <div className="font-mono font-bold text-[16px] mb-1 text-term-green">[ SAVED ]</div>
                  <div className="text-[12px] text-ink-2">SCORE // {String(score).padStart(4, "0")} · filed.</div>
                </>
              )}
              {phase === "over" && (
                <>
                  <div className="font-mono font-bold text-[16px] mb-1 text-term-red">[ GAME OVER ]</div>
                  <div className="text-[12px] text-ink-2">SCORE // {String(score).padStart(4, "0")}</div>
                  <div className="mt-3">
                    <div className="text-[10px] tracking-widest uppercase text-ink-3 mb-1">[INITIALS]</div>
                    <input
                      autoFocus
                      maxLength={3}
                      value={initials}
                      onChange={(e) => setInitials(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))}
                      className="w-24 font-mono text-[24px] text-center bg-paper-0 border border-ink-0 px-2 py-1 tracking-widest"
                    />
                  </div>
                  <div className="flex gap-2 mt-3">
                    <StampButton variant="acid" onClick={submit} disabled={submitting || initials.length < 3}>
                      [ SUBMIT ]
                    </StampButton>
                    <StampButton variant="ghost" onClick={() => setPhase("idle")}>cancel</StampButton>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
