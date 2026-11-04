import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import type { OccasionId } from "@/data/products";
import { Hero, TrustBar } from "@/components/Hero";
import { Occasions } from "@/components/Occasions";
import { ProductGrid } from "@/components/ProductGrid";
import { Story, FitSection, Journal } from "@/components/Story";
import { AtelierLedger } from "@/components/AtelierLedger";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Donna Maison — Quietly powerful. Undeniably her." },
      {
        name: "description",
        content:
          "Step into the Collection. Tailoring that commands the room before you speak — hand-finished in Lagos, cut for real curves from size 6 to 20.",
      },
      { property: "og:title", content: "Donna Maison — Quietly powerful. Undeniably her." },
      {
        property: "og:description",
        content:
          "Tailoring that commands the room before you speak. Hand-finished in Lagos. Cut for real curves from size 6 to 20.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type CatFilter = "all" | "Dresses" | "Sets";
type CurFilter = "all" | "NGN" | "USD" | "EUR";

function Index() {
  const [cat, setCat] = useState<CatFilter>("all");
  const [cur, setCur] = useState<CurFilter>("all");
  const [occasion, setOccasion] = useState<OccasionId | null>(null);

  return (
    <main>
      <Hero />
      <TrustBar />
      <Occasions onSelect={setOccasion} active={occasion} />
      <ProductGrid
        cat={cat}
        setCat={setCat}
        cur={cur}
        setCur={setCur}
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
