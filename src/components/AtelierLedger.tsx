import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/Reveal";

const BENEFITS = [
  "Private allocations 48 hours before public release",
  "Direct styling advice from our patternmakers",
  "Invitations to seasonal fittings at the atelier",
];

/** The Atelier Ledger — private membership. */
export function AtelierLedger() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setJoined(true);
  };

  return (
    <section className="border-t border-line bg-sand-warm">
      <div className="mx-auto max-w-[680px] px-5 py-16 text-center sm:px-8 lg:py-24">
        <Reveal>
          <span className="eyebrow">By invitation</span>
          <h2 className="mt-4 mb-4 font-serif text-[clamp(28px,3.6vw,46px)] leading-[1.06] font-light tracking-[-0.02em]">
            The Atelier Ledger
          </h2>
          <p className="mb-7 text-[14px] leading-[1.75] text-ink-soft">
            We cut in runs of twenty, not twenty thousand. Members receive private allocations 48
            hours before public release, direct styling advice from our patternmakers, and
            invitations to seasonal fittings.
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

          {joined ? (
            <div className="mx-auto max-w-[460px] border border-terracotta/40 bg-terracotta/5 px-6 py-5 text-[13.5px] text-ink-soft">
              <span className="font-serif text-[17px] text-ink">Your invitation is on its way.</span>
              <br />
              Watch your inbox — the next allocation opens soon.
            </div>
          ) : (
            <form
              onSubmit={submit}
              className="mx-auto flex max-w-[480px] items-stretch border-b border-ink/40 pb-1 transition-colors focus-within:border-terracotta"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="min-w-0 flex-1 bg-transparent py-3.5 text-[13.5px] text-ink outline-none placeholder:text-muted-warm"
              />
              <button
                type="submit"
                className="shrink-0 bg-ink px-7 py-3.5 text-[11px] font-medium tracking-[0.2em] text-bone uppercase transition-colors duration-300 hover:bg-terracotta"
              >
                Request an Invitation
              </button>
            </form>
          )}
          <p className="mt-5 text-[11px] text-muted-warm">
            One or two letters a month. Unsubscribe in a click.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
