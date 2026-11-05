import { CATALOG } from "./catalog";
/* =========================================================
   DONNA MAISON — CATALOGUE DATA
   Product names, prices, colourways and size brackets are the
   real figures published on donnamaison.com at time of audit.
   Fit notes, fabric composition and craft points carry the
   Brain Glue persuasion copy.
   ========================================================= */

export type StudioKind = "dark" | "warm" | "bone";
export type OccasionId = "room" | "photograph" | "armour";

export interface Product {
  id: string;
  name: string;
  cat: "Dresses" | "Trouser Sets" | "Skirt Sets";
  images: string[];
  cur: "NGN" | "USD" | "EUR";
  min: number;
  max: number;
  colours: string[];
  note: string;
  fit: string;
  desc: string;
  fabric: string;
  craft: string[];
  occasions: OccasionId[];
  kind: "gown" | "midi" | "trouser";
  hem?: number;
  sleeves: "none" | "short" | "long";
  trousers?: boolean;
  twotone?: boolean;
  akwette?: boolean;
  ruched?: boolean;
  palette: [string, string, string];
  studio: StudioKind;
}

export const CURRENCIES = {
  NGN: { symbol: "₦", region: "Nigeria", label: "Nigeria — ₦" },
  USD: { symbol: "$", region: "Intl.", label: "International — $" },
  EUR: { symbol: "€", region: "Europe", label: "Europe — €" },
} as const;

export const fmtN = (n: number) =>
  n.toLocaleString("en-GB", {
    minimumFractionDigits: n % 1 ? 2 : 0,
    maximumFractionDigits: 2,
  });

export const priceFull = (p: Product) => {
  const s = CURRENCIES[p.cur].symbol + fmtN(p.min);
  return p.min !== p.max ? `${s} – ${CURRENCIES[p.cur].symbol + fmtN(p.max)}` : s;
};

export const priceShort = (p: Product) =>
  p.min !== p.max
    ? `From ${CURRENCIES[p.cur].symbol + fmtN(p.min)}`
    : CURRENCIES[p.cur].symbol + fmtN(p.min);

export interface Occasion {
  id: OccasionId;
  k: string;
  title: string;
  d: string;
  palette: [string, string, string];
  kind: "gown" | "midi" | "trouser";
  hem?: number;
  sleeves: "none" | "short" | "long";
  trousers?: boolean;
  studio: StudioKind;
}

export const OCCASIONS: Occasion[] = [
  {
    id: "room",
    k: "01 — Work & power",
    title: "Hold the room",
    d: "Tailoring and clean lines for the days you need to be taken seriously.",
    palette: ["#453c34", "#1a1613", "#6b5f52"],
    kind: "trouser",
    trousers: true,
    sleeves: "long",
    studio: "dark",
  },
  {
    id: "photograph",
    k: "02 — Occasion",
    title: "Be the photograph",
    d: "Ruched, appliquéd, hand-finished. For invitations you said yes to.",
    palette: ["#5c2233", "#280e17", "#93506a"],
    kind: "gown",
    hem: 86,
    sleeves: "none",
    studio: "dark",
  },
  {
    id: "armour",
    k: "03 — Everyday",
    title: "Softest kind of armour",
    d: "Easy midis and co-ords that behave from the school run to the last meeting.",
    palette: ["#cfbda2", "#8d7a60", "#ece3d1"],
    kind: "midi",
    hem: 70,
    sleeves: "short",
    studio: "bone",
  },
];

export const SIZES = [
  { id: "S", uk: "6–8", us: "2–4", eu: "34–36" },
  { id: "M", uk: "10–12", us: "6–8", eu: "38–40" },
  { id: "L", uk: "14–16", us: "10–12", eu: "42–44" },
  { id: "XL", uk: "18–20", us: "14–16", eu: "46–48" },
] as const;

export const ANNOUNCEMENTS = [
  "Ships worldwide from Nigeria",
  "Returns within 3–5 days in Nigeria · 7–10 days internationally",
  "Sizes 6–20, cut to fit properly",
];

const RICH: Omit<Product, "images" | "cat">[] = [
  {
    id: "seona",
    name: "Seona",
    cur: "USD",
    min: 290,
    max: 290,
    colours: ["Ivory"],
    note: "Floor-length, softly structured",
    fit: "Runs true to size. Long through the body — petite wearers may need the hem taken up.",
    desc: "A dress that does the work of a whole outfit. Clean through the shoulder, generous through the skirt, with enough weight to hold its line from the car to the last dance.",
    fabric: "Silk crepe over breathable cotton lining, hand-washable",
    craft: [
      "Hand-finished seams — fourteen passes at the atelier",
      "Built to outlast five seasons of fast fashion",
      "Complimentary atelier fitting included",
    ],
    occasions: ["room", "photograph"],
    kind: "gown",
    hem: 88,
    sleeves: "none",
    palette: ["#f3e9d8", "#c9b393", "#fbf5e8"],
    studio: "bone",
  },
  {
    id: "bella",
    name: "Bella",
    cur: "USD",
    min: 80,
    max: 85,
    colours: ["Blush", "Black"],
    note: "Easy midi, everyday polish",
    fit: "Runs slightly generous. Between sizes? Take the smaller.",
    desc: "The one you reach for when you have eight minutes and still need to look considered. Unfussy at the neck, forgiving at the waist, and short enough to wear with a flat.",
    fabric: "Structured crepe, fully lined",
    craft: [
      "Cut and finished by hand in Lagos",
      "Built to outlast five seasons of fast fashion",
      "Complimentary atelier fitting included",
    ],
    occasions: ["armour", "room"],
    kind: "midi",
    hem: 72,
    sleeves: "short",
    palette: ["#f2ddd7", "#c2948b", "#fcf2ee"],
    studio: "bone",
  },
  {
    id: "yrukar",
    name: "Yrukar",
    cur: "USD",
    min: 87.5,
    max: 87.5,
    colours: ["Pink & Black", "Red & Black"],
    note: "Colour-blocked, deliberately bold",
    fit: "True to size. Structured fabric with very little give — check the size chart.",
    desc: "A two-tone argument in the best sense. The contrast sits where it flatters, not where it shouts, so the drama reads as intent rather than noise.",
    fabric: "Duchess satin panels over a crepe base",
    craft: [
      "Duchess panels cut by eye, never by machine",
      "Built to outlast five seasons of fast fashion",
      "Complimentary atelier fitting included",
    ],
    occasions: ["photograph", "room"],
    kind: "midi",
    hem: 70,
    sleeves: "none",
    twotone: true,
    palette: ["#d9a4b4", "#2b2422", "#f2dfe4"],
    studio: "bone",
  },
  {
    id: "antoinette",
    name: "Antoinette",
    cur: "USD",
    min: 130,
    max: 135,
    colours: ["Ink", "Bordeaux"],
    note: "Occasion-ready, softly dramatic",
    fit: "Fitted through the bodice. Take your usual size.",
    desc: "Made for the invitation you said yes to before checking the dress code. Structured enough for a long evening, soft enough to sit through the speeches.",
    fabric: "Duchess satin bodice, weighted crepe skirt",
    craft: [
      "Hand-set bodice boning that holds its line all evening",
      "Built to outlast five seasons of fast fashion",
      "Complimentary atelier fitting included",
    ],
    occasions: ["photograph", "room"],
    kind: "midi",
    hem: 78,
    sleeves: "long",
    palette: ["#6d3b4a", "#2a1d24", "#b98a97"],
    studio: "dark",
  },
  {
    id: "adure",
    name: "Adure",
    cur: "USD",
    min: 112.5,
    max: 117.5,
    colours: ["Black", "Black & Akwete"],
    note: "Black midi, Akwete side panel",
    fit: "True to size. The side panel is placed by hand, so each garment sits a little differently.",
    desc: "A black midi with a long sleeve and an Akwete panel set into the side — which quietly changes the whole silhouette. The panel is placed by hand, so no two sit exactly alike.",
    fabric: "Matte crepe with hand-loomed Akwete silk crepe panel",
    craft: [
      "Hand-placed Akwete silk crepe — no two sit alike",
      "Built to outlast five seasons of fast fashion",
      "Complimentary atelier fitting included",
    ],
    occasions: ["room", "armour"],
    kind: "midi",
    hem: 74,
    sleeves: "long",
    akwette: true,
    palette: ["#262222", "#100e0e", "#4a423c"],
    studio: "dark",
  },
  {
    id: "saphira",
    name: "Saphira",
    cur: "NGN",
    min: 140000,
    max: 150000,
    colours: ["Navy"],
    note: "Ruched, appliqué detail, long sleeve",
    fit: "Ruched through the body, so it works across a size either way.",
    desc: "Navy, ruched through the body with an appliqué detail that catches light as you move. Long sleeves, finished clean. The kind of dress that photographs well and behaves better.",
    fabric: "Ruched stretch crepe over a mesh support layer",
    craft: [
      "Ruching placed by hand — nine yards of stitching per dress",
      "Built to outlast five seasons of fast fashion",
      "Complimentary atelier fitting included",
    ],
    occasions: ["photograph", "room"],
    kind: "midi",
    hem: 76,
    sleeves: "long",
    ruched: true,
    palette: ["#243a5e", "#0f1c33", "#4a6a94"],
    studio: "dark",
  },
  {
    id: "june",
    name: "June",
    cur: "NGN",
    min: 83200,
    max: 83200,
    colours: ["Black", "Burgundy Red"],
    note: "Everyday dress, quietly sharp",
    fit: "Runs true. Crepe has give, so it moves with you.",
    desc: "Named for the month that never quite knows what it is — so the dress does. Sharp enough for a Thursday meeting, warm enough in burgundy for the evening after.",
    fabric: "Everyday crepe with a self-lined bodice",
    craft: [
      "Seams finished by hand, darts pressed the old way",
      "Built to outlast five seasons of fast fashion",
      "Complimentary atelier fitting included",
    ],
    occasions: ["armour", "room"],
    kind: "midi",
    hem: 68,
    sleeves: "short",
    palette: ["#4a1f26", "#220d12", "#7d3844"],
    studio: "warm",
  },
  {
    id: "maya",
    name: "Maya Trouser Set",
    cur: "USD",
    min: 97.8,
    max: 97.8,
    colours: ["Cream & Black", "Navy-Blue & Orange"],
    note: "Two-tone trouser set",
    fit: "Trouser sits at the natural waist. Take your usual size.",
    desc: "A two-piece that lets you wear half of it with something else. Colour-blocked top, straight trouser, cut to fall without clinging. The most useful thing in the wardrobe.",
    fabric: "Two-tone crepe, self-lined top, crease-held trouser",
    craft: [
      "Colour blocks matched by hand so the set reads as one decision",
      "Built to outlast five seasons of fast fashion",
      "Complimentary atelier fitting included",
    ],
    occasions: ["room", "armour"],
    kind: "trouser",
    trousers: true,
    twotone: true,
    sleeves: "long",
    palette: ["#e6dcc8", "#2b2622", "#f6f0e2"],
    studio: "bone",
  },
  {
    id: "arya",
    name: "Arya Trouser Set",
    cur: "EUR",
    min: 110.17,
    max: 114.55,
    colours: ["Sand", "Black"],
    note: "Softly tailored co-ord",
    fit: "Relaxed through the leg. Size down for a closer fit.",
    desc: "Softly tailored, quietly relaxed. The trouser sits at the natural waist and holds a crease; the top is cut to skim rather than grab.",
    fabric: "Soft-tailoring crepe with a wool-touch finish",
    craft: [
      "Waistband cut on the bias so it moves, then holds",
      "Built to outlast five seasons of fast fashion",
      "Complimentary atelier fitting included",
    ],
    occasions: ["armour", "room"],
    kind: "trouser",
    trousers: true,
    sleeves: "long",
    palette: ["#cfc3ad", "#8e7f68", "#e8e0d0"],
    studio: "bone",
  },
  {
    id: "allure",
    name: "Allure Set",
    cur: "USD",
    min: 165,
    max: 170,
    colours: ["Noir", "Bronze"],
    note: "Evening co-ord, statement finish",
    fit: "Fitted. Structured fabric — take your usual size, not up.",
    desc: "For the evenings that ask for more. A co-ord with presence — matched exactly, so the set reads as one considered decision instead of two.",
    fabric: "Structured duchess satin, fully lined",
    craft: [
      "Panels cut in pairs from the same hand — matched exactly",
      "Built to outlast five seasons of fast fashion",
      "Complimentary atelier fitting included",
    ],
    occasions: ["photograph", "room"],
    kind: "trouser",
    trousers: true,
    sleeves: "long",
    palette: ["#2f2a26", "#141110", "#6b5a42"],
    studio: "dark",
  },
];

const DEFAULTS: Record<Product["cat"], Omit<Product, "id" | "name" | "cat" | "cur" | "min" | "max" | "images">> = {
  Dresses: {
    colours: ["As pictured"],
    note: "Hand-finished in Lagos",
    fit: "Runs true to size. Cut for real curves — between sizes, size up for ease through the hip.",
    desc: "A dress that does the work of a whole outfit. Clean through the shoulder, shaped through the waist, finished by hand at the atelier.",
    fabric: "Premium woven fabric with breathable lining",
    craft: ["Hand-finished seams at the Lagos atelier", "Cut in a small run", "Sizes 6–20"],
    occasions: ["photograph", "armour"],
    kind: "midi", hem: 76, sleeves: "short", palette: ["#cfbda2", "#8d7a60", "#ece3d1"], studio: "bone",
  },
  "Trouser Sets": {
    colours: ["As pictured"],
    note: "Two-piece, tailored",
    fit: "Runs true to size. Trousers have a generous inseam — petite wearers may want the hem taken up.",
    desc: "Tailoring that commands the room before you speak. A structured top and a clean-falling trouser, worn together or apart.",
    fabric: "Structured crepe with soft stretch",
    craft: ["Hand-finished seams at the Lagos atelier", "Wear as a set or separately", "Sizes 6–20"],
    occasions: ["room", "armour"],
    kind: "trouser", trousers: true, sleeves: "long", palette: ["#453c34", "#1a1613", "#6b5f52"], studio: "dark",
  },
  "Skirt Sets": {
    colours: ["As pictured"],
    note: "Two-piece, matched",
    fit: "Runs true to size. The skirt sits at the natural waist — size by your waist measurement.",
    desc: "A matched top and skirt, cut to move together. Polished enough for the occasion, easy enough to wear again and again.",
    fabric: "Premium woven fabric with breathable lining",
    craft: ["Hand-finished seams at the Lagos atelier", "Wear as a set or separately", "Sizes 6–20"],
    occasions: ["photograph", "room"],
    kind: "midi", hem: 72, sleeves: "long", palette: ["#5c2233", "#280e17", "#93506a"], studio: "warm",
  },
};

const firstWord = (n: string) => n.toLowerCase().split(/\s+/)[0];

export const PRODUCTS: Product[] = CATALOG.map((c) => {
  const rich = RICH.find((r) => firstWord(r.name) === firstWord(c.name));
  const base = rich && (rich.trousers ? c.cat === "Trouser Sets" : c.cat !== "Trouser Sets") ? rich : DEFAULTS[c.cat];
  return { ...DEFAULTS[c.cat], ...base, id: c.id, name: c.name, cat: c.cat, cur: "NGN", min: c.min, max: c.max, images: c.images };
});

export const CATEGORIES = ["Dresses", "Trouser Sets", "Skirt Sets"] as const;

export const productById = (id: string) => PRODUCTS.find((p) => p.id === id);

export interface JournalEntry {
  k: string;
  title: string;
  art: {
    kind: "gown" | "midi" | "trouser";
    hem?: number;
    sleeves: "none" | "short" | "long";
    trousers?: boolean;
    akwette?: boolean;
    palette: [string, string, string];
    studio: StudioKind;
  };
}

export const JOURNAL: JournalEntry[] = [
  {
    k: "Campaign",
    title: "The women who wear it before we photograph it",
    art: {
      kind: "midi",
      hem: 74,
      sleeves: "short",
      palette: ["#6b4a2e", "#1f1710", "#a3794d"],
      studio: "warm",
    },
  },
  {
    k: "Craft",
    title: "Why Akwete is placed by hand",
    art: {
      kind: "midi",
      hem: 72,
      sleeves: "long",
      akwette: true,
      palette: ["#33333c", "#14141a", "#71717f"],
      studio: "dark",
    },
  },
  {
    k: "Fit",
    title: "The four bodies we draft on",
    art: {
      kind: "trouser",
      trousers: true,
      sleeves: "long",
      palette: ["#c9b89e", "#8a7862", "#ece2d0"],
      studio: "bone",
    },
  },
];

export const CRAFT_HIGHLIGHTS = [
  {
    n: "01",
    title: "Cut in runs of twenty",
    d: "We cut in runs of twenty, not twenty thousand. Small runs mean every pattern gets the cutter's full attention — and nothing is made just to fill a shelf.",
  },
  {
    n: "02",
    title: "Akwete, placed by hand",
    d: "Hand-loomed Akwete silk crepe is set into the garment by eye, not by machine. It is slower, and it is the point: no two panels sit exactly alike.",
  },
  {
    n: "03",
    title: "Finished in Lagos",
    d: "Every hem, every dart, every button is finished by hand at the atelier. Nothing leaves until it hangs the way it was drawn.",
  },
];
