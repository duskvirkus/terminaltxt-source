import { add } from '../../math/math';
// TODO make paths more reliable

describe('Math Module Tests :', () => {
  it('Add function', () => {
    expect(add(2, 2)).toBe(4);
  });
});