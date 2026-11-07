import { createFileRoute } from "@tanstack/react-router";

import { CATEGORIES, type OccasionId } from "@/data/products";
import { Hero, TrustBar } from "@/components/Hero";
import { Occasions } from "@/components/Occasions";
import { ProductGrid } from "@/components/ProductGrid";
import { Story, FitSection, Journal } from "@/components/Story";
import { AtelierLedger } from "@/components/AtelierLedger";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  validateSearch: (
    search: Record<string, unknown>,
  ): {
    page: number;
    category: "all" | (typeof CATEGORIES)[number];
    occasion: OccasionId | undefined;
  } => ({
    page: Math.min(6, Math.max(1, Math.floor(Number(search.page) || 1))),
    category: CATEGORIES.find((c) => c === search.category) ?? "all",
    occasion:
      search.occasion === "room" || search.occasion === "photograph" || search.occasion === "armour"
        ? search.occasion
        : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Donna Maison — Quietly powerful. Undeniably her." },
      {
        name: "description",
        content:
          "Donna Maison ready-to-wear: dresses, trouser sets and skirt sets for every version of her.",
      },
      { property: "og:title", content: "Donna Maison — Quietly powerful. Undeniably her." },
      {
        property: "og:description",
        content: "Versatile ready-to-wear for the modern, cosmopolitan woman.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const cat = search.category;
  const occasion = search.occasion ?? null;
  const setCat = (category: typeof cat) => {
    void navigate({
      search: (previous) => ({ ...previous, category, page: 1 }),
      resetScroll: false,
    });
  };
  const setOccasion = (value: OccasionId | null) => {
    void navigate({
      search: (previous) => ({ ...previous, occasion: value ?? undefined, page: 1 }),
      resetScroll: false,
    });
  };

  return (
    <main>
      <Hero />
      <TrustBar />
      <Occasions onSelect={setOccasion} active={occasion} />
      <ProductGrid
        cat={cat}
        setCat={setCat}
        page={search.page}
        occasion={occasion}
        clearOccasion={() => setOccasion(null)}
      />
      <Story />
      <FitSection />
      <Journal />
      <div id="ledger" />
      <AtelierLedger />
      <Footer />
    </main>
  );
}
