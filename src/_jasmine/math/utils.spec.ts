import { random, map, clamp, cmap } from '../../math/utils';

describe('random Units: ', () => {

  it('random no args unit', () => {
    for (let i: number = 0; i < 100; i++) {
      let rand: number = random();
      expect(rand).toBeGreaterThanOrEqual(0);
      expect(rand).toBeLessThanOrEqual(1);
    }
  });

  it('random one arg unit', () => {
    for (let i: number = 1; i < 100; i++) {
      let rand: number = random(i);
      expect(rand).toBeGreaterThanOrEqual(0);
      expect(rand).toBeLessThanOrEqual(i);
    }
  });

  it('random two arg unit', () => {
    for (let i: number = 1; i < 100; i++) {
      let rand: number = random(i, i * 2);
      expect(rand).toBeGreaterThanOrEqual(i);
      expect(rand).toBeLessThanOrEqual(i * 2);
    }
  });

});

describe('map Units: ', () => {

  it('map unit', () => {
    expect(map(1, 0, 2, -1, 1)).toEqual(0);
    expect(map(5, 0, 2, -1, 1)).toEqual(4);
    expect(map(0.5, 0, 1, 0.1, 0.2)).toBeCloseTo(0.15);
    expect(map(-150, -100, -300, -5, -10)).toBeCloseTo(-6.25);
    expect(map(10, 12, 6, 4, 10)).toEqual(6);
    expect(map(10, 0, 1, 0, 2)).toEqual(20);
  });

});

describe('clamp Units: ', () => {

  it('clamp unit', () => {
    expect(clamp(1, 0, 2)).toEqual(1);
    expect(clamp(5, 0, 2)).toEqual(2);
    expect(clamp(-9.4, 0, 2)).toEqual(0);
    expect(clamp(0.5, 0, 1)).toBeCloseTo(0.5);
    expect(clamp(5, 0.1, 1.9)).toBeCloseTo(1.9);
    expect(clamp(5, 2.1, 1.9)).toBeCloseTo(2.1);
  });

});

describe('cmap Units: ', () => {

  it('cmap unit', () => {
    expect(cmap(1, 0, 2, -1, 1)).toEqual(0);
    expect(cmap(5, 0, 2, -1, 1)).toEqual(1);
    expect(cmap(0.5, 0, 1, 0.1, 0.2)).toBeCloseTo(0.15);
    expect(cmap(-150, -100, -300, -5, -10)).toBeCloseTo(-6.25);
    expect(cmap(10, 12, 6, 4, 10)).toEqual(6);
    expect(cmap(10, 0, 1, 0, 2)).toEqual(2);
    expect(cmap(-3, 0, 2, -1, 1)).toEqual(-1);
    expect(cmap(4, 0, 2, -1, 1)).toEqual(1);
    expect(cmap(2, 0, 1, 0.1, 0.2)).toBeCloseTo(0.2);
    expect(cmap(-450, -100, -300, -5, -10)).toEqual(-10);
    expect(cmap(14, 12, 6, 4, 10)).toEqual(4);
  });

});