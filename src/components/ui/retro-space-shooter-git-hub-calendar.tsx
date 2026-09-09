"use client";

import { memo, useMemo, useState, useEffect, useId, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Play, RotateCcw, Pause, Trophy, Sparkles, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionData = {
  [date: string]: {
    level: ContributionLevel;
    label?: string;
    count?: number;
  };
};

export type ThemeColors = {
  level0: string;
  level1: string;
  level2: string;
  level3: string;
  level4: string;
};

export type CellShape = "rounded" | "circle";

export type GithubCalendarProps = {
  username?: string;
  data?: ContributionData;
  startDate?: string;
  endDate?: string;
  startsOnSunday?: boolean;
  cellSize?: number;
  cellGap?: number;
  cellShape?: CellShape;
  theme?: "github" | ThemeColors;
  showMonthLabels?: boolean;
  showStats?: boolean;
  showLegend?: boolean;
  className?: string;
};

// ─── Built-in themes ──────────────────────────────────────────────────────────

const THEMES: Record<string, ThemeColors> = {
  github: {
    level0: "#161b22",
    level1: "#0e4429",
    level2: "#006d32",
    level3: "#26a641",
    level4: "#39d353",
  },
};

const DARK_THEMES: Record<string, ThemeColors> = {
  github: {
    level0: "#161b22",
    level1: "#0e4429",
    level2: "#006d32",
    level3: "#26a641",
    level4: "#39d353",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseDate(dateStr: string): Date {
  const parts = dateStr.split("-").map(Number);
  const y = parts[0] ?? 0;
  const m = parts[1] ?? 1;
  const d = parts[2] ?? 1;
  return new Date(y, m - 1, d);
}

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const FULL_MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}

function formatTooltipDate(dateStr: string): string {
  try {
    const date = parseDate(dateStr);
    const month = FULL_MONTH_NAMES[date.getMonth()];
    const day = date.getDate();
    const suffix = getOrdinalSuffix(day);
    return `${month} ${day}${suffix}`;
  } catch (e) {
    return dateStr;
  }
}

// Retro Web Audio Beep
function playSynthBeep(freq = 440, duration = 0.08, type: OscillatorType = "sine") {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + duration);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Audio may be blocked before interaction
  }
}

// ─── API fetch ────────────────────────────────────────────────────────────────

type APIResponse = {
  total: Record<string, number>;
  contributions: { date: string; count: number; level: number }[];
};

async function fetchContributions(username: string): Promise<ContributionData> {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${username}`,
  );
  if (!res.ok) {
    throw new Error(
      `Could not fetch contributions for "${username}" (${res.status})`,
    );
  }
  const json: APIResponse = await res.json();

  const result: ContributionData = {};
  for (const entry of json.contributions) {
    result[entry.date] = {
      level: Math.min(4, Math.max(0, entry.level)) as ContributionLevel,
      count: entry.count,
    };
  }
  return result;
}

// ─── Build calendar grid ──────────────────────────────────────────────────────

function buildGrid(
  startDate: string,
  endDate: string,
  startsOnSunday: boolean,
): {
  weeks: (string | null)[][];
  monthLabels: { label: string; weekIndex: number }[];
  gridStart: string;
} {
  const start = parseDate(startDate);
  const end = parseDate(endDate);

  const startDay = startsOnSunday ? 0 : 1;
  const startDow = start.getDay();
  const offset = (startDow - startDay + 7) % 7;
  const gridStart = addDays(start, -offset);

  const weeks: (string | null)[][] = [];
  const monthLabels: { label: string; weekIndex: number }[] = [];

  let current = new Date(gridStart);
  let weekIndex = 0;
  let lastMonth = -1;

  while (
    current <= end ||
    (weeks.length > 0 && (weeks[weeks.length - 1]?.length ?? 0) < 7)
  ) {
    const week: (string | null)[] = [];

    for (let d = 0; d < 7; d++) {
      const dateStr = formatDate(current);
      const isInRange = current >= start && current <= end;
      week.push(isInRange ? dateStr : null);

      if (isInRange && current.getMonth() !== lastMonth) {
        lastMonth = current.getMonth();
        monthLabels.push({
          label: MONTH_NAMES[current.getMonth()]!,
          weekIndex,
        });
      }

      current = addDays(current, 1);
    }

    weeks.push(week);
    weekIndex++;

    if (
      current > end &&
      weeks.length > 0 &&
      (weeks[weeks.length - 1]?.every(
        (d) => d === null || parseDate(d) > end,
      ) ??
        false)
    )
      break;
  }

  return { weeks, monthLabels, gridStart: formatDate(gridStart) };
}

type TooltipState = {
  visible: boolean;
  date: string;
  count: number | undefined;
  label: string | undefined;
  x: number;
  y: number;
};

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

function CalendarSkeleton({
  cellSize = 12,
  cellGap = 3,
  className,
}: {
  cellSize?: number;
  cellGap?: number;
  className?: string;
}) {
  const step = cellSize + cellGap;
  const weeks = 53;
  const days = 7;
  return (
    <div className={cn("w-fit mx-auto space-y-3 animate-pulse", className)}>
      <div className="flex gap-6">
        <div className="h-4 w-32 rounded bg-white/10" />
        <div className="h-4 w-20 rounded bg-white/10" />
        <div className="h-4 w-24 rounded bg-white/10" />
      </div>
      <div className="overflow-x-auto">
        <svg
          width={weeks * step - cellGap}
          height={16 + days * step - cellGap}
          className="overflow-visible"
        >
          {Array.from({ length: weeks }).map((_, wi) =>
            Array.from({ length: days }).map((_, di) => (
              <rect
                key={`${wi}-${di}`}
                x={wi * step}
                y={16 + di * step}
                width={cellSize}
                height={cellSize}
                rx={cellSize * 0.2}
                className="fill-white/10"
              />
            )),
          )}
        </svg>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export const GithubCalendar = memo(function GithubCalendar({
  username,
  data: dataProp,
  startDate,
  endDate,
  startsOnSunday = true,
  cellSize = 12,
  cellGap = 3,
  cellShape = "rounded",
  theme = "github",
  showMonthLabels = true,
  showStats = true,
  showLegend = true,
  className,
}: GithubCalendarProps) {
  const id = useId();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(true);
  const [gameActive, setGameActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Snake Game State
  const [snakeScore, setSnakeScore] = useState(0);
  const [snakeHighScore, setSnakeHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("github_snake_high_score");
      if (saved) setSnakeHighScore(parseInt(saved, 10) || 0);
    } catch {}
  }, []);

  // ── Fetch state ────────────────────────────────────────────────────────
  const [fetchedData, setFetchedData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(!!username);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;
    setFetchedData(null);
    setFetchError(null);
    setLoading(true);

    fetchContributions(username)
      .then((d) => setFetchedData(d))
      .catch((e) => setFetchError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  }, [username]);

  const data: ContributionData = dataProp ?? fetchedData ?? {};

  const resolvedEnd = endDate ?? formatDate(new Date());
  const resolvedStart = useMemo(() => {
    if (startDate) return startDate;
    const d = parseDate(resolvedEnd);
    d.setFullYear(d.getFullYear() - 1);
    d.setDate(d.getDate() + 1);
    return formatDate(d);
  }, [startDate, resolvedEnd]);

  const activeColors = useMemo(() => {
    if (typeof theme === "object") return theme;
    return DARK_THEMES.github;
  }, [theme]);

  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    date: "",
    count: undefined,
    label: undefined,
    x: 0,
    y: 0,
  });

  const { weeks, monthLabels, gridStart } = useMemo(
    () => buildGrid(resolvedStart, resolvedEnd, startsOnSunday),
    [resolvedStart, resolvedEnd, startsOnSunday],
  );

  const stats = useMemo(() => {
    const entries = Object.entries(data);
    const total = entries.reduce(
      (sum, [, v]) => sum + (v.count ?? (v.level > 0 ? 1 : 0)),
      0,
    );
    const activeDays = entries.filter(([, v]) => v.level > 0).length;
    return { total, activeDays };
  }, [data]);

  const step = cellSize + cellGap;
  const monthLabelHeight = showMonthLabels ? 20 : 0;
  const numCols = weeks.length;
  const numRows = 7;
  const svgWidth = numCols * step - cellGap;
  const svgHeight = monthLabelHeight + numRows * step - cellGap;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [fetchedData, dataProp]);

  // ── Snake Game Engine ────────────────────────────────────────────────────────
  // References to keep state synced without re-triggering requestAnimationFrame
  const snakeRef = useRef<{ col: number; row: number }[]>([
    { col: 12, row: 3 },
    { col: 11, row: 3 },
    { col: 10, row: 3 },
    { col: 9, row: 3 },
  ]);
  const dirRef = useRef<{ dCol: number; dRow: number }>({ dCol: 1, dRow: 0 });
  const nextDirRef = useRef<{ dCol: number; dRow: number }>({ dCol: 1, dRow: 0 });
  const foodRef = useRef<{ col: number; row: number }>({ col: 20, row: 3 });
  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number; life: number; color: string }[]>([]);
  const lastTickRef = useRef<number>(0);
  const scoreRef = useRef<number>(0);
  const gameOverRef = useRef<boolean>(false);
  const pausedRef = useRef<boolean>(false);

  const spawnFood = useCallback(() => {
    const snake = snakeRef.current;
    let newCol: number;
    let newRow: number;
    let attempts = 0;
    do {
      newCol = Math.floor(Math.random() * numCols);
      newRow = Math.floor(Math.random() * numRows);
      attempts++;
    } while (
      attempts < 100 &&
      snake.some((seg) => seg.col === newCol && seg.row === newRow)
    );
    foodRef.current = { col: newCol, row: newRow };
  }, [numCols, numRows]);

  const resetGame = useCallback(() => {
    const startCol = Math.min(15, Math.floor(numCols / 2));
    snakeRef.current = [
      { col: startCol, row: 3 },
      { col: startCol - 1, row: 3 },
      { col: startCol - 2, row: 3 },
      { col: startCol - 3, row: 3 },
    ];
    dirRef.current = { dCol: 1, dRow: 0 };
    nextDirRef.current = { dCol: 1, dRow: 0 };
    particlesRef.current = [];
    scoreRef.current = 0;
    setSnakeScore(0);
    setIsGameOver(false);
    gameOverRef.current = false;
    setIsPaused(false);
    pausedRef.current = false;
    spawnFood();
  }, [numCols, spawnFood]);

  // Direction changer
  const changeDirection = useCallback((dCol: number, dRow: number) => {
    const current = dirRef.current;
    // Disallow 180-degree reversing
    if (dCol !== 0 && current.dCol === -dCol) return;
    if (dRow !== 0 && current.dRow === -dRow) return;
    nextDirRef.current = { dCol, dRow };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!gameActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space", " "].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === " " || e.key === "Space") {
        setIsPaused((prev) => {
          pausedRef.current = !prev;
          return !prev;
        });
        return;
      }

      if (gameOverRef.current) {
        if (e.key === "Enter" || e.key === " ") {
          resetGame();
        }
        return;
      }

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          changeDirection(0, -1);
          break;
        case "ArrowDown":
        case "s":
        case "S":
          changeDirection(0, 1);
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          changeDirection(-1, 0);
          break;
        case "ArrowRight":
        case "d":
        case "D":
          changeDirection(1, 0);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameActive, changeDirection, resetGame]);

  // Main Snake Game Loop
  useEffect(() => {
    if (!gameActive) {
      // Re-enable SVG cells pointer events
      return;
    }

    resetGame();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = svgWidth;
    canvas.height = svgHeight;

    let animId: number;
    const tickInterval = 90; // snake move speed in ms

    const emitParticles = (x: number, y: number, color: string) => {
      for (let i = 0; i < 14; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = Math.random() * 2.5 + 1;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          life: 20,
          color,
        });
      }
    };

    const gameLoop = (timestamp: number) => {
      // 1. Logic Update
      if (!pausedRef.current && !gameOverRef.current) {
        if (timestamp - lastTickRef.current >= tickInterval) {
          lastTickRef.current = timestamp;

          dirRef.current = nextDirRef.current;
          const { dCol, dRow } = dirRef.current;
          const snake = snakeRef.current;
          const head = snake[0];

          // Wrap-around toroidal board for maximum fun on a wide 53x7 banner
          let nextCol = (head.col + dCol + numCols) % numCols;
          let nextRow = (head.row + dRow + numRows) % numRows;

          // Self-collision test (skip the very tail since it moves)
          const hitsSelf = snake.slice(0, -1).some(
            (seg) => seg.col === nextCol && seg.row === nextRow
          );

          if (hitsSelf) {
            gameOverRef.current = true;
            setIsGameOver(true);
            playSynthBeep(180, 0.25, "sawtooth");
          } else {
            const newHead = { col: nextCol, row: nextRow };
            const eatsFood =
              nextCol === foodRef.current.col && nextRow === foodRef.current.row;

            if (eatsFood) {
              snake.unshift(newHead);
              scoreRef.current += 1;
              const newScore = scoreRef.current;
              setSnakeScore(newScore);
              setSnakeHighScore((prev) => {
                const updated = Math.max(prev, newScore);
                try {
                  localStorage.setItem("github_snake_high_score", updated.toString());
                } catch {}
                return updated;
              });

              const foodPixelX = nextCol * step + cellSize / 2;
              const foodPixelY = monthLabelHeight + nextRow * step + cellSize / 2;
              emitParticles(foodPixelX, foodPixelY, "#39d353");
              playSynthBeep(580 + (newScore % 10) * 40, 0.08, "triangle");
              spawnFood();
            } else {
              snake.unshift(newHead);
              snake.pop();
            }
          }
        }
      }

      // 2. Render Update
      ctx.clearRect(0, 0, svgWidth, svgHeight);

      // Render Particles
      particlesRef.current.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life / 20);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);
      ctx.globalAlpha = 1.0;

      // Render Food (Pulsing glowing commit)
      const food = foodRef.current;
      const foodX = food.col * step;
      const foodY = monthLabelHeight + food.row * step;
      const pulse = Math.sin(timestamp * 0.008) * 0.2 + 0.9;

      ctx.save();
      ctx.shadowColor = "#39d353";
      ctx.shadowBlur = 10 * pulse;
      ctx.fillStyle = "#39d353";
      ctx.beginPath();
      ctx.roundRect(
        foodX + (cellSize * (1 - pulse)) / 2,
        foodY + (cellSize * (1 - pulse)) / 2,
        cellSize * pulse,
        cellSize * pulse,
        4
      );
      ctx.fill();

      // Food sparkle inner core
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(foodX + cellSize / 2, foodY + cellSize / 2, 2.5 * pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Render Snake Body
      const snake = snakeRef.current;
      snake.forEach((seg, idx) => {
        const segX = seg.col * step;
        const segY = monthLabelHeight + seg.row * step;

        ctx.save();
        if (idx === 0) {
          // Snake Head (Glowing neon green)
          ctx.shadowColor = "#39d353";
          ctx.shadowBlur = 12;
          ctx.fillStyle = "#39d353";
          ctx.beginPath();
          ctx.roundRect(segX, segY, cellSize, cellSize, 4);
          ctx.fill();

          // Pixel Eyes
          ctx.fillStyle = "#000000";
          const eyeOffset = cellSize * 0.25;
          const eyeSize = 2.5;
          const { dCol, dRow } = dirRef.current;

          let eye1 = { x: segX + eyeOffset, y: segY + eyeOffset };
          let eye2 = { x: segX + cellSize - eyeOffset, y: segY + eyeOffset };

          if (dCol === 1) {
            eye1 = { x: segX + cellSize - 4, y: segY + 3 };
            eye2 = { x: segX + cellSize - 4, y: segY + cellSize - 5 };
          } else if (dCol === -1) {
            eye1 = { x: segX + 3, y: segY + 3 };
            eye2 = { x: segX + 3, y: segY + cellSize - 5 };
          } else if (dRow === 1) {
            eye1 = { x: segX + 3, y: segY + cellSize - 4 };
            eye2 = { x: segX + cellSize - 5, y: segY + cellSize - 4 };
          } else if (dRow === -1) {
            eye1 = { x: segX + 3, y: segY + 3 };
            eye2 = { x: segX + cellSize - 5, y: segY + 3 };
          }

          ctx.fillRect(eye1.x, eye1.y, eyeSize, eyeSize);
          ctx.fillRect(eye2.x, eye2.y, eyeSize, eyeSize);
        } else {
          // Snake Body Segments (GitHub dark greens gradient)
          const ratio = idx / snake.length;
          ctx.fillStyle = ratio < 0.4 ? "#26a641" : ratio < 0.7 ? "#006d32" : "#0e4429";
          ctx.shadowColor = "#26a641";
          ctx.shadowBlur = 4;
          ctx.beginPath();
          ctx.roundRect(segX + 0.5, segY + 0.5, cellSize - 1, cellSize - 1, 3);
          ctx.fill();
        }
        ctx.restore();
      });

      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animId);
  }, [gameActive, svgWidth, svgHeight, step, cellSize, monthLabelHeight, numCols, numRows, resetGame, spawnFood]);

  if (loading) {
    return (
      <CalendarSkeleton
        cellSize={cellSize}
        cellGap={cellGap}
        className={className}
      />
    );
  }

  if (fetchError) {
    return (
      <div
        className={cn(
          "w-fit mx-auto flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive",
          className,
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        {fetchError}
      </div>
    );
  }

  const cellRx = cellShape === "circle" ? cellSize / 2 : cellSize * 0.2;

  return (
    <div
      className={cn(
        "w-fit mx-auto overflow-x-hidden border border-transparent rounded-sm transition-all duration-500 select-none",
        className,
      )}
    >
      <div className="w-fit mx-auto max-w-full flex flex-col gap-4 p-3">
        {/* Snake Arcade Status Bar (When Game Mode Active) */}
        {gameActive && (
          <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 bg-[#050811] border-2 border-[#00ff66]/50 shadow-[0_0_20px_rgba(0,255,102,0.15)] relative cyber-scanlines">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-[#00ff66] font-pixel text-[10px] uppercase tracking-wider">
                <span className="w-2 h-2 bg-[#00ff66] animate-ping" />
                <span>1UP : ARCADE</span>
              </div>

              <div className="h-4 w-[2px] bg-[#00ff66]/20" />

              <div className="flex items-center gap-2 text-xs font-mono font-bold text-white">
                <span className="font-pixel text-[9px] text-[#00ff66]/70">COMMITS:</span>
                <span className="font-pixel text-[11px] text-[#00ff66] tracking-widest">{snakeScore.toString().padStart(4, '0')}</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono font-bold text-white/70">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-pixel text-[9px] text-amber-400/70">HI-SCORE:</span>
                <span className="font-pixel text-[11px] text-amber-400 tracking-widest">{snakeHighScore.toString().padStart(4, '0')}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsPaused((prev) => {
                    pausedRef.current = !prev;
                    return !prev;
                  });
                }}
                className="px-3 py-1.5 bg-[#0b1326] hover:bg-[#00ff66] text-[#00ff66] hover:text-black border border-[#00ff66]/40 text-[9px] font-pixel transition-all cursor-pointer shadow-[2px_2px_0px_#00ff66]"
              >
                {isPaused ? "▶ RESUME" : "❚❚ PAUSE"}
              </button>

              <button
                type="button"
                onClick={resetGame}
                className="px-3 py-1.5 bg-[#00ff66]/10 hover:bg-[#00ff66] text-[#00ff66] hover:text-black border border-[#00ff66] text-[9px] font-pixel transition-all cursor-pointer shadow-[2px_2px_0px_#00ff66]"
              >
                ↺ RESTART
              </button>
            </div>
          </div>
        )}

        <div
          ref={scrollRef}
          className="relative overflow-x-auto transition-all duration-500"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* Base SVG Contribution Grid */}
          <svg
            width={svgWidth}
            height={svgHeight}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="overflow-visible"
          >
            {/* Month labels */}
            {showMonthLabels &&
              monthLabels.map(({ label, weekIndex }) => (
                <text
                  key={`${label}-${weekIndex}`}
                  x={weekIndex * step}
                  y={12}
                  fontSize={11}
                  fontWeight={600}
                  fill="#71717a"
                  fontFamily="inherit"
                >
                  {label}
                </text>
              ))}

            {/* Cells */}
            {weeks.map((week, wi) =>
              week.map((date, di) => {
                const entry = date ? data[date] : undefined;
                const level: ContributionLevel = entry?.level ?? 0;
                const cellCenterX = wi * step + cellSize / 2;
                const cellTopY = monthLabelHeight + di * step;

                if (!date) {
                  const cellDate = formatDate(
                    addDays(parseDate(gridStart), wi * 7 + di),
                  );
                  if (cellDate > resolvedEnd) return null;
                }

                return (
                  <rect
                    key={`${wi}-${di}`}
                    id={date ? `cell-${id}-${date}` : undefined}
                    x={wi * step}
                    y={cellTopY}
                    width={cellSize}
                    height={cellSize}
                    rx={cellRx}
                    fill={activeColors[`level${level}` as keyof ThemeColors]}
                    opacity={gameActive ? 0.35 : 1}
                    className="transition-opacity duration-300"
                    onMouseEnter={() => {
                      if (!date || gameActive) return;
                      setTooltip({
                        visible: true,
                        date,
                        count: entry?.count,
                        label: entry?.label,
                        x: cellCenterX,
                        y: cellTopY,
                      });
                    }}
                    onMouseLeave={() =>
                      setTooltip((t) => ({ ...t, visible: false }))
                    }
                  />
                );
              }),
            )}
          </svg>

          {/* Canvas Overlay for Snake */}
          {gameActive && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 pointer-events-none z-10"
              style={{ width: svgWidth, height: svgHeight }}
            />
          )}

          {/* Game Over Modal Overlay */}
          {gameActive && isGameOver && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#03060f]/90 backdrop-blur-sm animate-fade-in cyber-scanlines">
              <div className="p-6 bg-[#070d1a] border-2 border-red-500 text-center shadow-[0_0_30px_rgba(239,68,68,0.4)] max-w-sm flex flex-col items-center gap-3">
                <span className="text-red-500 font-pixel text-xs tracking-widest animate-pulse">*** GAME OVER ***</span>
                <h3 className="text-xl font-black text-white font-pixel mt-1">
                  {snakeScore.toString().padStart(4, '0')} <span className="text-[#00ff66] text-[10px] block mt-1">COMMITS EATEN</span>
                </h3>
                <p className="text-zinc-400 text-[10px] font-pixel">
                  {snakeScore >= snakeHighScore && snakeScore > 0 ? "★ NEW HI-SCORE! ★" : `BEST: ${snakeHighScore.toString().padStart(4, '0')}`}
                </p>
                <button
                  type="button"
                  onClick={resetGame}
                  className="mt-3 px-6 py-2.5 bg-[#00ff66] hover:bg-emerald-300 text-black font-pixel text-[10px] tracking-wider transition-all cursor-pointer shadow-[4px_4px_0px_#000]"
                >
                  PLAY AGAIN [SPACE]
                </button>
              </div>
            </div>
          )}

          {/* Tooltip */}
          {tooltip.visible && !gameActive && (
            <div
              className="pointer-events-none absolute z-50 rounded-lg bg-[#0e1626] px-3 py-1.5 text-xs font-medium text-white shadow-xl border border-white/10 whitespace-nowrap"
              style={{
                left: tooltip.x,
                top: tooltip.y,
                transform: "translate(-50%, calc(-100% - 8px))",
              }}
            >
              {tooltip.label
                ? `${tooltip.label} on ${formatTooltipDate(tooltip.date)}.`
                : `${tooltip.count ?? 0} contributions on ${formatTooltipDate(tooltip.date)}.`}
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-2 h-2 rotate-45 bg-[#0e1626] border-r border-b border-white/10" />
            </div>
          )}
        </div>

        {/* Footer Controls & D-Pad for Mobile/Trackpad */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          {/* Legend and Game Mode Switch */}
          {showLegend && (
            <div className="flex flex-wrap items-center gap-4 text-xs text-white/60 shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold">Less</span>
                {([0, 1, 2, 3, 4] as ContributionLevel[]).map((level) => (
                  <svg key={level} width={cellSize} height={cellSize}>
                    <rect
                      width={cellSize}
                      height={cellSize}
                      rx={cellRx}
                      fill={activeColors[`level${level}`]}
                    />
                  </svg>
                ))}
                <span className="text-[11px] font-bold">More</span>
              </div>

              {/* Game Mode Switch */}
              <div className="flex items-center gap-2.5 border-l border-white/10 pl-4">
                <span className="text-xs font-mono font-bold text-white/80 select-none">
                  Snake Game
                </span>
                <button
                  type="button"
                  onClick={() => setGameActive(!gameActive)}
                  aria-label="Toggle Snake Game Mode"
                  className={cn(
                    "relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                    gameActive ? "bg-emerald-500 shadow-md shadow-emerald-500/50" : "bg-white/10"
                  )}
                >
                  <span
                    className={cn(
                      "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out",
                      gameActive ? "translate-x-5" : "translate-x-0"
                    )}
                  />
                </button>
              </div>
            </div>
          )}

          {/* On-screen D-Pad for Touch/Laptop Users (Only when Game Active) */}
          {gameActive && (
            <div className="flex items-center gap-2 bg-[#0b0f19]/80 border border-white/10 p-1.5 rounded-xl">
              <span className="text-[10px] font-mono text-white/40 mr-1 hidden sm:inline">CONTROLS:</span>
              <button
                type="button"
                onClick={() => changeDirection(-1, 0)}
                className="p-1.5 rounded bg-white/5 hover:bg-emerald-500/20 active:bg-emerald-500 text-white/80 hover:text-emerald-400 transition-colors"
                title="Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => changeDirection(0, -1)}
                  className="p-1 rounded bg-white/5 hover:bg-emerald-500/20 active:bg-emerald-500 text-white/80 hover:text-emerald-400 transition-colors"
                  title="Up"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => changeDirection(0, 1)}
                  className="p-1 rounded bg-white/5 hover:bg-emerald-500/20 active:bg-emerald-500 text-white/80 hover:text-emerald-400 transition-colors"
                  title="Down"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => changeDirection(1, 0)}
                className="p-1.5 rounded bg-white/5 hover:bg-emerald-500/20 active:bg-emerald-500 text-white/80 hover:text-emerald-400 transition-colors"
                title="Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Stats summary (Right) */}
          {showStats && !gameActive && (
            <div className="flex flex-1 flex-wrap justify-end ml-auto text-xs font-mono tracking-wide text-white/60">
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors select-none"
              >
                <span className="font-bold text-white">{username}</span>
                <span>contributed</span>
                <span className="font-black text-emerald-400">
                  {stats.total.toLocaleString()}
                </span>
                <span>times this year</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

GithubCalendar.displayName = "GithubCalendar";

export default GithubCalendar;
