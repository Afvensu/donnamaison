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

export function resolveGarmentPhoto(options: Pick<ArtOptions, "name" | "kind" | "trousers" | "uid">) {
  const uid = options.uid ?? options.name ?? "garment";
  const requestedProduct = PRODUCTS.find((product) => product.name === options.name);
  const fallbackCategory = options.trousers || options.kind === "trouser" ? "Trouser Sets" : "Dresses";
  const photoProduct =
    (requestedProduct?.images.length ? requestedProduct : undefined) ??
    PRODUCTS.find((product) => product.cat === fallbackCategory && product.images.length > 0) ??
    PRODUCTS.find((product) => product.images.length > 0);

  return photoProduct?.images[/\-alt$/.test(uid) && photoProduct.images[1] ? 1 : 0];
}

/** Renders supplied catalog photography, using a category-matched photo when needed. */
export function GarmentArt({
  options,
  className,
}: {
  options: Omit<ArtOptions, "uid"> & { uid?: string };
  className?: string;
}) {
  const src = resolveGarmentPhoto(options);
  if (!src) return null;

  return (
    <img
      src={src}
      alt={options.name ? `${options.name} by Donna Maison` : "Donna Maison design"}
      loading={uid === "hero" ? "eager" : "lazy"}
      decoding="async"
      className={`${className ?? ""} h-full w-full object-cover object-top`}
    />
  );
}

/** Kept for callers that describe an alternate colourway; photography remains unchanged. */
export function altPalette(p: [string, string, string]): [string, string, string] {
  return [p[1], p[0], p[2]];
}