import { GarmentArt } from "@/components/GarmentArt";
import { CRAFT_HIGHLIGHTS, PRODUCTS } from "@/data/products";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { SIZES } from "@/data/products";
import { useShop } from "@/store/shop";

/** Ready-to-wear brand story and category highlights. */
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
            <span className="eyebrow">About Donna Maison</span>
            <h2 className="mt-4 mb-6 font-serif text-[clamp(28px,3.4vw,44px)] leading-[1.06] font-light tracking-[-0.02em]">
              For every version
              <br />
              <em className="italic">of her.</em>
            </h2>
            <p className="mb-4 text-[14px] leading-relaxed text-ink-soft">
              Donna Maison is a ready-to-wear fashion brand for the modern, cosmopolitan woman. Dresses, trouser sets and skirt sets for the different contexts of her life.
            </p>
            <p className="mb-8 text-[14px] leading-relaxed text-ink-soft">
              From professional occasions to celebrations and everyday plans, personal style is the thread that connects them. Refined style, effortless wear and confidence — on your terms.
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {[
                ["Work", "Professional occasions"],
                ["Celebrate", "Special occasions"],
                ["Everyday", "Casual plans"],
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
            <span className="eyebrow">The collection</span>
            <h2 className="mt-3 font-serif text-[clamp(26px,3vw,40px)] font-light tracking-[-0.02em]">
              Ready-to-wear, in three expressions
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
    <section className="bg-ink text-bone">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:px-16 lg:py-24">
        <Reveal>
          <span className="eyebrow" >
            Size &amp; fit
          </span>
          <h2 className="mt-4 mb-5 font-serif text-[clamp(28px,3.4vw,46px)] leading-[1.05] font-light tracking-[-0.02em]">
            Find your size,
            <br />
            <em className="italic text-gold-dark">wear it your way.</em>
          </h2>
          <p className="mb-7 text-[13.5px] leading-relaxed text-bone/80">
            Choose ready-to-wear sizing with care. Check available size information and contact Donna Maison before ordering if you are unsure. Detailed garment measurements are not available here.
          </p>
          <div className="mb-8 grid grid-cols-4 gap-2">
            {SIZES.map(s => <div key={s.id} className="border border-bone/20 px-3 py-3 text-center font-serif">{s.id}</div>)}
          </div>
          <Button variant="ghost"
            onClick={openSizeGuide}
            className="h-auto whitespace-normal rounded-none bg-bone px-8 py-4 text-[11px] font-medium tracking-[0.2em] text-ink uppercase transition-colors duration-300 hover:bg-terracotta hover:text-paper"
          >
            Open the size guide
          </Button>
        </Reveal>
        <Reveal delay={120}>
          <ul className="space-y-5">
            {[
              ["Check the available sizes.", "Confirm the size options for the piece you are considering."],
              ["Measurements matter.", "Ask Donna Maison for garment measurements before ordering when they are not listed."],
              ["Ready-to-wear, not custom-made.", "Choose the available style and size that suit your preferences."],
            ].map(([b, d], i) => (
              <li key={b} className="flex gap-4 border-b border-bone/10 pb-5 last:border-b-0">
                <span className="w-6 shrink-0 font-serif text-[15px] text-gold-dark">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[13px] leading-relaxed text-bone/80">
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
      k: "Styling",
      title: "From everyday plans to evening occasions",
      photoProductId: "saphira-dress",
      palette: ["#6b4a2e", "#1f1710", "#a3794d"] as [string, string, string],
      art: { kind: "midi" as const, hem: 74, sleeves: "short" as const },
      studio: "warm" as const,
    },
    {
      k: "Colour",
      title: "A colour palette that feels like you",
      photoProductId: "bianca-dress",
      palette: ["#33333c", "#14141a", "#71717f"] as [string, string, string],
      art: { kind: "midi" as const, hem: 72, sleeves: "long" as const, akwette: true },
      studio: "dark" as const,
    },
    {
      k: "Wardrobe",
      title: "A fresh perspective on trouser sets",
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
              your wardrobe
            </h2>
          </div>
          <p className="max-w-[38ch] text-[13.5px] leading-relaxed text-ink-soft">
            Styling, colour and occasion dressing for the many sides of your wardrobe.
          </p>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {entries.map((e, i) => (
            <Reveal key={e.k} delay={i * 90}>
              {(() => {
                const photoProduct = PRODUCTS.find((product) => product.id === e.photoProductId);
                return (
              <article
                className={`group relative overflow-hidden ${i === 0 ? "h-[440px]" : "h-[340px]"}`}
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
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />
                <div className="relative z-2 flex h-full flex-col justify-end p-6 text-paper">
                  <div className="text-[9.5px] tracking-[0.22em] uppercase opacity-80">{e.k}</div>
                  <h3 className="mt-2 font-serif text-[clamp(19px,2vw,27px)] leading-tight font-normal">
                    {e.title}
                  </h3>

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
