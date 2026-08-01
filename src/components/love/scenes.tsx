import { useEffect, useState } from "react";
import { love } from "@/lib/love-config";
import { Reveal, Typewriter } from "./effects";

export function ReasonCards() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-24">
      <Reveal>
        <p className="text-center text-xs uppercase tracking-[0.35em] text-muted-foreground">
          three of a thousand
        </p>
        <h2 className="mt-3 text-center text-4xl sm:text-5xl">Why you're everything</h2>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {love.reasons.map((r, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={r.title} delay={i * 120}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="glass-card group h-full w-full rounded-3xl p-8 text-left transition-transform duration-500 hover:-translate-y-1.5"
              >
                <span className="text-3xl">{r.icon}</span>
                <h3 className="mt-4 text-2xl">{r.title}</h3>
                <p
                  className="grid text-sm leading-relaxed text-muted-foreground transition-all duration-700"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", marginTop: isOpen ? 12 : 0 }}
                >
                  <span className="overflow-hidden">{r.message}</span>
                </p>
                <span className="mt-5 inline-block text-xs uppercase tracking-[0.2em] text-primary">
                  {isOpen ? "close" : "open me"}
                </span>
              </button>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function MemoryTimeline() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-24">
      <Reveal>
        <h2 className="text-center text-4xl sm:text-5xl">Our little timeline</h2>
      </Reveal>

      <ol className="relative mt-16 space-y-12 before:absolute before:left-[11px] before:top-2 before:h-full before:w-px before:bg-primary/30 sm:before:left-1/2">
        {love.timeline.map((t, i) => (
          <li key={t.label}>
            <Reveal delay={i * 100}>
              <div
                className={`relative pl-10 sm:w-1/2 sm:pl-0 ${
                  i % 2 ? "sm:ml-auto sm:pl-12 sm:text-left" : "sm:pr-12 sm:text-right"
                }`}
              >
                <span
                  className={`absolute left-0 top-2 grid h-6 w-6 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground sm:left-auto ${
                    i % 2 ? "sm:-left-3" : "sm:-right-3"
                  }`}
                  style={{ animation: "soft-pulse 3s ease-in-out infinite" }}
                >
                  ❤
                </span>
                <h3 className="text-2xl">{t.label}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.note}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function PolaroidGallery() {
  const [active, setActive] = useState<number | null>(null);
  const photo = active === null ? null : love.gallery[active];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-24">
      <Reveal>
        <h2 className="text-center text-4xl sm:text-5xl">Moments I keep</h2>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          tap a photo for the story behind it
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
        {love.gallery.map((g, i) => (
          <Reveal key={g.caption} delay={i * 90}>
            <button
              type="button"
              onClick={() => setActive(i)}
              className="glass-card w-full rounded-md p-3 pb-8 transition-transform duration-500 hover:-translate-y-2 hover:rotate-0"
              style={{ transform: `rotate(${i % 2 ? 2.5 : -2.5}deg)` }}
            >
              <img
                src={g.src}
                alt={g.caption}
                loading="lazy"
                width={900}
                height={900}
                className="aspect-square w-full rounded-sm object-cover"
              />
              <span className="mt-3 block font-[family-name:var(--font-hand)] text-lg">
                {g.caption}
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {photo && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
          className="fixed inset-0 z-50 grid place-items-center bg-foreground/50 p-6 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-card w-full max-w-md rounded-3xl p-5 pb-8"
            style={{ animation: "soft-pulse 0.5s ease-out 1" }}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              width={900}
              height={900}
              className="w-full rounded-2xl object-cover"
            />
            <h3 className="mt-5 text-2xl">{photo.caption}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{photo.story}</p>
            <button
              type="button"
              onClick={() => setActive(null)}
              className="mt-5 text-xs uppercase tracking-[0.2em] text-primary"
            >
              close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export function LoveCounter() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const start = new Date(love.togetherSince).getTime();
  const diff = Math.max(0, now - start);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000) % 24;
  const minutes = Math.floor(diff / 60000) % 60;
  const seconds = Math.floor(diff / 1000) % 60;

  const cells = [
    { v: days, l: "days" },
    { v: hours, l: "hours" },
    { v: minutes, l: "minutes" },
    { v: seconds, l: "seconds" },
  ];

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-24 text-center">
      <Reveal>
        <h2 className="text-4xl sm:text-5xl">We've been us for</h2>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {cells.map((c) => (
            <div key={c.l} className="glass-card rounded-3xl px-3 py-6">
              <div className="text-rose-gradient font-[family-name:var(--font-display)] text-4xl tabular-nums sm:text-5xl">
                {c.v}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                {c.l}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">…and counting, every second.</p>
      </Reveal>
    </section>
  );
}

export function LoveQuiz({ onCorrect }: { onCorrect: () => void }) {
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <section className="mx-auto w-full max-w-2xl px-6 py-24 text-center">
      <Reveal>
        <div className="glass-card rounded-[2rem] p-10">
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">tiny quiz</p>
          <h2 className="mt-4 text-3xl sm:text-4xl">{love.quiz.question}</h2>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {love.quiz.answers.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => {
                  setPicked(a);
                  onCorrect();
                }}
                className="rounded-full border border-primary/40 px-5 py-3 text-sm transition-colors hover:bg-primary/10"
              >
                {a}
              </button>
            ))}
          </div>

          {picked && (
            <p className="mt-8 font-[family-name:var(--font-hand)] text-2xl text-primary">
              {love.quiz.response}
            </p>
          )}
        </div>
      </Reveal>
    </section>
  );
}

export function GiftFinale({ onLove }: { onLove: () => void }) {
  const [opened, setOpened] = useState(false);
  const [loved, setLoved] = useState(false);

  return (
    <section className="mx-auto w-full max-w-2xl px-6 pb-32 pt-24 text-center">
      {!opened ? (
        <Reveal>
          <button
            type="button"
            onClick={() => setOpened(true)}
            className="glass-card mx-auto grid h-48 w-48 place-items-center rounded-[2rem] text-7xl transition-transform hover:scale-105"
            style={{ animation: "soft-pulse 2.4s ease-in-out infinite" }}
            aria-label="Open your gift"
          >
            🎁
          </button>
          <p className="mt-6 text-sm uppercase tracking-[0.3em] text-muted-foreground">
            one more thing — open it
          </p>
        </Reveal>
      ) : (
        <div className="glass-card rounded-[2rem] p-10 text-left">
          <h2 className="text-center text-4xl">
            <Typewriter text="Happy Girlfriend's Day ❤️" speed={60} />
          </h2>
          <p className="mt-8 whitespace-pre-line text-[15px] leading-8 text-muted-foreground">
            {love.finalLetter}
          </p>
          <p className="mt-8 text-right font-[family-name:var(--font-hand)] text-2xl text-primary">
            — {love.yourName}
          </p>

          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => {
                setLoved(true);
                onLove();
              }}
              className="rounded-full bg-[image:var(--gradient-rose)] px-10 py-4 text-sm uppercase tracking-[0.25em] text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:scale-105"
            >
              I Love You ❤️
            </button>
            {loved && (
              <p className="mt-5 font-[family-name:var(--font-hand)] text-2xl text-primary">
                I love you more.
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
