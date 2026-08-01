import { useEffect, useRef, useState } from "react";
import { Music, Pause } from "lucide-react";

/**
 * Gentle generated lullaby (WebAudio) so there is music without shipping a
 * large audio file. Starts only on an explicit user gesture.
 */
export function MusicToggle({ className = "" }: { className?: string }) {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => () => stopRef.current?.(), []);

  const start = () => {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = ctxRef.current ?? new Ctor();
    ctxRef.current = ctx;
    void ctx.resume();

    const master = ctx.createGain();
    master.gain.value = 0.0001;
    master.connect(ctx.destination);
    master.gain.exponentialRampToValueAtTime(0.09, ctx.currentTime + 2);

    // A soft, slow arpeggio in F major.
    const notes = [349.23, 440, 523.25, 659.25, 523.25, 440];
    let step = 0;
    const play = () => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = notes[step % notes.length]!;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.6, now + 0.35);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.6);
      osc.connect(gain).connect(master);
      osc.start(now);
      osc.stop(now + 2.8);
      step += 1;
    };
    play();
    const id = setInterval(play, 1400);

    stopRef.current = () => {
      clearInterval(id);
      master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
      setTimeout(() => master.disconnect(), 900);
      stopRef.current = null;
    };
  };

  const toggle = () => {
    if (playing) {
      stopRef.current?.();
      setPlaying(false);
    } else {
      start();
      setPlaying(true);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
      className={`glass-card inline-flex h-11 w-11 items-center justify-center rounded-full text-primary transition-transform hover:scale-105 ${className}`}
    >
      {playing ? <Pause className="h-4 w-4" /> : <Music className="h-4 w-4" />}
    </button>
  );
}
