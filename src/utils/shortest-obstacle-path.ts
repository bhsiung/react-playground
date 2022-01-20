interface QueueItem {
  i: number
  j: number
  stepCount: number
  obstacleCount: number
}
type Pos = [number, number]

export function shortestPath(grid: number[][], k: number): number {
  const queue: QueueItem[] = [{ i: 0, j: 0, stepCount: -1, obstacleCount: 0 }]
  const shortestPossiblePath = grid.length + grid[0].length - 2
  const visited = new Set<string>()
  if (shortestPossiblePath === 0) return 0

  while (queue.length > 0) {
    const current = queue.shift() as QueueItem
    let { i, j, stepCount, obstacleCount } = current
    const currentString = `${i},${j},${obstacleCount}`
    stepCount++
    // hit obstacle
    if (grid[i][j] === 1) obstacleCount += 1
    // run out of obstcle-elimition quota
    if (obstacleCount > k) continue
    // is visited
    if (visited.has(currentString)) continue
    // hit the end
    if (i === grid.length - 1 && j === grid[0].length - 1) {
      return stepCount
    }

    visited.add(currentString)
    const connections = findConnections(grid, [i, j])
    for (let [_i, _j] of connections) {
      queue.push({
        i: _i,
        j: _j,
        stepCount,
        obstacleCount,
      })
    }
  }

  // unable to get path
  return -1
}

export function findConnections(grid: number[][], [i, j]: Pos): Pos[] {
  const vectors: Pos[] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]
  const connections: Pos[] = []
  for (let [offsetI, offsetJ] of vectors) {
    if (
      i + offsetI >= 0 &&
      i + offsetI <= grid.length - 1 &&
      j + offsetJ >= 0 &&
      j + offsetJ <= grid[0].length - 1
    ) {
      const newPos: Pos = [i + offsetI, j + offsetJ]
      if (
        grid[newPos[0]] !== undefined &&
        grid[newPos[0]][newPos[1]] !== undefined
      ) {
        connections.push(newPos)
      }
    }
  }

  return connections
}
export function cloneVisited(
  visited: Set<string>,
  posStr?: string
): Set<string> {
  const newSet = new Set<string>()
  visited.forEach((item) => newSet.add(item))
  if (posStr) newSet.add(posStr)
  return newSet
}

export function getPath(
  pathMap: Record<string, string>,
  posStr: string
): number {
  let count = 0
  while (posStr !== '0,0') {
    posStr = pathMap[posStr]
    count++
  }
  return count
}
