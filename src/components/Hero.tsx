import { GarmentArt } from "@/components/GarmentArt";
import { Button } from "@/components/ui/button";
import { productById, priceShort } from "@/data/products";
import { useShop } from "@/store/shop";

export function Hero() {
  const { openSizeGuide } = useShop();
  const featured = productById("saphira-dress");

  return (
    <section className="relative grid min-h-[min(88vh,780px)] md:grid-cols-[1.02fr_1fr]">
      <div className="relative z-2 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-22 lg:py-0">
        <div className="eyebrow mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-line" />
          The Season Edit
        </div>
        <h1 className="mb-6 font-serif text-[clamp(42px,5.6vw,84px)] leading-[0.96] font-light tracking-[-0.025em]">
          Quietly powerful.
          <br />
          <em className="italic">Undeniably her.</em>
        </h1>
        <p className="mb-8 max-w-[46ch] text-[14.5px] leading-relaxed text-ink-soft">
          Versatile ready-to-wear for the many sides of the modern woman. Refined silhouettes, effortless elegance and pieces that move with every occasion.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="/#collection"
            className="inline-flex items-center gap-3 bg-ink px-8 py-4 text-[11px] font-medium tracking-[0.2em] text-bone uppercase transition-all duration-300 hover:bg-terracotta hover:shadow-[0_10px_30px_-10px_rgba(140,63,43,0.5)]"
          >
            Explore the Collection <span aria-hidden>→</span>
          </a>
          <Button variant="ghost"
            onClick={openSizeGuide}
            className="h-auto whitespace-normal rounded-none inline-flex items-center gap-3 border border-ink px-8 py-4 text-[11px] font-medium tracking-[0.2em] text-ink uppercase transition-all duration-300 hover:bg-ink hover:text-bone"
          >
            Size &amp; Fit Guide
          </Button>
        </div>
        <div className="mt-9 flex items-center gap-3.5">
          <div className="flex gap-1">
            <span className="h-[7px] w-[7px] rounded-full bg-terracotta" />
            <span className="h-[7px] w-[7px] rounded-full bg-gold" />
            <span className="h-[7px] w-[7px] rounded-full bg-ink" />
          </div>
          <span className="text-[10px] tracking-[0.16em] text-muted-warm uppercase">
            For every version of her.
          </span>
        </div>
      </div>

      <div className="relative min-h-[420px] overflow-hidden bg-sand-warm md:min-h-0">
        <GarmentArt
          className="absolute inset-0"
          options={{
            uid: "hero",
            name: "Saphira Dress",
            kind: "midi",
            hem: 80,
            sleeves: "long",
            ruched: true,
            palette: ["#2c4570", "#101c33", "#5c7ba6"],
            studio: "warm",
          }}
        />
        <div className="absolute right-6 bottom-6 max-w-[220px] bg-paper/95 p-4 shadow-[0_10px_40px_rgba(28,25,23,0.12)] backdrop-blur">
          <div className="font-serif text-[17px]">{featured?.name}</div>
          <div className="text-[11px] text-muted-warm">{featured ? priceShort(featured) : ""}</div>
          <a
            href="/products/saphira-dress"
            className="mt-2 inline-block text-[10px] tracking-[0.14em] text-terracotta uppercase hover:underline"
          >
            View the piece →
          </a>
        </div>
      </div>
    </section>
  );
}

export function TrustBar() {
  const items: Array<[string, string]> = [
    ["Dresses", "Ready-to-wear"],
    ["Trouser Sets", "Ready-to-wear"],
    ["Skirt Sets", "Ready-to-wear"],
    ["For every version of her", "Donna Maison"],
  ];
  return (
    <div className="border-y border-line bg-paper">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-x-6 gap-y-4 px-5 py-6 sm:px-8 md:grid-cols-4 lg:px-16">
        {items.map(([b, d]) => (
          <div key={b} className="text-[11.5px] text-muted-warm">
            <b className="mb-0.5 block font-serif text-[14px] font-medium text-ink">{b}</b>
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}
