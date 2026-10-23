import { describe, expect, it } from "vitest";
import {
  CANVAS_SIZES, compositionSeed, compositionGeometry,
  compositionBackground, compositionSvg, escapeXml,
} from "./composition";

const palette = { start: "#0b111b", end: "#bd5f3a", accent: "#f3b17e" };

describe("Lumen offline composition engine", () => {
  it("creates repeatable but distinct variations", () => {
    const p = "Un paisaje futurista";
    expect(compositionSeed(p, 2)).toBe(compositionSeed(p, 2));
    expect(compositionSeed(p, 2)).not.toBe(compositionSeed(p, 3));
    expect(compositionGeometry(p, 2)).toEqual(compositionGeometry(p, 2));
    expect(compositionBackground(p, palette, 2)).not.toBe(compositionBackground(p, palette, 3));
  });

  it.each(Object.keys(CANVAS_SIZES) as Array<keyof typeof CANVAS_SIZES>)(
    "exports a real %s SVG with matching width and height", (aspect) => {
      const [width, height] = CANVAS_SIZES[aspect];
      const svg = compositionSvg("Paisaje", palette, aspect, 1, "Editorial");
      expect(svg).toContain(`width="${width}" height="${height}"`);
      expect(svg).toContain(`viewBox="0 0 ${width} ${height}"`);
      expect(svg).toContain("Paisaje");
      expect(svg).toContain(aspect);
    }
  );

  it("escapes all user input in SVG text", () => {
    const hostile = `<script>alert("x" & 'y')</script>`;
    const svg = compositionSvg(hostile, palette, "1:1", 0, "Editorial");
    expect(svg).not.toContain("<script>");
    expect(svg).toContain("&lt;script&gt;");
    expect(svg).toContain("&amp;");
    expect(svg).toContain("&quot;");
    expect(svg).toContain("&apos;");
    expect(escapeXml("a&b")).toBe("a&amp;b");
  });

  it("refuses an unsupported aspect instead of generating a misleading file", () => {
    expect(() => compositionSvg("Idea", palette, "broken" as never, 1, "Auto")).toThrow(RangeError);
  });
});
