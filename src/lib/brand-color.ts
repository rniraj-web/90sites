// sRGB approximations of the --primary / --brand-glow oklch tokens, for use in
// WebGL contexts where a CSS custom property can't be read directly.
export const BLUE_DARK = 0x8fc1e3;
export const BLUE_LIGHT = 0x3f72a8;

export function currentBlue() {
  return document.documentElement.classList.contains("dark") ? BLUE_DARK : BLUE_LIGHT;
}
