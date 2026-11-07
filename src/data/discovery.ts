import { PRODUCTS, type OccasionId, type Product } from "./products";
export const BATCH_SIZE = 12;
export type CategoryFilter = "all" | Product["cat"];
export function filterProducts(category: CategoryFilter, occasion: OccasionId | null) {
  return PRODUCTS.filter(
    (p) =>
      (category === "all" || p.cat === category) && (!occasion || p.occasions.includes(occasion)),
  );
}
export function nextVisibleCount(current: number, total: number) {
  return Math.min(current + BATCH_SIZE, total);
}
