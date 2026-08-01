import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

/** Slow-drifting petals/hearts behind everything. */
export function FallingPetals({ count = 18 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: (i * 97) % 100,
        delay: (i * 1.37) % 14,
        duration: 16 + ((i * 3) % 12),
        size: 10 + ((i * 7) % 14),
        glyph: i % 3 === 0 ? "❀" : i % 3 === 1 ? "❤" : "✿",
      })),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 text-primary/40"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animation: `drift ${p.duration}s linear ${p.delay}s infinite`,
          }}
        >
          {p.glyph}
        </span>
      ))}
    </div>
  );
}

/** Reveal-on-scroll wrapper. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${className}`}
    >
      {children}
    </div>
  );
}

export function Typewriter({
  text,
  speed = 55,
  start = true,
  onDone,
  className = "",
}: {
  text: string;
  speed?: number;
  start?: boolean;
  onDone?: () => void;
  className?: string;
}) {
  const [shown, setShown] = useState("");
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (!start) return;
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        doneRef.current?.();
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, start]);

  return (
    <span className={className}>
      {shown}
      <span
        aria-hidden
        className="ml-0.5 inline-block w-[2px] translate-y-[2px] self-stretch bg-primary"
        style={{ animation: "caret 1s steps(1) infinite", height: "0.9em" }}
      />
    </span>
  );
}

type Burst = { id: number; kind: "confetti" | "hearts" };

/** Confetti + floating hearts bursts, triggered imperatively. */
export function useBursts() {
  const [bursts, setBursts] = useState<Burst[]>([]);

  const fire = (kind: Burst["kind"]) => {
    const id = Date.now() + Math.random();
    setBursts((b) => [...b, { id, kind }]);
    setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 4200);
  };

  const layer = (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {bursts.map((b) =>
        b.kind === "confetti" ? <ConfettiBurst key={b.id} /> : <HeartsBurst key={b.id} />,
      )}
    </div>
  );

  return { fire, layer };
}

function ConfettiBurst() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 2.4 + Math.random() * 1.6,
        size: 6 + Math.random() * 8,
        hue: ["var(--primary)", "var(--rose-gold)", "var(--blush)", "var(--accent)"][i % 4],
        round: i % 3 === 0,
      })),
    [],
  );
  return (
    <>
      {pieces.map((p) => (
        <span
          key={p.id}
          className={p.round ? "absolute top-0 rounded-full" : "absolute top-0 rounded-[2px]"}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * (p.round ? 1 : 1.8),
            background: p.hue,
            animation: `confetti-fall ${p.duration}s linear ${p.delay}s forwards`,
          }}
        />
      ))}
    </>
  );
}

function HeartsBurst() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 1.2,
        duration: 3 + Math.random() * 2,
        size: 14 + Math.random() * 26,
      })),
    [],
  );
  return (
    <>
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute bottom-0 text-primary"
          style={{
            left: `${h.left}%`,
            fontSize: h.size,
            animation: `float-up ${h.duration}s ease-in ${h.delay}s forwards`,
          }}
        >
          ❤
        </span>
      ))}
    </>
  );
}

/** Little hearts trailing the cursor (pointer devices only). */
export function CursorHearts() {
  const [trail, setTrail] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let last = 0;
    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - last < 110) return;
      last = now;
      const id = now;
      setTrail((t) => [...t.slice(-12), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setTrail((t) => t.filter((p) => p.id !== id)), 1100);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40">
      {trail.map((p) => (
        <span
          key={p.id}
          className="absolute text-sm text-primary/60"
          style={{
            left: p.x,
            top: p.y,
            animation: "float-up 1.1s ease-out forwards",
          }}
        >
          ❤
        </span>
      ))}
    </div>
  );
}
