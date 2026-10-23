import test from "node:test";
import assert from "node:assert/strict";
import { nextMobileMenuState, isMobileMenuDismissKey } from "./mobileNavigation.ts";

test("mobile menu toggles open and closed", () => {
  assert.equal(nextMobileMenuState(false, "toggle"), true);
  assert.equal(nextMobileMenuState(true, "toggle"), false);
});

test("navigation action always closes the mobile menu", () => {
  assert.equal(nextMobileMenuState(true, "close"), false);
  assert.equal(nextMobileMenuState(false, "close"), false);
});

test("Escape dismisses navigation but Enter and Tab do not", () => {
  assert.equal(isMobileMenuDismissKey("Escape"), true);
  assert.equal(isMobileMenuDismissKey("Enter"), false);
  assert.equal(isMobileMenuDismissKey("Tab"), false);
});
