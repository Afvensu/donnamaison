import { CATALOG } from "./catalog";
// Supplied catalogue verifies identifiers, names, categories, NGN prices and images.
// No verified composition, measurements, colour variants or production claims are supplied.
export type StudioKind = "dark" | "warm" | "bone";
export type OccasionId = "room" | "photograph" | "armour";

export interface Product {
  id: string;
  name: string;
  cat: "Dresses" | "Trouser Sets" | "Skirt Sets";
  images: string[];
  cur: "NGN";
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

export const CURRENCIES = { NGN: { symbol: "₦", label: "NGN" } } as const;
export const fmtN = (n: number) =>
  n.toLocaleString("en-GB", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
export const priceFull = (p: Product) =>
  p.min !== p.max ? `₦${fmtN(p.min)} – ₦${fmtN(p.max)}` : `₦${fmtN(p.min)}`;
export const priceShort = (p: Product) =>
  p.min !== p.max ? `From ₦${fmtN(p.min)}` : `₦${fmtN(p.min)}`;

export const OCCASIONS = [
  {
    id: "room",
    k: "01 — Work",
    title: "Hold the room",
    d: "Ready-to-wear for work and professional occasions.",
    kind: "trouser",
    trousers: true,
    sleeves: "long",
    studio: "dark",
    palette: ["", "", ""],
  },
  {
    id: "photograph",
    k: "02 — Celebrations",
    title: "Be the photograph",
    d: "Pieces for celebrations and special occasions.",
    kind: "gown",
    sleeves: "none",
    studio: "dark",
    palette: ["", "", ""],
  },
  {
    id: "armour",
    k: "03 — Everyday",
    title: "Softest kind of armour",
    d: "Ready-to-wear for everyday plans and casual outings.",
    kind: "midi",
    sleeves: "short",
    studio: "bone",
    palette: ["", "", ""],
  },
] satisfies {
  id: OccasionId;
  k: string;
  title: string;
  d: string;
  kind: Product["kind"];
  trousers?: boolean;
  hem?: number;
  sleeves: Product["sleeves"];
  studio: StudioKind;
  palette: [string, string, string];
}[];

// Retain existing bag option identifiers, not unverified UK/US/EU conversions.
export const SIZES = [{ id: "S" }, { id: "M" }, { id: "L" }, { id: "XL" }] as const;
export const ANNOUNCEMENTS = [
  "For every version of her.",
  "Dresses · Trouser Sets · Skirt Sets",
  "Discover Donna Maison ready-to-wear",
];
export const CATEGORIES = ["Dresses", "Trouser Sets", "Skirt Sets"] as const;
export const PRODUCTS: Product[] = CATALOG.map((c) => ({
  ...c,
  cur: "NGN",
  colours: ["As pictured"],
  note: c.cat,
  fit: "Consult the available size information and contact Donna Maison to confirm sizing before ordering. Measurements for this style are not provided here.",
  desc: `${c.name} from the Donna Maison ready-to-wear collection.`,
  fabric: "",
  craft: [],
  // Editorial discovery suggestions, not exclusive garment attributes.
  occasions:
    c.cat === "Trouser Sets"
      ? ["room", "armour"]
      : c.cat === "Skirt Sets"
        ? ["photograph", "room", "armour"]
        : ["photograph", "armour", "room"],
  kind: c.cat === "Trouser Sets" ? "trouser" : "midi",
  sleeves: "none",
  palette: ["", "", ""],
  studio: "bone",
}));
export const productById = (id: string) => PRODUCTS.find((p) => p.id === id);
export const CRAFT_HIGHLIGHTS = [
  {
    n: "01",
    title: "Dresses",
    d: "Ready-to-wear dresses for different occasions and expressions of personal style.",
  },
  {
    n: "02",
    title: "Trouser Sets",
    d: "Coordinated trouser sets for your working wardrobe and everyday plans.",
  },
  {
    n: "03",
    title: "Skirt Sets",
    d: "Skirt sets for celebrations, everyday dressing and everything in between.",
  },
];
