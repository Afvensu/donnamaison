import { useState } from "react";
import { PRODUCTS } from "@/data/products";

export interface ArtOptions {
  uid: string;
  name?: string | undefined;
  kind: "gown" | "midi" | "trouser";
  hem?: number | undefined;
  sleeves?: "none" | "short" | "long" | undefined;
  trousers?: boolean | undefined;
  twotone?: boolean | undefined;
  akwette?: boolean | undefined;
  ruched?: boolean | undefined;
  palette: [string, string, string];
  studio: "dark" | "warm" | "bone";
}

export function resolveGarmentPhoto(
  options: Pick<ArtOptions, "name" | "kind" | "trousers"> & { uid?: string },
) {
  const product = PRODUCTS.find((product) => product.name === options.name);
  if (!product) return undefined;
  const index = /-alt$/.test(options.uid ?? "") && product.images[1] ? 1 : 0;
  return product.images[index];
}

/** Exact supplied product photography only; never borrow another garment image. */
export function GarmentArt({
  options,
  className,
}: {
  options: Omit<ArtOptions, "uid"> & { uid?: string };
  className?: string;
}) {
  const src = resolveGarmentPhoto(options);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  if (!src || failedSrc === src)
    return (
      <div
        role="img"
        aria-label={`${options.name ?? "Donna Maison"} — photograph unavailable`}
        className={`${className ?? ""} flex h-full w-full flex-col items-center justify-center gap-3 bg-sand-warm p-3 text-center text-muted-warm`}
      >
        <span aria-hidden="true" className="font-serif text-3xl">
          DM
        </span>
        <span className="text-[11px] leading-relaxed">Photograph unavailable</span>
      </div>
    );

  return (
    <img
      src={src}
      alt={options.name ? `${options.name} by Donna Maison` : "Donna Maison design"}
      loading={options.uid === "hero" ? "eager" : "lazy"}
      decoding="async"
      width={1000}
      height={1400}
      sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
      fetchPriority={options.uid === "hero" ? "high" : "auto"}
      onError={() => setFailedSrc(src)}
      className={`${className ?? ""} h-full w-full object-cover object-top`}
    />
  );
}

/** Kept for callers that describe an alternate colourway; photography remains unchanged. */
export function altPalette(p: [string, string, string]): [string, string, string] {
  return [p[1], p[0], p[2]];
}
