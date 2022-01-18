import { breakPattern, isMatch } from './regex-match'

describe('test breakPattern', () => {
  it('works', () => {
    expect(breakPattern('abc')).toEqual([
      { value: 'a', hasStar: false },
      { value: 'b', hasStar: false },
      { value: 'c', hasStar: false },
    ])
    expect(breakPattern('a*bc*')).toEqual([
      { value: 'a', hasStar: true },
      { value: 'b', hasStar: false },
      { value: 'c', hasStar: true },
    ])
    expect(breakPattern('c*..*')).toEqual([
      { value: 'c', hasStar: true },
      { value: '.', hasStar: false },
      { value: '.', hasStar: true },
    ])
  })
})
describe('test isMatch', () => {
  it('works for char match', () => {
    expect(isMatch('abcd', 'a')).toBe(false)
    expect(isMatch('abcd', 'abcd.')).toBe(false)
    expect(isMatch('abcd', 'abcd')).toBe(true)
    expect(isMatch('abcd', '.b.d')).toBe(true)
    expect(isMatch('abcd', 'bcda')).toBe(false)
    expect(isMatch('abka', 'abc*a')).toBe(false)
    expect(isMatch('abcccca', 'abc*ca')).toBe(true)
    expect(isMatch('abca', 'abd*ca')).toBe(true)
    expect(isMatch('abcccc', 'abc*')).toBe(true)
    expect(isMatch('abcccc', 'abc*d*')).toBe(true)
    expect(isMatch('abcccc', 'abc*d*.*')).toBe(true)
    expect(isMatch('abcd', 'ab.*cd')).toBe(true)
    expect(isMatch('abcd', 'a.*d')).toBe(true)
    expect(isMatch('abcd', 'a.*')).toBe(true)
    expect(isMatch('abcd', '.*d')).toBe(true)
    expect(isMatch('abcd', '.*')).toBe(true)
    expect(isMatch('abcd', 'ak*.*cda*')).toBe(true)
    expect(isMatch('abcd', 'a*.*cda*o')).toBe(false)
    expect(isMatch('abcd', 'czxxczxa*.*cda*')).toBe(false)
  })
})
