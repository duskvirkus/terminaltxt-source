/**
 * Also see [[cmap]].
 * 
 * @param value 
 * @param min 
 * @param max 
 * @return value if between min and max, otherwise returns min if below min or max if above max.
 */
export function clamp(value: number, min: number, max: number): number {
  if (max < min) {
    const temp: number = min;
    min = max;
    max = temp;
  }
  if (value >= min && value <= max) {
    return value;
  } else if (value < min) {
    return min;
  } else {
    return max;
  }
}

/**
 * Also see [[cmap]].
 * 
 * @param value 
 * @param min1 
 * @param max1 
 * @param min2 
 * @param max2 
 * @returns value converted from range 1 to range 2
 */
export function map(value: number, min1: number, max1: number, min2: number, max2: number): number {
  return (value - min1) / (max1 - min1) * (max2 - min2) + min2;
}

/**
 * Will clamp value if outside of range 2.
 * 
 * Also see [[map]] and [[clamp]].
 * 
 * @param value 
 * @param min1 
 * @param max1 
 * @param min2 
 * @param max2 
 * @returns value converted from range 1 to range 2 and clamps if necessary
 */
export function cmap(value: number, min1: number, max1: number, min2: number, max2: number): number {
  return clamp(map(value, min1, max1, min2, max2), min2, max2);
}

/**
 * @returns random number between 0 and 1
 */
export function random(): number
/**
 * @param max 
 * @returns random number between 0 and max
 */
export function random(max: number): number
/**
 * @param min 
 * @param max 
 * @returns random number between min and max
 */
export function random(min: number, max: number): number
export function random(minOrMax?: number, max?: number): number {
  if (max && minOrMax) {
    return Math.random() * (max - minOrMax) + minOrMax;
  } else if (minOrMax) {
    return Math.random() * minOrMax;
  } else {
    return Math.random();
  }
}