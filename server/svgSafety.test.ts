import { describe, expect, it } from "vitest";
import { escapeSvgText, safeSvgCaption } from "../client/src/lib/svgSafety";

describe("SVG export text safety", () => {
  it("escapes markup and entities without deleting user text", () => {
    expect(escapeSvgText(`A&B <C> "D" 'E'`)).toBe("A&amp;B &lt;C&gt; &quot;D&quot; &apos;E&apos;");
  });
  it("removes invalid XML controls but retains newlines", () => {
    expect(safeSvgCaption("hello\u0000\u0001\nworld")).toBe("hello\nworld");
  });
  it("truncates before XML escaping, never within an entity", () => {
    expect(safeSvgCaption("&".repeat(60))).toBe("&amp;".repeat(54));
  });
});
