import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { OCCASIONS, priceShort, type OccasionId, type Product } from "@/data/products";
import {
  BATCH_SIZE,
  filterProducts,
  nextVisibleCount,
  type CategoryFilter,
} from "@/data/discovery";
import { GarmentArt } from "@/components/GarmentArt";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { useShop } from "@/store/shop";
function ProductCard({ product, index }: { product: Product; index: number }) {
  const { openQuickView, saved, toggleSaved } = useShop();
  const isSaved = saved.includes(product.id);
  const art = {
    name: product.name,
    kind: product.kind,
    palette: product.palette,
    studio: product.studio,
  };
  return (
    <Reveal as="article" delay={(index % BATCH_SIZE) * 35} className="group min-w-0">
      <div className="relative aspect-[3/4] overflow-hidden bg-sand-warm">
        <Button
          variant="ghost"
          onClick={() => openQuickView(product.id)}
          aria-label={`Quick view ${product.name}`}
          className="absolute inset-0 h-full w-full rounded-none p-0"
        >
          <GarmentArt
            className="absolute inset-0"
            options={{ ...art, uid: `card-${product.id}-main` }}
          />
          {product.images[1] && (
            <GarmentArt
              className="absolute inset-0 hidden opacity-0 transition-opacity duration-500 sm:block sm:group-hover:opacity-100"
              options={{ ...art, uid: `card-${product.id}-alt` }}
            />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`${isSaved ? "Unsave" : "Save"} ${product.name}`}
          aria-pressed={isSaved}
          onClick={() => toggleSaved(product.id)}
          className={`absolute right-2 top-2 h-11 w-11 bg-paper/85 ${isSaved ? "text-terracotta" : "text-ink-soft"}`}
        >
          <Heart fill={isSaved ? "currentColor" : "none"} />
        </Button>
        <Button
          variant="ghost"
          onClick={() => openQuickView(product.id)}
          className="absolute inset-x-0 bottom-0 hidden h-11 rounded-none bg-ink text-bone opacity-0 transition-opacity sm:flex sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
        >
          Quick view
        </Button>
      </div>
      <div className="grid min-w-0 gap-1 pt-3.5">
        <Link
          to="/products/$slug"
          params={{ slug: product.id }}
          className="min-w-0 break-words font-serif text-[16px] leading-snug hover:text-terracotta sm:text-[18px]"
        >
          {product.name}
        </Link>
        <div className="text-[10px] text-muted-warm uppercase">{product.cat}</div>
        <div className="break-words font-serif text-[15px] leading-snug text-ink">
          {priceShort(product)}
        </div>
      </div>
    </Reveal>
  );
}
export function ProductGrid({
  cat,
  setCat,
  occasion,
  clearOccasion,
  page = 1,
}: {
  cat: CategoryFilter;
  setCat: (c: CategoryFilter) => void;
  occasion: OccasionId | null;
  clearOccasion: () => void;
  page?: number;
}) {
  const list = filterProducts(cat, occasion);
  const key = `${cat}:${occasion}:${page}`;
  const [batch, setBatch] = useState({ key, count: BATCH_SIZE });
  if (batch.key !== key) setBatch({ key, count: BATCH_SIZE });
  const count = batch.key === key ? batch.count : BATCH_SIZE;
  const start = (page - 1) * BATCH_SIZE;
  const remaining = list.slice(start);
  const shown = remaining.slice(0, count);
  const more = shown.length < remaining.length;
  const sentinel = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!more || !sentinel.current || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting))
          setBatch((previous) => ({
            key,
            count: nextVisibleCount(
              previous.key === key ? previous.count : BATCH_SIZE,
              remaining.length,
            ),
          }));
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(sentinel.current);
    return () => observer.disconnect();
  }, [key, count, more, remaining.length]);
  const title = OCCASIONS.find((o) => o.id === occasion)?.title;
  const pages = Math.ceil(list.length / BATCH_SIZE);
  return (
    <section id="collection" className="scroll-mt-24 px-5 pt-4 pb-20 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-8 grid gap-6 sm:grid-cols-2">
          <div className="min-w-0">
            <span className="eyebrow">The Season Edit</span>
            <h2 className="mt-3 font-serif text-[40px] leading-tight font-light">
              {title ?? "The collection"}
            </h2>
          </div>
          <p className="max-w-[44ch] text-[13.5px] leading-relaxed text-ink-soft">
            Donna Maison ready-to-wear. Dresses, trouser sets and skirt sets for every version of
            her.
          </p>
        </Reveal>
        <div className="mb-8 flex flex-wrap gap-2">
          {(["all", "Dresses", "Trouser Sets", "Skirt Sets"] as const).map((c) => (
            <Button
              key={c}
              variant="outline"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={`h-auto min-h-11 whitespace-normal rounded-none px-3 text-[10px] uppercase ${cat === c ? "border-ink bg-ink text-bone" : "border-line text-ink-soft"}`}
            >
              {c === "all" ? "All" : c}
            </Button>
          ))}
          {title && (
            <Button
              variant="outline"
              onClick={clearOccasion}
              className="h-auto min-h-11 whitespace-normal rounded-none text-[10px] text-terracotta"
            >
              {title} ×
            </Button>
          )}
        </div>
        <div
          data-testid="product-grid"
          className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6"
        >
          {shown.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
        {!shown.length && (
          <p className="py-12 text-center text-muted-warm">No pieces in this edit.</p>
        )}
        <div
          ref={sentinel}
          className="mt-8 flex min-h-24 flex-col items-center justify-center gap-4"
        >
          <p aria-live="polite" className="text-center text-[11px] text-muted-warm">
            {more
              ? `Showing ${Math.min(start + shown.length, list.length)} of ${list.length} pieces`
              : `You have viewed ${start ? "this page" : "the full edit"} · ${shown.length} pieces`}
          </p>
          {more && (
            <Button
              variant="outline"
              onClick={() => setBatch({ key, count: nextVisibleCount(count, remaining.length) })}
              className="min-h-11 rounded-none uppercase text-[11px]"
            >
              Load more
            </Button>
          )}
        </div>
        {pages > 1 && (
          <nav aria-label="Collection pages" className="mt-4 flex flex-wrap justify-center gap-2">
            {Array.from({ length: pages }, (_, i) => (
              <Link
                key={i}
                to="/"
                search={{ page: i + 1, category: cat, occasion: occasion ?? undefined }}
                hash="collection"
                aria-current={page === i + 1 ? "page" : undefined}
                className="grid h-11 w-11 place-items-center border border-line text-[11px] hover:border-ink"
              >
                {i + 1}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </section>
  );
}
