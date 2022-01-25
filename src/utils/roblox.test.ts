import { convert, most_requested_resource } from './roblox'

const logs1 = [
  ['58523', 'user_1', 'resource_1'],
  ['62314', 'user_2', 'resource_2'],
  ['54001', 'user_1', 'resource_3'],
  ['200', 'user_6', 'resource_5'],
  ['215', 'user_6', 'resource_4'],
  ['54060', 'user_2', 'resource_3'],
  ['53760', 'user_3', 'resource_3'],
  ['58522', 'user_22', 'resource_1'],
  ['53651', 'user_5', 'resource_3'],
  ['2', 'user_6', 'resource_1'],
  ['100', 'user_6', 'resource_6'],
  ['400', 'user_7', 'resource_2'],
  ['100', 'user_8', 'resource_6'],
  ['54359', 'user_1', 'resource_3'],
]

const logs2 = [
  ['300', 'user_1', 'resource_3'],
  ['599', 'user_1', 'resource_3'],
  ['900', 'user_1', 'resource_3'],
  ['1199', 'user_1', 'resource_3'],
  ['1200', 'user_1', 'resource_3'],
  ['1201', 'user_1', 'resource_3'],
  ['1202', 'user_1', 'resource_3'],
]

function gen({ total, rCount }: { total: number; rCount: number }): string[][] {
  const r: string[][] = []
  for (let i = 0; i < total; i++) {
    const time = Math.round(60 * 60 * 2 * Math.random())
    const resource = `resource_${Math.round(rCount * Math.random())}`
    r.push(['' + time, 'user_1', resource])
  }

  return r
}

const logs3 = [['300', 'user_10', 'resource_5']]

describe('convert', () => {
  it('works', () => {
    expect(convert(logs1)).toEqual({
      user_1: [54001, 58523],
      user_2: [54060, 62314],
      user_3: [53760, 53760],
      user_5: [53651, 53651],
      user_6: [2, 215],
      user_7: [400, 400],
      user_8: [100, 100],
      user_22: [58522, 58522],
    })
    expect(convert(logs2)).toEqual({
      user_1: [300, 1202],
    })
    expect(convert(logs3)).toEqual({
      user_10: [300, 300],
    })
  })
})

describe('most_requested_resource', () => {
  it('works', () => {
    expect(most_requested_resource(logs2)).toEqual(['resource_3', 4])
    expect(
      most_requested_resource([
        ['4440', 'user_1', 'resource_2'],
        ['3643', 'user_1', 'resource_2'],
        ['5925', 'user_1', 'resource_1'],
        ['6799', 'user_1', 'resource_0'],
        ['3046', 'user_1', 'resource_2'],
        ['304', 'user_1', 'resource_0'],
        ['2281', 'user_1', 'resource_1'],
        ['1007', 'user_1', 'resource_1'],
        ['6823', 'user_1', 'resource_0'],
        ['4643', 'user_1', 'resource_0'],
        ['4718', 'user_1', 'resource_0'],
        ['2212', 'user_1', 'resource_1'],
        ['3757', 'user_1', 'resource_2'],
        ['5090', 'user_1', 'resource_2'],
        ['3767', 'user_1', 'resource_1'],
        ['6800', 'user_1', 'resource_0'],
        ['6673', 'user_1', 'resource_2'],
        ['2517', 'user_1', 'resource_1'],
        ['962', 'user_1', 'resource_0'],
        ['6198', 'user_1', 'resource_1'],
      ])
    ).toEqual(['resource_0', 3])
    // console.log(gen({ total: 20, rCount: 2 }))
  })
})
