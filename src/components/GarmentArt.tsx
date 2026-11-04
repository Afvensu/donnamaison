import { useMemo } from "react";

/* =========================================================
   PARAMETRIC GARMENT ART ENGINE
   Ported from the Donna Maison prototype: silhouettes drawn
   from each product's real colourway and cut. Not photography.
   ========================================================= */

export interface ArtOptions {
  uid: string;
  name?: string;
  kind: "gown" | "midi" | "trouser";
  hem?: number;
  sleeves?: "none" | "short" | "long";
  trousers?: boolean;
  twotone?: boolean;
  akwette?: boolean;
  ruched?: boolean;
  palette: [string, string, string];
  studio: "dark" | "warm" | "bone";
}

function seedFrom(uid: string) {
  let h = 0;
  for (let i = 0; i < uid.length; i++) h = (h * 31 + uid.charCodeAt(i)) % 1000;
  return h;
}

function buildGarmentSvg(o: ArtOptions): string {
  const u = o.uid.replace(/[^a-zA-Z0-9_-]/g, "");
  const p = o.palette;
  const studio =
    o.studio === "dark"
      ? ["#1b1916", "#0d0c0b", "#302b25"]
      : o.studio === "warm"
        ? ["#f0e2d4", "#d8c2ad", "#fbf1e6"]
        : ["#f7f2e9", "#e2d7c6", "#fdfaf4"];

  const sleeveL =
    o.sleeves === "long"
      ? `M104,70 C95,75 90,92 88,124 C86,156 87,186 90,212 L114,208 C111,180 111,148 116,110 Z`
      : o.sleeves === "short"
        ? `M104,70 C97,74 93,88 92,104 L116,110 C117,96 117,84 116,78 Z`
        : "";

  const sleeveR =
    o.sleeves === "long"
      ? `M196,70 C205,75 210,92 212,124 C214,156 213,186 210,212 L186,208 C189,180 189,148 184,110 Z`
      : o.sleeves === "short"
        ? `M196,70 C203,74 207,88 208,104 L184,110 C183,96 183,84 184,78 Z`
        : "";

  const hem = o.hem || 72;
  const dressPath = `M104,70 L196,70 C201,110 188,154 183,196 C189,252 ${150 + hem - 6},322 ${150 + hem},370 Q150,382 ${150 - hem},370 C${150 - hem + 6},322 111,252 117,196 C112,154 99,110 104,70 Z`;

  const topPath = `M104,70 L196,70 C201,110 188,152 183,192 L117,192 C112,152 99,110 104,70 Z`;
  const legLPath = `M117,190 L150,190 L147,372 Q130,378 112,370 Z`;
  const legRPath = `M150,190 L183,190 L188,370 Q170,378 153,372 Z`;

  /* fold highlights */
  const folds =
    o.kind === "trouser"
      ? `<path d="M132,196 C128,250 124,310 124,368" stroke="#fff" stroke-width="1.4" fill="none" opacity=".16"/>
       <path d="M168,196 C172,250 176,310 176,368" stroke="#fff" stroke-width="1.4" fill="none" opacity=".16"/>
       <path d="M118,196 C122,250 120,310 118,366" stroke="#000" stroke-width="1.2" fill="none" opacity=".12"/>
       <path d="M182,196 C178,250 180,310 182,366" stroke="#000" stroke-width="1.2" fill="none" opacity=".12"/>`
      : `<path d="M126,206 C122,262 ${150 - hem + 18},318 ${150 - hem + 10},366" stroke="#fff" stroke-width="1.5" fill="none" opacity=".17"/>
       <path d="M174,206 C178,262 ${150 + hem - 18},318 ${150 + hem - 10},366" stroke="#fff" stroke-width="1.5" fill="none" opacity=".17"/>
       <path d="M150,206 C150,250 150,310 150,364" stroke="#fff" stroke-width="1.2" fill="none" opacity=".12"/>
       <path d="M120,200 C116,250 116,300 118,352" stroke="#000" stroke-width="1.3" fill="none" opacity=".13"/>
       <path d="M180,200 C184,250 184,300 182,352" stroke="#000" stroke-width="1.3" fill="none" opacity=".13"/>
       <path d="M137,198 C133,250 133,300 134,356" stroke="#000" stroke-width="1" fill="none" opacity=".09"/>`;

  const ruching = o.ruched
    ? Array.from({ length: 9 }, (_, i) => {
        const y = 108 + i * 11;
        return `<path d="M${118 + i * 1.2},${y} Q150,${y + 5} ${182 - i * 1.2},${y}" stroke="#000" stroke-width="1.1" fill="none" opacity=".22"/>`;
      }).join("")
    : "";

  const akwettePanel = o.akwette
    ? `
    <defs>
      <pattern id="ak${u}" width="9" height="9" patternTransform="rotate(72)" patternUnits="userSpaceOnUse">
        <rect width="9" height="9" fill="none"/>
        <line x1="0" y1="0" x2="0" y2="9" stroke="#d8b478" stroke-width="1.6" opacity=".85"/>
        <line x1="4" y1="0" x2="4" y2="9" stroke="#f0d9ab" stroke-width="0.7" opacity=".55"/>
      </pattern>
      <clipPath id="cp${u}"><path d="${dressPath}"/></clipPath>
    </defs>
    <rect x="176" y="196" width="34" height="180" fill="url(#ak${u})" clip-path="url(#cp${u})" opacity=".9"/>`
    : "";

  const twoTone = o.twotone
    ? `
    <defs><clipPath id="tt${u}"><path d="${o.trousers ? legRPath + " " + topPath : dressPath}"/></clipPath>
    <clipPath id="tp${u}"><path d="${topPath}"/></clipPath></defs>
    ${o.trousers
      ? `<path d="${legRPath}" fill="${p[1]}" opacity=".92"/><path d="${topPath}" fill="${p[1]}" opacity=".92"/><path d="${legLPath}" fill="${p[0]}" opacity=".85"/>`
      : `<g clip-path="url(#tt${u})"><rect x="150" y="0" width="160" height="400" fill="${p[1]}" opacity=".9"/></g>`}`
    : "";

  const body = o.trousers
    ? `<path d="${legLPath}" fill="url(#fab${u})"/>
       <path d="${legRPath}" fill="url(#fab${u})"/>
       <path d="${topPath}" fill="url(#fab${u})"/>`
    : `<path d="${dressPath}" fill="url(#fab${u})"/>`;

  const garmentBody = `
    <g>
      <ellipse cx="150" cy="376" rx="${o.trousers ? 70 : hem * 0.95}" ry="9" fill="#000" opacity=".18" filter="url(#blur${u})"/>
      ${sleeveL ? `<path d="${sleeveL}" fill="url(#fab${u})"/>` : ""}
      ${sleeveR ? `<path d="${sleeveR}" fill="url(#fab${u})"/>` : ""}
      ${body}
      ${twoTone}
      ${akwettePanel}
      ${folds}
      ${ruching}
      <path d="M130,70 Q150,${o.sleeves === "none" ? 106 : 98} 170,70 Z" fill="${studio[1]}" opacity=".55"/>
      <path d="${o.trousers ? topPath : dressPath}" fill="none" stroke="#000" stroke-width="0.7" opacity=".18"/>
    </g>`;

  return `<svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block" role="img" aria-label="Illustration of the ${o.name || "garment"}">
    <defs>
      <linearGradient id="bg${u}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${studio[0]}"/>
        <stop offset="0.55" stop-color="${studio[1]}"/>
        <stop offset="1" stop-color="${studio[2]}"/>
      </linearGradient>
      <linearGradient id="fab${u}" x1="0.15" y1="0" x2="0.9" y2="1">
        <stop offset="0" stop-color="${p[2]}"/>
        <stop offset="0.42" stop-color="${p[0]}"/>
        <stop offset="1" stop-color="${p[1]}"/>
      </linearGradient>
      <radialGradient id="vig${u}" cx="0.5" cy="0.44" r="0.78">
        <stop offset="0.55" stop-color="#000" stop-opacity="0"/>
        <stop offset="1" stop-color="#000" stop-opacity=".26"/>
      </radialGradient>
      <filter id="blur${u}"><feGaussianBlur stdDeviation="5"/></filter>
      <filter id="grain${u}" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" seed="${seedFrom(u) % 100}"/>
        <feColorMatrix type="saturate" values="0"/>
      </filter>
    </defs>
    <rect width="300" height="400" fill="url(#bg${u})"/>
    <ellipse cx="150" cy="130" rx="120" ry="150" fill="#fff" opacity=".13"/>
    ${garmentBody}
    <rect width="300" height="400" fill="url(#vig${u})"/>
    <rect width="300" height="400" filter="url(#grain${u})" opacity=".16" style="mix-blend-mode:multiply"/>
  </svg>`;
}

/** Renders one parametric garment illustration. `uid` must be unique per placement. */
export function GarmentArt({
  options,
  className,
}: {
  options: Omit<ArtOptions, "uid"> & { uid?: string };
  className?: string;
}) {
  const uid = options.uid ?? options.name ?? "garment";
  const svg = useMemo(() => buildGarmentSvg({ ...options, uid }), [options, uid]);
  return (
    <div
      className={className}
      style={{ width: "100%", height: "100%" }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

/** Alternate colourway art for the card hover cross-fade. */
export function altPalette(p: [string, string, string]): [string, string, string] {
  return [p[1], p[0], p[2]];
}
