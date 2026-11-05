import { useShop } from "@/store/shop";

export function Footer() {
  const { openSizeGuide } = useShop();

  return (
    <footer className="bg-ink text-bone">
      <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:px-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <span className="mb-4 block font-serif text-[20px] tracking-[0.32em] uppercase [text-indent:0.32em]">
              Donna Maison
            </span>
            <p className="max-w-[34ch] text-[12.5px] leading-relaxed text-bone/60">
              Contemporary womenswear, made in Nigeria. Timeless elegance, cut to fit properly, for
              women of every shape.
            </p>
          </div>
          {[
            {
              h: "Shop",
              links: [
                ["New in", "/#collection"],
                ["Dresses", "/#collection"],
                ["Trouser Sets", "/#collection"],
                ["Skirt Sets", "/#collection"],
                ["Occasions", "/#occasions"],
              ] as const,
            },
            {
              h: "House",
              links: [
                ["The atelier", "/#atelier"],
                ["Journal", "/#journal"],
                ["The Atelier Ledger", "/#ledger"],
              ] as const,
            },
          ].map((col) => (
            <div key={col.h}>
              <h4 className="mb-4 text-[10px] font-semibold tracking-[0.22em] uppercase">{col.h}</h4>
              <ul className="space-y-2.5">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-[12.5px] text-bone/60 transition-colors hover:text-gold-dark"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="mb-4 text-[10px] font-semibold tracking-[0.22em] uppercase">Help</h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={openSizeGuide}
                  className="text-[12.5px] text-bone/60 transition-colors hover:text-gold-dark"
                >
                  Size &amp; fit
                </button>
              </li>
              <li className="text-[12.5px] text-bone/60">Shipping</li>
              <li className="text-[12.5px] text-bone/60">Returns &amp; exchanges</li>
              <li className="text-[12.5px] text-bone/60">Contact the atelier</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-bone/10 pt-6 text-[10.5px] tracking-[0.08em] text-bone/40 uppercase">
          <span>© 2026 Donna Maison</span>
          <span>Quietly powerful · Cut to fit · Hand-finished in Lagos</span>
        </div>
      </div>
    </footer>
  );
}
