import { numberOfWeakCharacters } from './weak-character'

describe('numberOfWeakCharacters', () => {
  it('works', () => {
    expect(
      numberOfWeakCharacters([
        [1, 2],
        [1, 1],
        [3, 3],
        [22, 22],
      ])
    ).toEqual([2, 1, 0])
    expect(
      numberOfWeakCharacters([
        [1, 2],
        [9, 10],
        [2, 2],
      ])
    ).toEqual([2, 0])
    expect(
      numberOfWeakCharacters([
        [1, 1],
        [2, 2],
        [3, 10],
        [4, 6],
        [0, 2],
        [2, 9],
        [8, 2],
      ])
    ).toEqual([1, 5, 0, 4])
    expect(
      numberOfWeakCharacters([
        [4, 10],
        [2, 2],
        [8, 8],
        [10, 2],
        [5, 5],
        [9, 10],
        [2, 6],
      ])
    ).toEqual([2, 4, 1, 6])
  })
})
