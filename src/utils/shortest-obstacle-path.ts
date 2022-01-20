interface Connection {
  isObstacle: boolean
  pos: Pos
}
type Pos = [number, number]

export function shortestPath(
  grid: number[][],
  k: number,
  visited = new Set<string>(),
  queue: Pos[] = [],
  pathMap: Record<string, string> = {}
): number {
  const shortestPossiblePath = grid.length + grid[0].length - 2
  let bestPath = Number.MAX_SAFE_INTEGER
  if (queue.length === 0) queue.push([0, 0])
  while (queue.length > 0) {
    const tile = queue.shift() as Pos
    const tilePosString = tile.join(',')
    const connections = findConnections(grid, tile)
    // finish early if connection include destination
    for (let connection of connections) {
      if (
        connection.pos[0] === grid.length - 1 &&
        connection.pos[1] === grid[0].length - 1
      ) {
        // +1 because the endPoint is tile, which is the block before the destination
        return Math.min(getPath(pathMap, tilePosString) + 1, bestPath)
      }
    }

    for (let connection of connections) {
      const posString = connection.pos.join(',')
      if (!visited.has(posString)) {
        visited.add(posString)
        pathMap[posString] = tilePosString
        if (connection.isObstacle) {
          // Fork!!!
          if (k > 0) {
            // const pathIfEliminate = 99
            const pathIfEliminate = shortestPath(
              grid,
              k - 1,
              cloneVisited(visited),
              [...queue, connection.pos],
              { ...pathMap }
            )
            bestPath = Math.min(pathIfEliminate, bestPath)
            if (bestPath <= shortestPossiblePath) return bestPath
          }
        } else {
          visited.add(posString)
          queue.push(connection.pos)
        }
      }
    }
  }

  // unable to get path
  return Math.min(-1, bestPath)
}

export function findConnections(grid: number[][], [i, j]: Pos): Connection[] {
  const vectors: Pos[] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]
  const connections: Connection[] = []
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
        connections.push({
          pos: newPos,
          isObstacle: grid[newPos[0]][newPos[1]] === 1,
        })
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
