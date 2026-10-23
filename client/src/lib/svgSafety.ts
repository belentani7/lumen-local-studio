/** Escape user-provided text for SVG/XML text nodes. */
export function escapeSvgText(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;',
  })[char]!);
}

/** SVG 1.1 forbids most ASCII control characters even when escaped. */
export function safeSvgCaption(value: string, maxLength = 54): string {
  return escapeSvgText(value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').slice(0, maxLength));
}
