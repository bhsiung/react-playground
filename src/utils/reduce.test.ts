import { reduce } from './reduce';

describe('test findOrder', () => {
  it('reduce as function', () => {
    expect(reduce([1, 2, 3, 4, 5], (sum, item) => sum + item, 0)).toBe(15);
  });
});
