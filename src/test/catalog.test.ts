import { describe, expect, it } from "vitest";
import { PRODUCTS } from "@/data/products";
import { resolveGarmentPhoto } from "@/components/GarmentArt";

describe("catalogue", () => {
  it("files trouser sets and skirt sets as separate categories", () => {
    expect(PRODUCTS.find((p) => p.name === "Raquel Skirt Set")?.cat).toBe("Skirt Sets");
    expect(PRODUCTS.find((p) => p.name === "Zendaya Trouser Set")?.cat).toBe("Trouser Sets");
    expect(PRODUCTS.some((p) => (p.cat as string) === "Sets")).toBe(false);
  });

  it("uses the published naira price", () => {
    const seona = PRODUCTS.find((p) => p.name === "Seona Dress");
    expect([seona?.cur, seona?.min]).toEqual(["NGN", 290000]);
  });

  it("uses supplied category photos when a feature has no matching product name", () => {
    const firstDress = PRODUCTS.find((product) => product.cat === "Dresses" && product.images.length > 0);
    const firstTrouserSet = PRODUCTS.find((product) => product.cat === "Trouser Sets" && product.images.length > 0);

    expect(resolveGarmentPhoto({ name: "Unlisted dress", kind: "midi" })).toBe(firstDress?.images[0]);
    expect(resolveGarmentPhoto({ name: "Unlisted set", kind: "trouser", trousers: true })).toBe(firstTrouserSet?.images[0]);
    expect(resolveGarmentPhoto({ name: "Emily Dress", kind: "midi" })).toMatch(/^\/__l5e\/assets-v1\//);
  });
});
