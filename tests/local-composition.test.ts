import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { generateLocalComposition } from "../client/src/lib/local-composition";

const specimen = {
  prompt: "Calma nocturna & luz <script>alert(1)</script>",
  style: "Nocturno",
  aspect: "16:9" as const,
  variation: 1,
  palette: { start: "#101b3d", end: "#3d267a", accent: "#9d8bff" },
};

describe("Lumen Local SVG generation", () => {
  it("generates stable, independently reproducible vector art", () => {
    expect(generateLocalComposition(specimen)).toBe(generateLocalComposition(specimen));
    expect(generateLocalComposition({ ...specimen, variation: 2 }))
      .not.toBe(generateLocalComposition(specimen));
  });
  it.each([
    ["1:1", 1200, 1200], ["4:5", 1200, 1500],
    ["16:9", 1600, 900], ["9:16", 900, 1600],
  ] as const)("uses actual dimensions for aspect %s", (aspect, width, height) => {
    expect(generateLocalComposition({ ...specimen, aspect }))
      .toContain(`width="${width}" height="${height}"`);
  });
  it("escapes untrusted prompt text inside exported XML", () => {
    const svg = generateLocalComposition(specimen);
    expect(svg).toContain("&lt;script&gt;");
    expect(svg).toContain("&amp;");
    expect(svg).not.toContain("<script>");
  });
  it("rejects empty prompts and never trusts palette URL input", () => {
    expect(() => generateLocalComposition({ ...specimen, prompt: "  " })).toThrow(RangeError);
    const svg = generateLocalComposition({
      ...specimen, palette: { ...specimen.palette, start: "url(javascript:alert(1))" },
    });
    expect(svg).not.toContain("url(javascript:alert(1))");
  });
  it("renders and exports the same generated SVG rather than a timer mock", () => {
    const home = readFileSync("client/src/pages/Home.tsx", "utf8");
    expect(home).toContain("new Blob([svgMarkup]");
    expect(home).toContain("src={previewUrl}");
    expect(home).toContain("setComposition(previous =>");
    expect(home).not.toContain("setTimeout(r, 900)");
    expect(home).not.toContain("/manus-storage/lumen-hero_f3544468.jpg");
  });
});
