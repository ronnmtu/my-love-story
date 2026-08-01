import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { love } from "@/lib/love-config";
import { CursorHearts, FallingPetals, Reveal, Typewriter, useBursts } from "@/components/love/effects";
import { MusicToggle } from "@/components/love/music";
import {
  DateRanking,
  FunFacts,
  GiftFinale,
  LoveCounter,
  LoveQuiz,
  MemoryTimeline,
  PolaroidGallery,
  ReasonCards,
} from "@/components/love/scenes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Girlfriend's Day ❤️ — A Little Surprise For You" },
      {
        name: "description",
        content:
          "A cinematic, handmade love letter: our memories, a live love counter, polaroids and one last gift to open.",
      },
      { property: "og:title", content: "Happy Girlfriend's Day ❤️" },
      {
        property: "og:description",
        content: "A handmade love letter with our memories, a live love counter and a gift to open.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [entered, setEntered] = useState(false);
  const [line, setLine] = useState(0);
  const [night, setNight] = useState(false);
  const { fire, layer } = useBursts();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", night);
  }, [night]);

  if (!entered) {
    return (
      <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[oklch(0.16_0.02_320)] px-6 text-center">
        {layer}
        <div className="max-w-lg">
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-light text-[oklch(0.95_0.02_40)] sm:text-4xl">
            <Typewriter
              text={love.openingLines[line] ?? ""}
              speed={70}
              onDone={() => {
                if (line < love.openingLines.length - 1) setTimeout(() => setLine(line + 1), 1200);
              }}
            />
          </h1>

          {line === love.openingLines.length - 1 && (
            <button
              type="button"
              onClick={() => setEntered(true)}
              className="reveal mt-12 rounded-full bg-[image:var(--gradient-rose)] px-10 py-4 text-xs uppercase tracking-[0.3em] text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:scale-105"
              data-visible="true"
            >
              Open your surprise
            </button>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <FallingPetals />
      <CursorHearts />
      {layer}

      <div className="fixed right-5 top-5 z-40 flex gap-2">
        <MusicToggle />
        <button
          type="button"
          onClick={() => setNight((n) => !n)}
          aria-label={night ? "Switch to day" : "Switch to night"}
          className="glass-card inline-flex h-11 w-11 items-center justify-center rounded-full text-primary transition-transform hover:scale-105"
        >
          {night ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>

      <div className="relative z-10">
        <section className="grid min-h-screen place-items-center px-6 text-center">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              for {love.herName}
            </p>
            <h1 className="mt-6 font-[family-name:var(--font-display)] text-5xl font-light leading-[1.05] sm:text-7xl">
              <span className="text-rose-gradient">
                <Typewriter text="Happy Girlfriend's Day ❤️" speed={70} />
              </span>
            </h1>
            <p className="mx-auto mt-8 max-w-md text-sm leading-7 text-muted-foreground">
              Scroll slowly. All of this was made by hand, and all of it is about you.
            </p>
            <span className="mt-16 block text-2xl text-primary/60" aria-hidden>
              ↓
            </span>
          </div>
        </section>

        <ReasonCards />
        <MemoryTimeline />
        <PolaroidGallery />
        <LoveCounter />
        <LoveQuiz onCorrect={() => fire("confetti")} />
        <GiftFinale
          onLove={() => {
            fire("confetti");
            fire("hearts");
          }}
        />

        <footer className="pb-14 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <Reveal>Made with love by {love.yourName}</Reveal>
        </footer>
      </div>
    </main>
  );
}
