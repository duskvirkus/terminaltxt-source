import { add } from '../../math/math';

describe('Math Module Tests :', () => {
  it('Add function', () => {
    expect(add(2, 2)).toBe(4);
  });
});