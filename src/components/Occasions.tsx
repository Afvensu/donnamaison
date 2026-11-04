import { GarmentArt } from "@/components/GarmentArt";
import { OCCASIONS, type OccasionId } from "@/data/products";
import { Reveal } from "@/components/Reveal";

export function Occasions({
  onSelect,
  active,
}: {
  onSelect: (o: OccasionId | null) => void;
  active: OccasionId | null;
}) {
  return (
    <section id="occasions" className="scroll-mt-24 px-5 py-16 sm:px-8 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow">Start here</span>
            <h2 className="mt-3 font-serif text-[clamp(30px,3.8vw,50px)] leading-[1.02] font-light tracking-[-0.02em]">
              Dress for the room
              <br />
              you're walking into.
            </h2>
          </div>
          <p className="max-w-[38ch] text-[13.5px] leading-relaxed text-ink-soft">
            Three ways in. Choose the room, and we'll show you the pieces cut for it — not a
            category, a purpose.
          </p>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          {OCCASIONS.map((o, i) => (
            <Reveal key={o.id} delay={i * 90}>
              <button
                onClick={() => {
                  onSelect(active === o.id ? null : o.id);
                  document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`group relative block h-[400px] w-full overflow-hidden text-left transition-shadow duration-300 ${
                  active === o.id ? "ring-2 ring-terracotta" : ""
                }`}
              >
                <GarmentArt
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]"
                  options={{
                    uid: `occ-${o.id}`,
                    name: o.title,
                    kind: o.kind,
                    hem: o.hem,
                    sleeves: o.sleeves,
                    trousers: o.trousers,
                    palette: o.palette,
                    studio: o.studio,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="relative z-2 flex h-full flex-col justify-end p-6 text-white">
                  <div className="text-[9.5px] tracking-[0.22em] uppercase opacity-80">{o.k}</div>
                  <h3 className="mt-2 font-serif text-[clamp(22px,2.4vw,30px)] leading-tight font-normal">
                    {o.title}
                  </h3>
                  <p className="mt-2 max-w-[30ch] text-[12.5px] leading-relaxed text-white/85">
                    {o.d}
                  </p>
                  <span className="mt-4 text-[10.5px] tracking-[0.16em] uppercase">
                    Shop the edit <i className="ml-1 inline transition-transform duration-300 group-hover:translate-x-1">→</i>
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
