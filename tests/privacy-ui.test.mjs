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

const viteConfig = readFileSync(new URL("../vite.config.ts", import.meta.url), "utf8");

test("offline studio does not expose an unauthenticated storage signing proxy", () => {
  // The previous development middleware signed arbitrary storage keys without
  // authenticating callers when a Forge credential was configured.
  assert.doesNotMatch(viteConfig, /manus-storage/);
  assert.doesNotMatch(viteConfig, /BUILT_IN_FORGE_API_KEY/);
  assert.doesNotMatch(viteConfig, /vitePluginStorageProxy/);
});
