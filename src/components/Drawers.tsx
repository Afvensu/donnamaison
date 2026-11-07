import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CURRENCIES, SIZES, priceFull, productById, type Product } from "@/data/products";
import { GarmentArt } from "@/components/GarmentArt";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { useShop } from "@/store/shop";

export function SizeButton({
  size,
  active,
  onClick,
  dark = false,
}: {
  size: (typeof SIZES)[number];
  active: boolean;
  onClick: () => void;
  dark?: boolean;
}) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={`h-auto whitespace-normal rounded-none flex min-w-[64px] flex-col items-center gap-0.5 border px-3.5 py-2.5 transition-all duration-300 ${
        active
          ? "border-ink bg-ink text-bone"
          : dark
            ? "border-bone/25 text-bone hover:border-gold-dark hover:bg-gold-dark/10"
            : "border-line text-ink-soft hover:border-ink"
      }`}
    >
      <span className="text-[12px] font-medium tracking-[0.1em]">{size.id}</span>
      <span className={`text-[9.5px] tracking-[0.08em] ${active ? "text-bone/70" : "opacity-60"}`}>
        {size.id}
      </span>
    </Button>
  );
}

export function ColourSwatches({
  product,
  colour,
  onPick,
  dark = false,
}: {
  product: Product;
  colour: string;
  onPick: (c: string) => void;
  dark?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {product.colours.map((c) => (
        <Button
          variant="ghost"
          key={c}
          onClick={() => onPick(c)}
          className={`h-auto whitespace-normal rounded-none border px-3.5 py-2 text-[10.5px] tracking-[0.14em] uppercase transition-all duration-300 ${
            colour === c
              ? "border-ink bg-ink text-bone"
              : dark
                ? "border-bone/25 text-bone hover:border-gold-dark"
                : "border-line text-ink-soft hover:border-ink"
          }`}
        >
          {c}
        </Button>
      ))}
    </div>
  );
}

/** Quick view drawer: art, colour, size, fit note, add to bag. */
export function QuickView() {
  const { drawer, quickViewId, closeDrawer, addToBag, openSizeGuide } = useShop();
  const product = quickViewId ? productById(quickViewId) : undefined;
  const [colour, setColour] = useState<string>("");
  const [size, setSize] = useState<string>("S");

  // Reset selections when a new product opens
  const openId = product?.id ?? null;
  const [lastId, setLastId] = useState<string | null>(null);
  if (openId !== lastId) {
    setLastId(openId);
    setColour(product?.colours[0] ?? "");
    setSize("S");
  }

  const on = drawer === "quickview" && !!product;
  const modalRef = useModal(on, closeDrawer);
  const label = "Product quick view";

  return (
    <aside
      ref={modalRef}
      role="dialog"
      aria-label={label}
      aria-modal={on || undefined}
      inert={!on}
      tabIndex={-1}
      aria-hidden={!on}
      className={`fixed top-0 right-0 z-90 flex h-full w-full max-w-[880px] flex-col bg-paper shadow-2xl transition-[transform,visibility] duration-450 ease-luxe ${
        on ? "translate-x-0 visible" : "pointer-events-none translate-x-full invisible"
      }`}
    >
      {product && (
        <>
          <div className="flex items-center justify-between border-b border-line px-6 py-4">
            <h3 className="font-serif text-xl">{product.name}</h3>
            <Button
              variant="ghost"
              onClick={closeDrawer}
              aria-label="Close quick view"
              className="text-ink-soft transition-colors hover:text-ink"
            >
              ✕
            </Button>
          </div>
          <div className="grid flex-1 overflow-y-auto md:grid-cols-2">
            <div className="relative min-h-[320px] bg-sand-warm">
              <GarmentArt
                className="absolute inset-0"
                options={{
                  uid: `qv-${product.id}`,
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
            <div className="flex flex-col gap-4 px-6 py-6">
              <div className="eyebrow">{product.cat}</div>
              <h2 className="font-serif text-[26px] leading-tight">{product.name}</h2>
              <div className="font-serif text-lg">{priceFull(product)}</div>
              <p className="text-[13px] leading-relaxed text-ink-soft">{product.desc}</p>
              <div className="border-l-2 border-terracotta bg-sand-warm/60 px-4 py-3 text-[12px] leading-relaxed text-ink-soft">
                <b className="font-semibold text-ink">Fit note:</b> {product.fit}
              </div>
              <div>
                <span className="eyebrow mb-2 block">Colour — {colour}</span>
                <ColourSwatches product={product} colour={colour} onPick={setColour} />
              </div>
              <div>
                <span className="eyebrow mb-2 block">Size</span>
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
                className="h-auto whitespace-normal rounded-none mt-1 bg-ink px-8 py-4 text-[11px] font-medium tracking-[0.2em] text-bone uppercase transition-colors duration-300 hover:bg-terracotta"
              >
                Add to bag
              </Button>
              <Link
                to="/products/$slug"
                params={{ slug: product.id }}
                className="text-center text-[11px] tracking-[0.14em] text-ink-soft uppercase underline-offset-4 hover:text-ink hover:underline"
              >
                View full details
              </Link>
              <p className="text-[10.5px] leading-relaxed text-muted-warm">
                Your bag is saved on this device. Checkout is not connected.
              </p>
            </div>
          </div>
        </>
      )}
    </aside>
  );
}

/** Bag drawer: lines with size selector, fit guidance, order summary. */
export function BagDrawer() {
  const { drawer, bag, bagCount, closeDrawer, setLineSize, setLineQty, removeLine, openSizeGuide } =
    useShop();
  const on = drawer === "bag";
  const modalRef = useModal(on, closeDrawer);
  const label = "Shopping bag";

  const currencyTotals = new Map<string, number>();
  for (const line of bag) {
    const p = productById(line.productId);
    if (!p) continue;
    currencyTotals.set(p.cur, (currencyTotals.get(p.cur) ?? 0) + p.min * line.qty);
  }

  return (
    <aside
      ref={modalRef}
      role="dialog"
      aria-label={label}
      aria-modal={on || undefined}
      inert={!on}
      tabIndex={-1}
      aria-hidden={!on}
      className={`fixed top-0 right-0 z-90 flex h-full w-full max-w-[460px] flex-col bg-paper shadow-2xl transition-[transform,visibility] duration-450 ease-luxe ${
        on ? "translate-x-0 visible" : "pointer-events-none translate-x-full invisible"
      }`}
    >
      <div className="flex items-center justify-between border-b border-line px-6 py-4">
        <h3 className="font-serif text-xl">
          Your bag
          {bagCount > 0 && <span className="ml-2 text-sm text-muted-warm">({bagCount})</span>}
        </h3>
        <Button
          variant="ghost"
          onClick={closeDrawer}
          aria-label="Close bag"
          className="text-ink-soft transition-colors hover:text-ink"
        >
          ✕
        </Button>
      </div>

      {bag.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
          <div className="font-serif text-[22px]">Nothing here yet</div>
          <p className="text-[13px] text-muted-warm">
            Your bag is empty. Start with the new arrivals.
          </p>
          <Button
            variant="ghost"
            onClick={closeDrawer}
            className="border border-ink px-6 py-3 text-[11px] font-medium tracking-[0.2em] text-ink uppercase transition-colors duration-300 hover:bg-ink hover:text-bone"
          >
            Browse the edit
          </Button>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto px-6">
            {bag.map((line) => {
              const p = productById(line.productId);
              if (!p) return null;
              return (
                <div key={line.key} className="border-b border-line py-5 last:border-b-0">
                  <div className="flex gap-4">
                    <div className="relative h-[104px] w-[60px] sm:w-[78px] shrink-0 overflow-hidden bg-sand-warm">
                      <GarmentArt
                        className="absolute inset-0"
                        options={{
                          uid: `bag-${line.key}`,
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
                    <div className="min-w-0 flex-1">
                      <div className="grid min-w-0 gap-1 sm:grid-cols-[minmax(0,1fr)_auto]">
                        <div>
                          <div className="font-serif text-[17px] leading-tight">{p.name}</div>
                          <div className="mt-0.5 text-[11px] text-muted-warm">{line.colour}</div>
                        </div>
                        <div className="font-serif text-[15px] whitespace-nowrap">
                          {CURRENCIES[p.cur].symbol}
                          {(p.min * line.qty).toLocaleString("en-GB", {
                            minimumFractionDigits: (p.min * line.qty) % 1 ? 2 : 0,
                            maximumFractionDigits: 2,
                          })}
                        </div>
                      </div>
                      <div className="mt-2.5 flex flex-wrap items-center gap-2">
                        <span className="eyebrow">Size</span>
                        <div className="flex gap-1">
                          {SIZES.map((s) => (
                            <Button
                              variant="ghost"
                              key={s.id}
                              onClick={() => setLineSize(line.key, s.id)}
                              className={`min-h-11 min-w-[30px] border px-1.5 py-1 text-[10.5px] transition-colors duration-200 ${
                                line.size === s.id
                                  ? "border-ink bg-ink text-bone"
                                  : "border-line text-ink-soft hover:border-ink"
                              }`}
                            >
                              {s.id}
                            </Button>
                          ))}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Button
                            variant="ghost"
                            onClick={() => setLineQty(line.key, line.qty - 1)}
                            aria-label="Decrease quantity"
                            className="h-11 w-11 border border-line text-[12px] text-ink-soft transition-colors hover:border-ink"
                          >
                            −
                          </Button>
                          <span className="w-4 text-center text-[12px]">{line.qty}</span>
                          <Button
                            variant="ghost"
                            onClick={() => setLineQty(line.key, line.qty + 1)}
                            aria-label="Increase quantity"
                            className="h-11 w-11 border border-line text-[12px] text-ink-soft transition-colors hover:border-ink"
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <div className="mt-2.5 flex items-start justify-between gap-3">
                        <p className="text-[10.5px] leading-relaxed text-muted-warm">
                          <b className="font-medium text-ink-soft">Fit:</b> {p.fit}
                        </p>
                        <Button
                          variant="ghost"
                          onClick={() => removeLine(line.key)}
                          className="shrink-0 text-[10px] tracking-[0.1em] text-muted-warm uppercase underline-offset-2 hover:text-terracotta hover:underline"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-line px-6 py-5">
            <div className="space-y-1.5">
              {Array.from(currencyTotals.entries()).map(([cur, total]) => (
                <div key={cur} className="flex items-baseline justify-between">
                  <span className="text-[11px] tracking-[0.14em] text-ink-soft uppercase">
                    Subtotal · NGN
                  </span>
                  <span className="font-serif text-[22px] font-medium">
                    {CURRENCIES[cur as keyof typeof CURRENCIES].symbol}
                    {total.toLocaleString("en-GB", {
                      minimumFractionDigits: total % 1 ? 2 : 0,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[10.5px] leading-relaxed text-muted-warm">
              This bag is saved on this device only. Checkout and payments are not connected; no
              order has been placed.
            </p>
            <Button
              variant="ghost"
              disabled
              className="h-auto whitespace-normal rounded-none mt-4 w-full bg-ink py-4 text-[11px] font-medium tracking-[0.2em] text-bone uppercase transition-colors duration-300 hover:bg-terracotta"
            >
              Checkout unavailable
            </Button>
            <Button
              variant="ghost"
              onClick={openSizeGuide}
              className="mt-3 w-full text-center text-[10.5px] tracking-[0.12em] text-ink-soft uppercase underline-offset-4 hover:text-ink hover:underline"
            >
              Unsure of the size? Open the fit guide
            </Button>
          </div>
        </>
      )}
    </aside>
  );
}

/** Size & fit guide drawer. */
export function SizeGuideDrawer() {
  const { drawer, closeDrawer } = useShop();
  const on = drawer === "size";
  const modalRef = useModal(on, closeDrawer);
  const label = "Size and fit guide";

  return (
    <aside
      ref={modalRef}
      role="dialog"
      aria-label={label}
      aria-modal={on || undefined}
      inert={!on}
      tabIndex={-1}
      aria-hidden={!on}
      className={`fixed top-0 right-0 z-90 flex h-full w-full max-w-[460px] flex-col overflow-y-auto bg-paper shadow-2xl transition-[transform,visibility] duration-450 ease-luxe ${
        on ? "translate-x-0 visible" : "pointer-events-none translate-x-full invisible"
      }`}
    >
      <div className="flex items-center justify-between border-b border-line px-6 py-4">
        <h3 className="font-serif text-xl">Size &amp; fit</h3>
        <Button
          variant="ghost"
          onClick={closeDrawer}
          aria-label="Close size guide"
          className="text-ink-soft transition-colors hover:text-ink"
        >
          ✕
        </Button>
      </div>
      <div className="px-6 py-6">
        <p className="border-l-2 border-terracotta bg-sand-warm/60 px-4 py-3 text-[12.5px] leading-relaxed text-ink-soft">
          This is ready-to-wear sizing, not a custom fitting service. Confirm the available sizes
          and garment measurements with Donna Maison before ordering.
        </p>
        <h4 className="mt-6 font-serif text-lg">Size options in this storefront</h4>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {SIZES.map((s) => (
            <span key={s.id} className="border border-line py-3 text-center text-[12px]">
              {s.id}
            </span>
          ))}
        </div>
        <p className="mt-4 text-[12px] leading-relaxed text-muted-warm">
          A verified measurement chart and style-specific size availability have not been supplied.
          These labels are not a guarantee of stock or equivalent UK, US or EU sizes. Consult the
          brand’s available size information before choosing.
        </p>
      </div>
    </aside>
  );
}
