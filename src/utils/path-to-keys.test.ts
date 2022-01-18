import { shortestPathAllKeys } from "./path-to-keys";

describe("test", () => {
  it.skip("works 1", () => {
    expect(shortestPathAllKeys(["@..aA", "..B#.", "....b"])).toBe(6);
  });
  it.skip("works 2", () => {
    expect(shortestPathAllKeys(["@Aa"])).toBe(-1);
  });
  it.skip("works 3", () => {
    expect(shortestPathAllKeys(["@.a.#", "###.#", "b.B.A"])).toBe(-1);
  });
  it.skip("works 4", () => {
    expect(shortestPathAllKeys(["b..", "A.#", ".@a", "..."])).toBe(5);
  });
  it.skip("works 5", () => {
    expect(shortestPathAllKeys(["@.a.#", "....#", "b.A.B"])).toBe(6);
  });
  it.skip("works 6", () => {
    expect(shortestPathAllKeys(["@...a", ".###A", "b.BCc"])).toBe(10);
  });
  it.skip("works 7", () => {
    expect(
      shortestPathAllKeys([
        "..#....##.",
        "....d.#.D#",
        "#...#.c...",
        "..##.#..a.",
        "...#....##",
        "#....b....",
        ".#..#.....",
        "..........",
        ".#..##..A.",
        ".B..C.#..@",
      ])
    ).toBe(19);
  });
});
