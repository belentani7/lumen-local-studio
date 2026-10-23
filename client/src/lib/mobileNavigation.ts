export function nextMobileMenuState(open: boolean, action: "toggle" | "close"): boolean {
  return action === "toggle" ? !open : false;
}

export function isMobileMenuDismissKey(key: string): boolean {
  return key === "Escape";
}
