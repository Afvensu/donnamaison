import { describe, expect, it } from "vitest";
import { PRODUCTS } from "@/data/products";

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
});
