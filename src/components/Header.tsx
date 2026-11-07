import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { useShop } from "@/store/shop";
const NAV = [
  { label: "New In", href: "/#collection" },
  { label: "Occasions", href: "/#occasions" },
  { label: "About", href: "/#atelier" },
  { label: "Journal", href: "/#journal" },
];
export function Header() {
  const { bagCount, openBag, openSizeGuide } = useShop();
  const [stuck, setStuck] = useState(false);
  const [menuOn, setMenuOn] = useState(false);
  const closeMenu = useCallback(() => setMenuOn(false), []);
  const modalRef = useModal(menuOn, closeMenu);
  useEffect(() => {
    const scroll = () => setStuck(window.scrollY > 8);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  return (
    <>
      <header
        className={`sticky top-0 z-60 border-b bg-bone/93 backdrop-blur-[14px] ${stuck ? "border-line shadow-sm" : "border-transparent"}`}
      >
        <div className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-4 py-3 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-5 lg:px-16">
          <nav className="hidden min-w-0 items-center gap-5 lg:flex">
            {NAV.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[11px] text-ink-soft uppercase hover:text-terracotta"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <Link
            to="/"
            className="min-w-0 whitespace-nowrap font-serif text-[19px] uppercase text-ink sm:text-[23px] lg:text-[25px]"
          >
            Donna Maison
          </Link>
          <div className="flex shrink-0 items-center justify-end gap-1 sm:gap-3">
            <Button
              variant="ghost"
              onClick={openSizeGuide}
              className="hidden text-[11px] uppercase lg:inline-flex"
            >
              Size &amp; Fit
            </Button>
            <Button
              variant="ghost"
              onClick={openBag}
              aria-label={`Open bag, ${bagCount} items`}
              className="h-11 px-2 text-[11px] uppercase"
            >
              <ShoppingBag aria-hidden="true" />
              <span className="hidden sm:inline">Bag</span>
              <span className="text-terracotta">{bagCount}</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOn(true)}
              aria-label="Open menu"
              aria-expanded={menuOn}
              className="h-11 w-11 lg:hidden"
            >
              <Menu />
            </Button>
          </div>
        </div>
      </header>
      <div
        ref={modalRef}
        role="dialog"
        aria-modal={menuOn || undefined}
        aria-label="Navigation"
        aria-hidden={!menuOn}
        inert={!menuOn}
        tabIndex={-1}
        className={`fixed inset-0 z-80 bg-ink text-bone transition-opacity duration-300 ${menuOn ? "visible opacity-100" : "invisible pointer-events-none opacity-0"}`}
      >
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-6 py-6">
          <span className="min-w-0 font-serif text-[19px] uppercase">Donna Maison</span>
          <Button variant="ghost" size="icon" onClick={closeMenu} aria-label="Close menu">
            <X />
          </Button>
        </div>
        <nav className="flex flex-col px-6 pt-8">
          {NAV.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={closeMenu}
              className="border-b border-bone/10 py-4 font-serif text-3xl"
            >
              {l.label}
            </a>
          ))}
          <Button
            variant="ghost"
            onClick={() => {
              closeMenu();
              openSizeGuide();
            }}
            className="h-auto justify-start rounded-none border-b border-bone/10 py-4 font-serif text-3xl"
          >
            Size &amp; Fit
          </Button>
        </nav>
      </div>
    </>
  );
}
