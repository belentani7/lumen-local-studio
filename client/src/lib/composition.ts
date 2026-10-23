/** Deterministic, offline vector composition. No models, providers or paid APIs. */
export type CanvasAspect = "1:1" | "4:5" | "16:9" | "9:16";
export type ColorTriplet = { start: string; end: string; accent: string };
export const CANVAS_SIZES: Record<CanvasAspect, readonly [number, number]> = {
  "1:1": [1200, 1200],
  "4:5": [1200, 1500],
  "16:9": [1600, 900],
  "9:16": [900, 1600],
};
export function escapeXml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
export function compositionSeed(prompt: string, variation: number): number {
  const text = prompt.trim().slice(0, 1500) + ":" + Math.max(0, Math.floor(variation));
  let hash = 2166136261;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}
export function compositionGeometry(prompt: string, variation: number) {
  const seed = compositionSeed(prompt, variation);
  return {
    primaryX: 30 + (seed % 46),
    primaryY: 14 + ((seed >>> 7) % 39),
    secondaryX: 15 + ((seed >>> 13) % 50),
    secondaryY: 55 + ((seed >>> 20) % 31),
    tilt: (seed % 70) - 35,
  };
}
export function compositionBackground(prompt: string, palette: ColorTriplet, variation: number): string {
  const g = compositionGeometry(prompt, variation);
  return [
    `radial-gradient(circle at ${g.primaryX}% ${g.primaryY}%, ${palette.accent}88 0 8%, transparent 34%)`,
    `radial-gradient(circle at ${g.secondaryX}% ${g.secondaryY}%, ${palette.end}99 0 9%, transparent 32%)`,
    `linear-gradient(${135 + g.tilt}deg, ${palette.start}, ${palette.end})`,
  ].join(", ");
}
export function compositionSvg(
  prompt: string,
  palette: ColorTriplet,
  aspect: CanvasAspect,
  variation: number,
  styleName: string,
): string {
  const [width, height] = CANVAS_SIZES[aspect];
  if (!width || !height) throw new RangeError("Proporción de composición no válida");
  const g = compositionGeometry(prompt, variation);
  const one = { x: Math.round(width * g.primaryX / 100), y: Math.round(height * g.primaryY / 100) };
  const two = { x: Math.round(width * g.secondaryX / 100), y: Math.round(height * g.secondaryY / 100) };
  const large = Math.round(Math.max(width, height) * 0.45);
  const small = Math.round(Math.max(width, height) * 0.26);
  const label = escapeXml(prompt.trim().slice(0, 80));
  const styleLabel = escapeXml(styleName.slice(0, 40).toUpperCase());
  const bottom = height - 90;
  const titleY = height - 145;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Composición vectorial local">
<defs><linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="${escapeXml(palette.start)}"/><stop offset="1" stop-color="${escapeXml(palette.end)}"/>
</linearGradient><radialGradient id="glow"><stop stop-color="${escapeXml(palette.accent)}" stop-opacity=".9"/>
<stop offset="1" stop-color="${escapeXml(palette.accent)}" stop-opacity="0"/></radialGradient></defs>
<rect width="${width}" height="${height}" fill="url(#background)"/>
<circle cx="${one.x}" cy="${one.y}" r="${large}" fill="url(#glow)" opacity=".68"/>
<circle cx="${two.x}" cy="${two.y}" r="${small}" fill="${escapeXml(palette.accent)}" opacity=".12"/>
<path d="M0 ${height} C${Math.round(width*.3)} ${Math.round(height*.8)} ${Math.round(width*.7)} ${Math.round(height*.7)} ${width} ${Math.round(height*.2)} L${width} ${height}Z" fill="white" opacity=".055"/>
<text x="52" y="${titleY}" font-family="Georgia, serif" font-size="38" fill="white">${label}</text>
<text x="54" y="${bottom}" font-family="Arial, sans-serif" font-size="17" fill="white" opacity=".8">LUMEN LOCAL · ${styleLabel} · ${aspect}</text>
</svg>`;
}
