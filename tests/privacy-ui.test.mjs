import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../client/index.html", import.meta.url), "utf8");

test("studio HTML does not load third-party analytics automatically", () => {
  assert.doesNotMatch(html, /VITE_ANALYTICS_ENDPOINT|umami|data-website-id/i);
});

test("mobile viewport allows user zoom", () => {
  assert.match(html, /name="viewport"\s+content="width=device-width, initial-scale=1\.0"/);
  assert.doesNotMatch(html, /maximum-scale|user-scalable\s*=\s*no/i);
});
