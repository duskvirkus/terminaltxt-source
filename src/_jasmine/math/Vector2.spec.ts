import { Vector2 } from '../../math/Vector2';

describe('Vector2 Units: ', () => {

  it('constructor unit', () => {
    let vec: Vector2 = new Vector2();
    expect(vec.x).toEqual(0);
    expect(vec.y).toEqual(0);
    vec = new Vector2(2, 3);
    expect(vec.x).toEqual(2);
    expect(vec.y).toEqual(3);
  });

  it('add unit', () => {
    let vec: Vector2 = new Vector2();
    vec.add(1, 2);
    expect(vec.x).toEqual(1);
    expect(vec.y).toEqual(2);
    vec.add(new Vector2(-4, 8));
    expect(vec.x).toEqual(-3);
    expect(vec.y).toEqual(10);
  });

  it('subtract unit', () => {
    let vec: Vector2 = new Vector2();
    vec.subtract(1, 2);
    expect(vec.x).toEqual(-1);
    expect(vec.y).toEqual(-2);
    vec.subtract(new Vector2(-4, 8));
    expect(vec.x).toEqual(3);
    expect(vec.y).toEqual(-10);
  });

  it('dot unit', () => {
    let vec: Vector2 = new Vector2(1, 2);
    expect(vec.dot(8, -3)).toEqual(2);
    expect(vec.dot(new Vector2(-4, 8))).toEqual(12);
  });

  it('magnitude unit', () => {
    let vec: Vector2 = new Vector2(3, 4);
    expect(vec.magnitude()).toBeCloseTo(5);
  });

  it('normalize unit', () => {
    let vec: Vector2 = new Vector2(10, 0);
    vec.normalize();
    expect(vec.x).toEqual(1);
    expect(vec.y).toEqual(0);

    vec = new Vector2();
    vec.normalize();
    expect(vec.x).toEqual(0);
    expect(vec.y).toEqual(0);
  });

  it('copy unit', () => {
    let vec: Vector2 = new Vector2(3, 4);
    let cp: Vector2 = Vector2.copy(vec);
    expect(cp.x).toEqual(3);
    expect(cp.y).toEqual(4);
  });

});