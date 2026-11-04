import { Link } from "@tanstack/react-router";
import {
  CURRENCIES,
  OCCASIONS,
  PRODUCTS,
  priceShort,
  type OccasionId,
  type Product,
} from "@/data/products";
import { GarmentArt, altPalette } from "@/components/GarmentArt";
import { Reveal } from "@/components/Reveal";
import { useShop } from "@/store/shop";

type CatFilter = "all" | "Dresses" | "Sets";
type CurFilter = "all" | "NGN" | "USD" | "EUR";

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { openQuickView, saved, toggleSaved } = useShop();
  const isSaved = saved.includes(product.id);
  const occasionLabels = product.occasions
    .map((o) => OCCASIONS.find((x) => x.id === o)?.title)
    .filter(Boolean)
    .join(" · ");

  return (
    <Reveal as="article" delay={index * 55} className="group flex flex-col">
      <div
        className="relative aspect-[3/4] cursor-pointer overflow-hidden bg-sand-warm"
        onClick={() => openQuickView(product.id)}
      >
        <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0">
          <GarmentArt
            className="absolute inset-0"
            options={{
              uid: `card-${product.id}-main`,
              name: product.name,
              kind: product.kind,
              hem: product.hem,
              sleeves: product.sleeves,
              trousers: product.trousers,
              twotone: product.twotone,
              akwette: product.akwette,
              ruched: product.ruched,
              palette: product.palette,
              studio: product.studio,
            }}
          />
        </div>
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <GarmentArt
            className="absolute inset-0"
            options={{
              uid: `card-${product.id}-alt`,
              name: product.name,
              kind: product.kind,
              hem: product.hem,
              sleeves: product.sleeves,
              trousers: product.trousers,
              twotone: product.twotone,
              akwette: product.akwette,
              ruched: product.ruched,
              palette: altPalette(product.palette),
              studio: product.studio,
            }}
          />
        </div>
        {product.min !== product.max && (
          <div className="absolute top-3 left-3 bg-ink/86 px-2.5 py-1 text-[9px] tracking-[0.16em] text-bone uppercase">
            Price range
          </div>
        )}
        <button
          aria-label="Save"
          onClick={(e) => {
            e.stopPropagation();
            toggleSaved(product.id);
          }}
          className={`absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-[14px] transition-all duration-300 ${
            isSaved ? "bg-terracotta text-white opacity-100" : "bg-paper/85 text-ink-soft opacity-0 group-hover:opacity-100"
          }`}
        >
          {isSaved ? "♥" : "♡"}
        </button>
        <div
          onClick={(e) => {
            e.stopPropagation();
            openQuickView(product.id);
          }}
          className="absolute right-0 bottom-0 left-0 translate-y-full bg-ink py-3 text-center text-[10.5px] font-medium tracking-[0.2em] text-bone uppercase transition-transform duration-300 group-hover:translate-y-0"
        >
          Quick add
        </div>
      </div>
      <div className="flex items-start justify-between gap-3 pt-3.5">
        <div>
          <Link
            to="/products/$slug"
            params={{ slug: product.id }}
            className="font-serif text-[17.5px] leading-snug underline-offset-4 hover:text-terracotta hover:underline"
          >
            {product.name}
          </Link>
          <div className="text-[11px] text-muted-warm">{product.note}</div>
          <div className="mt-1 text-[9.5px] tracking-[0.14em] text-muted-warm/80 uppercase">
            {occasionLabels}
          </div>
        </div>
        <div className="text-right whitespace-nowrap">
          <div className="font-serif text-[15px]">{priceShort(product)}</div>
          <div className="text-[9.5px] tracking-[0.1em] text-muted-warm uppercase">
            {CURRENCIES[product.cur].region}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function ProductGrid({
  cat,
  setCat,
  cur,
  setCur,
  occasion,
  clearOccasion,
}: {
  cat: CatFilter;
  setCat: (c: CatFilter) => void;
  cur: CurFilter;
  setCur: (c: CurFilter) => void;
  occasion: OccasionId | null;
  clearOccasion: () => void;
}) {
  const list = PRODUCTS.filter(
    (p) =>
      (cat === "all" || p.cat === cat) &&
      (cur === "all" || p.cur === cur) &&
      (!occasion || p.occasions.includes(occasion)),
  );

  const occasionTitle = occasion ? OCCASIONS.find((o) => o.id === occasion)?.title : null;

  return (
    <section id="collection" className="scroll-mt-24 px-5 pt-4 pb-20 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow">The Season Edit</span>
            <h2 className="mt-3 font-serif text-[clamp(30px,3.8vw,50px)] leading-[1.02] font-light tracking-[-0.02em]">
              {occasionTitle ?? "New in"}
            </h2>
          </div>
          <p className="max-w-[44ch] text-[13.5px] leading-relaxed text-ink-soft">
            {occasionTitle
              ? "Pieces cut for this exact room. Each one named, each one cut in a small run at the atelier."
              : "Ten pieces, ready to wear. Each one named, each one cut in a small run at the atelier."}
          </p>
        </Reveal>

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {(["all", "Dresses", "Sets"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`border px-4 py-2 text-[10.5px] tracking-[0.16em] uppercase transition-all duration-300 ${
                  cat === c
                    ? "border-ink bg-ink text-bone"
                    : "border-line text-ink-soft hover:border-ink"
                }`}
              >
                {c === "all" ? "All" : c}
              </button>
            ))}
            {occasionTitle && (
              <button
                onClick={clearOccasion}
                className="flex items-center gap-2 border border-terracotta bg-terracotta/10 px-4 py-2 text-[10.5px] tracking-[0.16em] text-terracotta uppercase transition-colors hover:bg-terracotta hover:text-white"
              >
                {occasionTitle} <span aria-hidden>✕</span>
              </button>
            )}
          </div>
          <select
            value={cur}
            onChange={(e) => setCur(e.target.value as CurFilter)}
            aria-label="Region and currency"
            className="cursor-pointer appearance-none rounded-full border border-line bg-transparent py-2.5 pr-9 pl-4 text-[10.5px] tracking-[0.14em] text-ink-soft uppercase transition-colors hover:border-ink"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%238a8279' fill='none' stroke-width='1.2'/%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 13px center",
            }}
          >
            <option value="all">All regions</option>
            <option value="NGN">Nigeria — ₦</option>
            <option value="USD">International — $</option>
            <option value="EUR">Europe — €</option>
          </select>
        </div>

        {list.length === 0 ? (
          <p className="py-16 text-center text-[13px] text-muted-warm">
            Nothing listed here yet. Choose another region — or ask the atelier about a private
            order.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {list.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}

        <p className="mx-auto mt-12 max-w-[72ch] text-[11px] leading-[1.7] text-muted-warm">
          <b className="font-semibold text-ink-soft">Every piece includes:</b> a transparent fit
          note written by the cutter · full fabric composition · UK sizes 6–20 · complimentary
          atelier fitting and alterations within 14 days. Built to outlast five seasons of fast
          fashion.
        </p>
      </div>
    </section>
  );
}
