import {
  getPath,
  cloneVisited,
  findConnections,
  shortestPath,
} from './shortest-obstacle-path'

describe('test path finder', () => {
  const grid1 = [
    [0, 0, 0],
    [1, 1, 0],
    [0, 0, 0],
    [1, 1, 0],
  ]
  const grid2 = [
    [0, 0, 0],
    [1, 1, 0],
    [0, 0, 0],
    [0, 1, 1],
    [0, 0, 0],
  ]
  const grid3 = [
    [0, 1, 1],
    [1, 1, 1],
    [1, 0, 0],
  ]
  it('can handle when k=0', () => {
    expect(shortestPath(grid1, 0)).toBe(5)
    expect(shortestPath(grid2, 0)).toBe(10)
    expect(shortestPath(grid3, 0)).toBe(-1)
  })
  it('can handle when k=1', () => {
    expect(shortestPath(grid1, 1)).toBe(5)
    expect(shortestPath(grid2, 1)).toBe(6)
    expect(shortestPath(grid3, 1)).toBe(-1)
    expect(shortestPath(grid3, 2)).toBe(4)
  })
})
describe('test utils', () => {
  it('getPath', () => {
    const pathMap = {
      '2,3': '1,3',
      '1,3': '0,3',
      '0,3': '0,2',
      '0,2': '0,0',
    }
    expect(getPath(pathMap, '2,3')).toBe(4)
  })
  it('cloneVisited', () => {
    const visited = new Set(['0,0', '0,2', '0,3', '1,3', '2,3'])
    const clonedVisited = cloneVisited(visited, '3,5')
    expect(clonedVisited.has('3,5')).toBeTruthy()
    expect(clonedVisited.size).toBe(6)
    expect(visited.size).toBe(5)
    expect(visited.has('3,5')).toBeFalsy()
    clonedVisited.add('7,7')
    expect(visited.size).toBe(5)
  })
  it('findConnections', () => {
    const grid1 = [
      [0, 0, 0],
      [1, 1, 0],
      [0, 0, 0],
      [1, 1, 0],
    ]
    expect(findConnections(grid1, [0, 1])).toEqual([
      { pos: [1, 1], isObstacle: true },
      { pos: [0, 0], isObstacle: false },
      { pos: [0, 2], isObstacle: false },
    ])
    expect(findConnections(grid1, [1, 1])).toEqual([
      { pos: [0, 1], isObstacle: false },
      { pos: [2, 1], isObstacle: false },
      { pos: [1, 0], isObstacle: true },
      { pos: [1, 2], isObstacle: false },
    ])
    expect(findConnections([[1]], [1, 1])).toEqual([])
    expect(findConnections([[0, 0]], [0, 0])).toEqual([
      { pos: [0, 1], isObstacle: false },
    ])
    expect(findConnections([[0], [0], [1]], [1, 0])).toEqual([
      { pos: [0, 0], isObstacle: false },
      { pos: [2, 0], isObstacle: true },
    ])
  })
})
