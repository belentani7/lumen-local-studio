/** Offline procedural composition engine: deterministic SVG, no image model or API. */
export type StudioAspect = "1:1" | "4:5" | "16:9" | "9:16";
export type StudioPalette = { start: string; end: string; accent: string };
export type CompositionSpec = {
  prompt: string;
  style: string;
  aspect: StudioAspect;
  palette: StudioPalette;
  variation: number;
};

const SIZES: Record<StudioAspect, [number, number]> = {
  "1:1": [1200, 1200], "4:5": [1200, 1500],
  "16:9": [1600, 900], "9:16": [900, 1600],
};

function escapeText(input: string): string {
  return input.replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function safeColor(value: string, fallback: string): string {
  return /^#[0-9a-f]{6}$/i.test(value) ? value : fallback;
}
function seededRandom(prompt: string, variation: number): () => number {
  let hash = (2166136261 ^ (variation >>> 0)) >>> 0;
  for (let i = 0; i < prompt.length; i++) {
    hash = Math.imul(hash ^ prompt.charCodeAt(i), 16777619) >>> 0;
  }
  return () => {
    hash ^= hash << 13; hash ^= hash >>> 17; hash ^= hash << 5;
    return (hash >>> 0) / 4294967296;
  };
}

export function generateLocalComposition(spec: CompositionSpec): string {
  const [width, height] = SIZES[spec.aspect] ?? SIZES["16:9"];
  const start = safeColor(spec.palette.start, "#101b3d");
  const end = safeColor(spec.palette.end, "#27417b");
  const accent = safeColor(spec.palette.accent, "#9dbdff");
  const message = spec.prompt.trim().slice(0, 82);
  if (!message) throw new RangeError("Enter a nonempty prompt");
  const random = seededRandom(message + spec.style + spec.aspect, spec.variation);
  const circles = Array.from({ length: 15 }, (_, index) => {
    const cx = Math.round(random() * width);
    const cy = Math.round(random() * height);
    const radius = Math.round((0.025 + random() * 0.22) * Math.min(width, height));
    const opacity = (0.05 + random() * 0.17).toFixed(3);
    return `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="${index % 3 ? accent : end}" opacity="${opacity}"/>`;
  }).join("");
  const waves = Array.from({ length: 5 }, (_, index) => {
    const y = Math.round(height * (0.24 + index * 0.14));
    const jitter = Math.round((random() - 0.5) * height * 0.36);
    const opacity = (0.05 + random() * 0.17).toFixed(3);
    return `<path d="M-80 ${y} C${Math.round(width * 0.3)} ${y + jitter}, ${Math.round(width * 0.62)} ${y - jitter}, ${width + 80} ${y - Math.round(jitter / 2)}" fill="none" stroke="${accent}" stroke-width="${2 + index * 3}" opacity="${opacity}"/>`;
  }).join("");
  const base = Math.min(width, height);
  const labelSize = Math.round(base * 0.031);
  const headingSize = Math.round(base * 0.046);
  const caption = escapeText(message.length >= 65 ? message.slice(0, 62) + "…" : message);
  const safeStyle = escapeText(spec.style.slice(0, 30).toUpperCase());
  const inset = Math.round(base * 0.07);
  const bottom = height - inset;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Composición vectorial local Lumen">
<defs>
  <linearGradient id="lumen-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${start}"/><stop offset="1" stop-color="${end}"/></linearGradient>
  <radialGradient id="lumen-glow"><stop offset="0" stop-color="${accent}" stop-opacity=".85"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/></radialGradient>
  <filter id="lumen-soft"><feGaussianBlur stdDeviation="${Math.round(base * 0.028)}"/></filter>
</defs>
<rect width="${width}" height="${height}" fill="url(#lumen-bg)"/>
<ellipse cx="${Math.round(width * (0.62 + random() * 0.2))}" cy="${Math.round(height * 0.35)}" rx="${Math.round(width * 0.42)}" ry="${Math.round(height * 0.48)}" fill="url(#lumen-glow)" filter="url(#lumen-soft)"/>
<g>${circles}</g><g>${waves}</g>
<path d="M${inset} ${inset}H${Math.round(width * .38)} M${inset} ${inset}V${inset + base * .045}" fill="none" stroke="white" stroke-opacity=".55" stroke-width="2"/>
<text x="${inset}" y="${bottom - headingSize * 1.4}" font-size="${labelSize}" font-family="sans-serif" font-weight="600" letter-spacing="5" fill="white" opacity=".77">LUMEN · ${safeStyle}</text>
<text x="${inset}" y="${bottom}" font-size="${headingSize}" font-family="Georgia, serif" fill="white">${caption}</text>
</svg>`;
}
