import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  CURRENCIES,
  OCCASIONS,
  PRODUCTS,
  SIZES,
  priceFull,
  productById,
  type Product,
} from "@/data/products";
import { GarmentArt, altPalette } from "@/components/GarmentArt";
import { ColourSwatches, SizeButton } from "@/components/Drawers";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { useShop } from "@/store/shop";

type ProductLoaderData = { product: Product };

export const Route = createFileRoute("/products/$slug")({
  head: ({ loaderData }) => {
    const data = loaderData as ProductLoaderData | undefined;
    return {
      meta: [
        { title: data ? `${data.product.name} — Donna Maison` : "Donna Maison" },
        {
          name: "description",
          content:
            data?.product.note ?? "Donna Maison ready-to-wear for the modern, cosmopolitan woman.",
        },
        {
          property: "og:title",
          content: data ? `${data.product.name} — Donna Maison` : "Donna Maison collection",
        },
        {
          property: "og:description",
          content: data?.product.desc ?? "Explore Donna Maison ready-to-wear.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  loader: ({ params }): ProductLoaderData => {
    const product = productById(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData() as ProductLoaderData;
  const { addToBag, openSizeGuide } = useShop();
  const [colour, setColour] = useState<string>(product.colours[0] ?? "");
  const [size, setSize] = useState<string>("S");
  const [fitOpen, setFitOpen] = useState(false);

  const occasionTitles = OCCASIONS.filter((o) => product.occasions.includes(o.id));

  return (
    <main className="bg-bone">
      <div className="mx-auto max-w-[1400px] px-5 pt-8 sm:px-8 lg:px-16">
        <nav className="mb-8 text-[10.5px] tracking-[0.14em] text-muted-warm uppercase">
          <a href="/" className="hover:text-ink">
            Home
          </a>
          <span className="mx-2">/</span>
          <a href="/#collection" className="hover:text-ink">
            {product.cat}
          </a>
          <span className="mx-2">/</span>
          <span className="text-ink">{product.name}</span>
        </nav>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-16">
        {/* Art */}
        <div className="grid gap-3">
          <div className="relative aspect-[3/4] overflow-hidden bg-sand-warm">
            <GarmentArt
              className="absolute inset-0"
              options={{
                uid: `pdp-${product.id}`,
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
          <div className="relative aspect-[3/4] overflow-hidden bg-sand-warm">
            <GarmentArt
              className="absolute inset-0"
              options={{
                uid: `pdp-${product.id}-alt`,
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
        </div>

        {/* Details */}
        <div className="lg:pt-2">
          <span className="eyebrow">{product.cat}</span>
          <h1 className="mt-3 mb-2 font-serif text-[clamp(34px,4vw,54px)] leading-[1.02] font-light tracking-[-0.02em]">
            {product.name}
          </h1>
          <div className="mb-6 font-serif text-[22px]">{priceFull(product)}</div>
          <p className="mb-8 max-w-[52ch] text-[14px] leading-relaxed text-ink-soft">
            {product.desc}
          </p>

          {/* Craft / investment value */}
          {product.craft.length > 0 && (
            <ul className="mb-8 border-y border-line py-5">
              {product.craft.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-3 py-1.5 text-[13px] leading-relaxed text-ink-soft"
                >
                  <span className="mt-[7px] h-[7px] w-[7px] shrink-0 rounded-full bg-terracotta" />
                  {c}
                </li>
              ))}
            </ul>
          )}

          {/* Fit note */}
          <div className="mb-7 border-l-2 border-terracotta bg-sand-warm/60 px-4 py-3.5 text-[12.5px] leading-relaxed text-ink-soft">
            <b className="font-semibold text-ink">Fit note — read this first:</b> {product.fit}
            <Button
              variant="ghost"
              onClick={() => setFitOpen((v) => !v)}
              className="mt-2 block text-[10.5px] tracking-[0.12em] text-terracotta uppercase hover:underline"
            >
              {fitOpen ? "Hide fit guidance" : "Show fit guidance"}
            </Button>
            {fitOpen && (
              <p className="mt-2 text-[12px] leading-relaxed">
                Check the available size information and contact Donna Maison for garment
                measurements before ordering. No custom cutting or fitting service is offered here.
              </p>
            )}
          </div>

          {/* Composition + occasions */}
          <dl className="mb-8 grid gap-3 text-[13px]">
            {product.fabric && (
              <div className="grid min-w-0 gap-2 sm:grid-cols-[110px_minmax(0,1fr)]">
                <dt className="w-[110px] shrink-0 text-[10.5px] tracking-[0.14em] text-muted-warm uppercase">
                  Fabric
                </dt>
                <dd className="text-ink-soft">{product.fabric}</dd>
              </div>
            )}
            <div className="grid min-w-0 gap-2 sm:grid-cols-[110px_minmax(0,1fr)]">
              <dt className="w-[110px] shrink-0 text-[10.5px] tracking-[0.14em] text-muted-warm uppercase">
                Occasions
              </dt>
              <dd className="flex flex-wrap gap-2">
                {occasionTitles.map((o) => (
                  <span
                    key={o.id}
                    className="border border-line px-3 py-1 text-[10px] tracking-[0.14em] text-ink-soft uppercase"
                  >
                    {o.title}
                  </span>
                ))}
              </dd>
            </div>
            <div className="grid min-w-0 gap-2 sm:grid-cols-[110px_minmax(0,1fr)]">
              <dt className="w-[110px] shrink-0 text-[10.5px] tracking-[0.14em] text-muted-warm uppercase">
                Sizing
              </dt>
              <dd className="text-ink-soft">Confirm available sizing with Donna Maison</dd>
            </div>
          </dl>

          {/* Options */}
          <div className="mb-6">
            <span className="eyebrow mb-2.5 block">Colour — {colour}</span>
            <ColourSwatches product={product} colour={colour} onPick={setColour} />
          </div>
          <div className="mb-8">
            <span className="eyebrow mb-2.5 block">Size</span>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <SizeButton
                  key={s.id}
                  size={s}
                  active={size === s.id}
                  onClick={() => setSize(s.id)}
                />
              ))}
            </div>
            <Button
              variant="ghost"
              onClick={openSizeGuide}
              className="mt-3 text-[11px] tracking-[0.12em] text-terracotta uppercase hover:underline"
            >
              Size &amp; fit guide →
            </Button>
          </div>

          <Button
            variant="ghost"
            onClick={() => addToBag(product.id, colour, size)}
            className="h-auto whitespace-normal rounded-none mb-3 w-full bg-ink px-8 py-4 text-[11px] font-medium tracking-[0.2em] text-bone uppercase transition-colors duration-300 hover:bg-terracotta"
          >
            Add to bag — {priceFull(product)}
          </Button>
          <p className="mb-8 text-[10.5px] leading-relaxed text-muted-warm">
            Your bag is saved on this device. Checkout and payments are not connected.
          </p>

          <Reveal className="border-t border-line pt-6">
            <span className="eyebrow">Discover occasion edits</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {occasionTitles.map((o) => (
                <a
                  key={o.id}
                  href="/#collection"
                  className="border border-ink px-4 py-2 text-[10.5px] tracking-[0.16em] uppercase transition-colors hover:bg-ink hover:text-bone"
                >
                  {o.title}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Related pieces */}
      <div className="mx-auto max-w-[1400px] px-5 pb-20 sm:px-8 lg:px-16">
        <h2 className="mb-6 font-serif text-[clamp(24px,2.6vw,36px)] font-light tracking-[-0.02em]">
          More from the collection
        </h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 lg:gap-x-6">
          {PRODUCTS.filter((p) => p.id !== product.id)
            .slice(0, 4)
            .map((p) => (
              <a key={p.id} href={`/products/${p.id}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-sand-warm">
                  <GarmentArt
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]"
                    options={{
                      uid: `rel-${p.id}`,
                      name: p.name,
                      kind: p.kind,
                      hem: p.hem,
                      sleeves: p.sleeves,
                      trousers: p.trousers,
                      twotone: p.twotone,
                      akwette: p.akwette,
                      ruched: p.ruched,
                      palette: p.palette,
                      studio: p.studio,
                    }}
                  />
                </div>
                <div className="grid min-w-0 gap-1 pt-3">
                  <div className="font-serif text-[16px] leading-snug">{p.name}</div>
                  <div className="font-serif text-[14px]">
                    {CURRENCIES[p.cur].symbol}
                    {p.min.toLocaleString("en-GB", {
                      minimumFractionDigits: p.min % 1 ? 2 : 0,
                      maximumFractionDigits: 2,
                    })}
                    {p.min !== p.max && "+"}
                  </div>
                </div>
              </a>
            ))}
        </div>
      </div>
    </main>
  );
}
