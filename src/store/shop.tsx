import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CURRENCIES, priceFull, productById } from "@/data/products";

export type BagLine = {
  key: string;
  productId: string;
  colour: string;
  size: string;
  qty: number;
};

type DrawerKind = "bag" | "quickview" | "size" | null;

interface ShopContextValue {
  bag: BagLine[];
  bagCount: number;
  addToBag: (productId: string, colour: string, size: string) => void;
  setLineSize: (key: string, size: string) => void;
  setLineQty: (key: string, qty: number) => void;
  removeLine: (key: string) => void;
  drawer: DrawerKind;
  quickViewId: string | null;
  openQuickView: (id: string) => void;
  openBag: () => void;
  openSizeGuide: () => void;
  closeDrawer: () => void;
  saved: string[];
  toggleSaved: (id: string) => void;
  toast: string | null;
}

const ShopContext = createContext<ShopContextValue | null>(null);

const BAG_KEY = "donna-maison-bag";
const SAVED_KEY = "donna-maison-saved";

function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [bag, setBag] = useState<BagLine[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [drawer, setDrawer] = useState<DrawerKind>(null);
  const [quickViewId, setQuickViewId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setBag(loadJson<BagLine[]>(BAG_KEY, []));
    setSaved(loadJson<string[]>(SAVED_KEY, []));
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(BAG_KEY, JSON.stringify(bag));
    } catch {
      /* storage unavailable — bag stays in memory */
    }
  }, [bag]);

  useEffect(() => {
    try {
      window.localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
    } catch {
      /* storage unavailable — saved list stays in memory */
    }
  }, [saved]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(t);
  }, [toast]);

  const closeDrawer = useCallback(() => {
    setDrawer(null);
    setQuickViewId(null);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeDrawer]);

  const addToBag = useCallback((productId: string, colour: string, size: string) => {
    const p = productById(productId);
    if (!p) return;
    const key = `${productId}|${colour}|${size}`;
    setBag((prev) => {
      const existing = prev.find((l) => l.key === key);
      if (existing) {
        return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l));
      }
      return [...prev, { key, productId, colour, size, qty: 1 }];
    });
    setToast(`${p.name} — ${colour}, size ${size} added to your bag`);
    setDrawer("bag");
  }, []);

  const setLineSize = useCallback((key: string, size: string) => {
    setBag((prev) =>
      prev.map((l) =>
        l.key === key ? { ...l, size, key: `${l.productId}|${l.colour}|${size}` } : l,
      ),
    );
  }, []);

  const setLineQty = useCallback((key: string, qty: number) => {
    setBag((prev) =>
      qty <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, qty } : l)),
    );
  }, []);

  const removeLine = useCallback((key: string) => {
    setBag((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const toggleSaved = useCallback((id: string) => {
    setSaved((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const openQuickView = useCallback((id: string) => {
    setQuickViewId(id);
    setDrawer("quickview");
  }, []);

  const openBag = useCallback(() => setDrawer("bag"), []);
  const openSizeGuide = useCallback(() => setDrawer("size"), []);

  const bagCount = useMemo(() => bag.reduce((n, l) => n + l.qty, 0), [bag]);

  const value = useMemo<ShopContextValue>(
    () => ({
      bag,
      bagCount,
      addToBag,
      setLineSize,
      setLineQty,
      removeLine,
      drawer,
      quickViewId,
      openQuickView,
      openBag,
      openSizeGuide,
      closeDrawer,
      saved,
      toggleSaved,
      toast,
    }),
    [
      bag,
      bagCount,
      addToBag,
      setLineSize,
      setLineQty,
      removeLine,
      drawer,
      quickViewId,
      openQuickView,
      openBag,
      openSizeGuide,
      closeDrawer,
      saved,
      toggleSaved,
      toast,
    ],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}

/** Order summary lines grouped by currency, so totals are never mixed. */
export function bagSummary(bag: BagLine[]) {
  const groups = new Map<keyof typeof CURRENCIES, { total: number; qty: number }>();
  for (const line of bag) {
    const p = productById(line.productId);
    if (!p) continue;
    const g = groups.get(p.cur) ?? { total: 0, qty: 0 };
    const unit = p.min;
    g.total += unit * line.qty;
    g.qty += line.qty;
    groups.set(p.cur, g);
  }
  return Array.from(groups.entries()).map(([cur, g]) => ({
    cur,
    symbol: CURRENCIES[cur].symbol,

    totalLabel: `${CURRENCIES[cur].symbol}${g.total.toLocaleString("en-GB", { minimumFractionDigits: g.total % 1 ? 2 : 0, maximumFractionDigits: 2 })}`,
    qty: g.qty,
  }));
}

export { priceFull };
