export function rgb(red: number, green: number, blue: number): string {
  red = Math.round(red);
  green = Math.round(green);
  blue = Math.round(blue);
  if (red < 0) {
    red = 0;
  }
  if (red > 255) {
    red = 255;
  }
  if (green < 0) {
    green = 0;
  }
  if (green > 255) {
    green = 255;
  }
  if (blue < 0) {
    blue = 0;
  }
  if (blue > 255) {
    blue = 255;
  }
  return rgbNoTest(red, green, blue);
}

export function rgbNoTest(red: number, green: number, blue: number): string {
  return '#' + toHex(red) + toHex(green) + toHex(blue);
}

export function toHex(component: number): string {
  let hex: string = component.toString(16);
  while (hex.length < 2) {
    hex = '0' + hex;
  }
  if (hex.length > 2) {
    return hex.substring(0, 2);
  }
  return hex;
}