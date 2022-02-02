import { calculate, CalStack, OPT } from './calculator'

describe('calculation works', () => {
  it('has core - test 1', () => {
    // 1 + 8 - 6 = 3
    const core = new CalStack()
    core.push({ num: 1 })
    core.push({ operator: OPT.PLUS })
    core.push({ num: 8 })
    core.push({ operator: OPT.MINUS })
    core.push({ num: 6 })
    expect(core.output()).toBe(3)
  })
  it('has core - test 2', () => {
    // 10 - 8 - 67 = -65
    const core = new CalStack()
    core.push({ num: 10 })
    core.push({ operator: OPT.MINUS })
    core.push({ num: 8 })
    core.push({ operator: OPT.MINUS })
    core.push({ num: 67 })
    expect(core.output()).toBe(-65)
  })
  it.only('has control', () => {
    expect(calculate('1+ 3')).toBe(4)
    expect(calculate('-1+ 3')).toBe(2)
    expect(calculate('-1+88+ 3-90')).toBe(0)

    expect(calculate('(1+88)+ 3-90')).toBe(2)
    expect(calculate('-(1+88)+ 3-90')).toBe(-176)
    expect(calculate('-(-30+88)+ 3-90')).toBe(-145)
  })
})
