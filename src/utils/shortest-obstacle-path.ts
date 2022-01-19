interface Connection {
    isObstacle: boolean
    pos: Pos
}
type Pos = [number, number]

export function shortestPath(
    grid: number[][],
    k: number,
    visited = new Set<string>(),
    queue:Pos[] = []
): number {
    const shortestPath = grid.length + grid[0].length - 1 
    let bestPath = Number.MAX_SAFE_INTEGER
    if (queue.length === 0) queue.push(grid[0][0])
    while(queue.length > 0) {
        const tile = queue.shift()
        const connections = findConnections()
        
        for (let connection of connections) {
            const posString = connection.pos.join(',')
            if (!visited.has(posString)) {
                if (k > 0 && connection.isObstacle) {
                    const pathIfEliminate = shortestPath(
                        grid,
                        k - 1, 
                        cloneVisited(visited, connection), 
                        cloneQueue(queue, connection)
                    )
                    bestPath = Math.min(pathIfEliminate, bestPath)
                    if (bestPath <= shortestPath) return bestPath
                }
            }
        }
    }
    
    // get path
    return Math.min(path, bestPath)
};
function findConnections(grid: number[][], pos: Pos): Connection[] {
    
}
