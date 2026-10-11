import {
  parse, formatHex, converter, interpolate, samples,
  wcagContrast, wcagLuminance
} from 'culori';

export const toHsl = converter('hsl');
export const toRgb = converter('rgb');
export const toLab = converter('lab');
export const toLch = converter('lch');
export const toHsv = converter('hsv');

export { parse, formatHex, interpolate, samples, wcagContrast, wcagLuminance };

export function randomHex() {
  return formatHex({
    mode: 'rgb',
    r: Math.random(),
    g: Math.random(),
    b: Math.random(),
  });
}

export function isValid(color) {
  return parse(color) !== undefined;
}

export function hslToHex(h, s, l) {
  return formatHex({ mode: 'hsl', h, s, l });
}

export function scaleColors(colors, mode, count) {
  const fn = interpolate(colors, mode);
  return samples(count).map(t => formatHex(fn(t)));
}

export function rgbToCmyk(hex) {
  const { r, g, b } = toRgb(hex);
  const k = 1 - Math.max(r, g, b);
  if (k === 1) return [0, 0, 0, 1];
  return [
    (1 - r - k) / (1 - k),
    (1 - g - k) / (1 - k),
    (1 - b - k) / (1 - k),
    k,
  ];
}
