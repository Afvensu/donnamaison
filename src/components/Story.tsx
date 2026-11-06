import { GarmentArt } from "@/components/GarmentArt";
import { CRAFT_HIGHLIGHTS, PRODUCTS } from "@/data/products";
import { Reveal } from "@/components/Reveal";
import { useShop } from "@/store/shop";

/** The Atelier story + craftsmanship highlights. */
export function Story() {
  return (
    <>
      <section id="atelier" className="scroll-mt-24 border-y border-line bg-paper px-5 py-16 sm:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 md:grid-cols-2">
          <div className="relative aspect-[3/4] overflow-hidden bg-sand-warm">
            <GarmentArt
              className="absolute inset-0"
              options={{
                uid: "story",
                name: "Saphira Dress",
                kind: "gown",
                hem: 90,
                sleeves: "none",
                palette: ["#3a332c", "#141110", "#6b5a42"],
                studio: "dark",
              }}
            />
          </div>
          <Reveal>
            <span className="eyebrow">The Atelier</span>
            <h2 className="mt-4 mb-6 font-serif text-[clamp(28px,3.4vw,44px)] leading-[1.06] font-light tracking-[-0.02em]">
              Fashion is more than style.
              <br />
              <em className="italic">It's a way of standing.</em>
            </h2>
            <p className="mb-4 text-[14px] leading-relaxed text-ink-soft">
              Donna Maison began with a simple frustration: beautiful clothes that didn't fit real
              bodies, and fit that forgot to be beautiful. So we build from the body out — the seam
              first, the embellishment last.
            </p>
            <p className="mb-8 text-[14px] leading-relaxed text-ink-soft">
              Every piece is cut in small runs and finished by hand. Crepe that moves. Duchess that
              holds its shape. Akwete panels placed by eye, not by machine. Nothing leaves the
              atelier until it hangs the way it was drawn.
            </p>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                ["6–20", "Size range"],
                ["Hand", "Finished"],
                ["Lagos", "Made"],
                ["World", "Shipped"],
              ].map(([b, s]) => (
                <div key={s} className="border-t border-line pt-3">
                  <b className="block font-serif text-[29px] leading-none font-normal">{b}</b>
                  <span className="text-[11px] text-muted-warm">{s}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Craftsmanship highlights */}
      <section className="px-5 py-16 sm:px-8 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="mb-10 text-center">
            <span className="eyebrow">Craftsmanship</span>
            <h2 className="mt-3 font-serif text-[clamp(26px,3vw,40px)] font-light tracking-[-0.02em]">
              Why a Donna Maison costs what it costs
            </h2>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {CRAFT_HIGHLIGHTS.map((c, i) => (
              <Reveal key={c.n} delay={i * 90} className="border-t border-line pt-5">
                <div className="mb-3 font-serif text-[15px] text-terracotta">{c.n}</div>
                <h3 className="mb-2 font-serif text-[22px] font-normal">{c.title}</h3>
                <p className="text-[13px] leading-relaxed text-ink-soft">{c.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/** Fit philosophy — the dark band. */
export function FitSection() {
  const { openSizeGuide } = useShop();
  return (
    <section className="bg-ink text-[#efe8dd]">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:px-16 lg:py-24">
        <Reveal>
          <span className="eyebrow" style={{ color: "rgba(239,232,221,.5)" }}>
            Size &amp; fit
          </span>
          <h2 className="mt-4 mb-5 font-serif text-[clamp(28px,3.4vw,46px)] leading-[1.05] font-light tracking-[-0.02em]">
            Built for a body,
            <br />
            <em className="italic text-gold-dark">not a sample size.</em>
          </h2>
          <p className="mb-4 text-[13.5px] leading-relaxed text-[#efe8dd]/80">
            The fit problem is rarely you. It's a garment drafted on one body and sold to everyone.
            Ours are drafted on four, then graded across the full range — 6 to 20, not 6 to a
            shrug.
          </p>
          <p className="mb-7 text-[13.5px] leading-relaxed text-[#efe8dd]/80">
            If you're between sizes, take the smaller — the crepe has give. If you're taller than
            5'9", message the atelier and we'll cut the length to you.
          </p>
          <div className="mb-8 grid grid-cols-4 gap-2">
            {[
              ["S", "6–8"],
              ["M", "10–12"],
              ["L", "14–16"],
              ["XL", "18–20"],
            ].map(([b, s]) => (
              <div
                key={b}
                className="border border-bone/20 px-3 py-3 text-center transition-colors duration-300 hover:border-gold-dark hover:bg-gold-dark/10"
              >
                <b className="block font-serif text-[17px] font-normal">{b}</b>
                <span className="text-[10.5px] text-[#efe8dd]/60">{s}</span>
              </div>
            ))}
          </div>
          <button
            onClick={openSizeGuide}
            className="bg-bone px-8 py-4 text-[11px] font-medium tracking-[0.2em] text-ink uppercase transition-colors duration-300 hover:bg-terracotta hover:text-white"
          >
            Open the size guide
          </button>
        </Reveal>
        <Reveal delay={120}>
          <ul className="space-y-5">
            {[
              [
                "Read the fit note, not just the size.",
                "Every product page carries a note on whether it runs true, small or generous — written by the person who cut it.",
              ],
              [
                "Free fit advice before you buy.",
                "Send your measurements and the occasion. We'll tell you the size, and tell you honestly if it isn't right for you.",
              ],
              [
                "Alterations, included.",
                "Length and waist taken in at the atelier at no cost within 14 days of delivery.",
              ],
              [
                "Returns that don't punish you.",
                "Three to five days in Nigeria, seven to ten internationally. Unworn, tags on.",
              ],
            ].map(([b, d], i) => (
              <li key={b} className="flex gap-4 border-b border-bone/10 pb-5 last:border-b-0">
                <span className="w-6 shrink-0 font-serif text-[15px] text-gold-dark">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[13px] leading-relaxed text-[#efe8dd]/80">
                  <b className="font-medium text-bone">{b}</b> {d}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/** The Journal — credibility through stories. */
export function Journal() {
  const entries = [
    {
      k: "Campaign",
      title: "The women who wear it before we photograph it",
      photoProductId: "saphira-dress",
      palette: ["#6b4a2e", "#1f1710", "#a3794d"] as [string, string, string],
      art: { kind: "midi" as const, hem: 74, sleeves: "short" as const },
      studio: "warm" as const,
    },
    {
      k: "Craft",
      title: "Why Akwete is placed by hand",
      photoProductId: "bianca-dress",
      palette: ["#33333c", "#14141a", "#71717f"] as [string, string, string],
      art: { kind: "midi" as const, hem: 72, sleeves: "long" as const, akwette: true },
      studio: "dark" as const,
    },
    {
      k: "Fit",
      title: "The four bodies we draft on",
      photoProductId: "rene-trouser-set",
      palette: ["#c9b89e", "#8a7862", "#ece2d0"] as [string, string, string],
      art: { kind: "trouser" as const, sleeves: "long" as const, trousers: true },
      studio: "bone" as const,
    },
  ];

  return (
    <section id="journal" className="scroll-mt-24 px-5 py-16 sm:px-8 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow">The Journal</span>
            <h2 className="mt-3 font-serif text-[clamp(30px,3.8vw,50px)] leading-[1.02] font-light tracking-[-0.02em]">
              Notes from
              <br />
              the atelier
            </h2>
          </div>
          <p className="max-w-[38ch] text-[13.5px] leading-relaxed text-ink-soft">
            The people, the fabric, the reasoning. Because a brand you understand is a brand you
            trust.
          </p>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {entries.map((e, i) => (
            <Reveal key={e.k} delay={i * 90}>
              {(() => {
                const photoProduct = PRODUCTS.find((product) => product.id === e.photoProductId);
                return (
              <article
                className={`group relative cursor-pointer overflow-hidden ${i === 0 ? "h-[440px]" : "h-[340px]"}`}
              >
                <GarmentArt
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]"
                  options={{
                    uid: `journal-${e.k}`,
                    name: photoProduct?.name,
                    ...e.art,
                    palette: e.palette,
                    studio: e.studio,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="relative z-2 flex h-full flex-col justify-end p-6 text-white">
                  <div className="text-[9.5px] tracking-[0.22em] uppercase opacity-80">{e.k}</div>
                  <h3 className="mt-2 font-serif text-[clamp(19px,2vw,27px)] leading-tight font-normal">
                    {e.title}
                  </h3>
                  <span className="mt-3 text-[10px] tracking-[0.16em] uppercase opacity-75">
                    Read {i === 0 ? "the story" : ""} <i className="ml-1 inline transition-transform duration-300 group-hover:translate-x-1">→</i>
                  </span>
                </div>
              </article>
                );
              })()}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
