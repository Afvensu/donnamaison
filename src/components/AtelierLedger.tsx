import { Reveal } from "@/components/Reveal";
const BENEFITS = ["New arrivals", "Seasonal collection updates", "Styling notes"];
export function AtelierLedger() {
  return (
    <section className="border-t border-line bg-sand-warm">
      <div className="mx-auto max-w-[680px] px-5 py-16 text-center sm:px-8 lg:py-24">
        <Reveal>
          <span className="eyebrow">The newsletter</span>
          <h2 className="mt-4 mb-4 font-serif text-[clamp(28px,3.6vw,46px)] leading-[1.06] font-light tracking-[-0.02em]">
            The Donna Maison Ledger
          </h2>
          <p className="mb-7 text-[14px] leading-[1.75] text-ink-soft">
            New arrivals, seasonal collection updates and styling notes from Donna Maison.
          </p>

          <ul className="mx-auto mb-9 flex max-w-[560px] flex-col gap-2.5 text-left">
            {BENEFITS.map((b, i) => (
              <li key={b} className="flex items-start gap-3 text-[12.5px] leading-relaxed text-ink-soft">
                <span className="mt-0.5 font-serif text-[13px] text-terracotta">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {b}
              </li>
            ))}
          </ul>

          <div className="mx-auto max-w-[480px] border-t border-line pt-5 text-[12px] text-muted-warm">
            Newsletter sign-up is currently unavailable. No email addresses are collected here.
          </div>
        </Reveal>
      </div>
    </section>
  );
}
