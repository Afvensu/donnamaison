import { useEffect, useState } from "react";
import { ANNOUNCEMENTS } from "@/data/products";

export function Announce() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => setIdx((i) => (i + 1) % ANNOUNCEMENTS.length), 4200);
    return () => window.clearInterval(t);
  }, []);

  return (
    <div className="relative flex h-[38px] items-center justify-center overflow-hidden bg-ink text-[11px] tracking-[0.16em] text-[#f5efe6] uppercase">
      {ANNOUNCEMENTS.map((msg, i) => (
        <span
          key={msg}
          aria-hidden={i !== idx}
          className={`absolute inset-0 flex items-center justify-center px-4 text-center transition-all duration-500 ${
            i === idx ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"
          }`}
        >
          {msg}
        </span>
      ))}
    </div>
  );
}
