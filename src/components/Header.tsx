import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useShop } from "@/store/shop";

const NAV_LEFT = [
  { label: "New In", href: "/#collection" },
  { label: "Occasions", href: "/#occasions" },
  { label: "The Atelier", href: "/#atelier" },
  { label: "Journal", href: "/#journal" },
];

export function Header() {
  const { bagCount, openBag, openSizeGuide } = useShop();
  const [stuck, setStuck] = useState(false);
  const [menuOn, setMenuOn] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-60 border-b bg-bone/93 backdrop-blur-[14px] transition-all duration-400 ${
          stuck ? "border-line shadow-[0_1px_24px_rgba(28,25,23,0.05)]" : "border-transparent"
        }`}
      >
        <div className="mx-auto grid max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center gap-5 px-5 sm:px-8 lg:px-16">
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LEFT.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[11.5px] font-medium tracking-[0.15em] text-ink-soft uppercase transition-colors duration-250 hover:text-terracotta"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <Link
            to="/"
            className="font-serif text-[clamp(19px,2.1vw,25px)] font-normal tracking-[0.32em] whitespace-nowrap text-ink uppercase [text-indent:0.32em]"
          >
            Donna Maison
          </Link>
          <div className="flex items-center justify-end gap-5">
            <button
              onClick={openSizeGuide}
              className="hidden text-[11.5px] font-medium tracking-[0.15em] text-ink-soft uppercase transition-colors duration-250 hover:text-terracotta md:block"
            >
              Size &amp; Fit
            </button>
            <button
              onClick={openBag}
              className="text-[11.5px] font-medium tracking-[0.15em] text-ink-soft uppercase transition-colors duration-250 hover:text-terracotta"
            >
              Bag
              <span
                key={bagCount}
                className="ml-1.5 inline-flex min-w-[17px] -translate-y-px items-center justify-center rounded-[9px] bg-terracotta px-[5px] text-[9.5px] font-semibold tracking-normal text-white transition-transform duration-300"
                style={{ transform: bagCount ? "translateY(-1px) scale(1.06)" : "translateY(-1px)" }}
              >
                {bagCount}
              </span>
            </button>
            <button
              onClick={() => setMenuOn(true)}
              className="flex items-center gap-2 text-[11.5px] font-medium tracking-[0.15em] text-ink-soft uppercase lg:hidden"
            >
              <span className="flex flex-col gap-[3px]">
                <span className="h-px w-4 bg-ink-soft" />
                <span className="h-px w-4 bg-ink-soft" />
              </span>
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation */}
      <div
        className={`fixed inset-0 z-80 bg-ink text-bone transition-opacity duration-300 lg:hidden ${
          menuOn ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <span className="font-serif text-[17px] tracking-[0.32em] uppercase [text-indent:0.32em]">
            Donna Maison
          </span>
          <button
            onClick={() => setMenuOn(false)}
            aria-label="Close menu"
            className="text-lg text-bone/70 transition-colors hover:text-bone"
          >
            ✕
          </button>
        </div>
        <nav className="flex flex-col gap-2 px-6 pt-8">
          {[
            { label: "New In", href: "/#collection" },
            { label: "Occasions", href: "/#occasions" },
            { label: "The Atelier", href: "/#atelier" },
            { label: "Journal", href: "/#journal" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOn(false)}
              className="border-b border-bone/10 py-4 font-serif text-3xl font-light transition-colors hover:text-gold-dark"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMenuOn(false);
              openSizeGuide();
            }}
            className="border-b border-bone/10 py-4 text-left font-serif text-3xl font-light transition-colors hover:text-gold-dark"
          >
            Size &amp; Fit
          </button>
        </nav>
      </div>
    </>
  );
}
