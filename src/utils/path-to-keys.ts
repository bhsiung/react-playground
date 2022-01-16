const RETRY_THRESHOLD = 0;
type Pos = [number, number];
interface HistoryMap {
  [positionString: string]: number;
}
interface Solution {
  path: Pos[];
  historyMap: HistoryMap;
  keys: Set<string>;
}
export function shortestPathAllKeys(_grid: string[]): number {
  const grid: string[][] = _grid.map((row) => row.split(""));
  let totalKeyCount = 0;
  let start: Pos = [0, 0]; // TODO
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const label = grid[i][j];
      if (label === "@") start = [i, j];
      else if (isKey(label)) {
        totalKeyCount++;
      }
    }
  }
  const queue: Solution[] = [
    {
      path: [start],
      keys: new Set<string>(),
      historyMap: { [start.join(",")]: 1 },
    },
  ];

  while (queue.length) {
    const currentSolution: Solution = queue.shift() as Solution;
    const currentPos: Pos =
      currentSolution.path[currentSolution.path.length - 1];
    const neighbors = findNeighbors(currentPos, grid);
    for (let neighbor of neighbors) {
      if (
        !isVisited(currentSolution.historyMap, neighbor) &&
        canAccess(currentSolution.keys, neighbor)
      ) {
        // TODO
        // const newKeys = new Set<string>([...currentSolution.keys]);
        // const neighborLabel = findLabel(neighbor);
        // const newHistory = { ...currentSolution.historyMap };
        // const neighborPosString = neighbor.join(",");
        // if (newHistory[neighborPosString]) {
        // newHistory[neighborPosString]++;
        // } else {
        // newHistory[neighborPosString] = 1;
        // }
        // if (isKey(neighborLabel)) {
        // newKeys.add(neighborLabel);
        // if (newKeys.size === totalKeyCount) {
        // // console.log([...currentSolution.path, neighbor]);
        // return currentSolution.path.length;
        // }
        // }
        // queue.push({
        // path: [...currentSolution.path, neighbor],
        // keys: newKeys,
        // historyMap: newHistory,
        // });
      }
    }
  }

  return -1;

  function isVisited(historyMap: HistoryMap, pos: Pos): boolean {
    // console.log("checking", historyMap, pos);
    const targetPosString = pos.join(",");
    const count = historyMap[targetPosString] ?? 0;
    return count > RETRY_THRESHOLD;
  }
  function canAccess(keys: Set<string>, pos: Pos): boolean {
    const label = findLabel(pos);
    if (label === "#") return false;
    if (!isLock(label)) return true;
    const expectedKey = label.toLowerCase();
    return keys.has(expectedKey);
  }
  function findLabel(pos: Pos) {
    return grid[pos[0]][pos[1]];
  }
}

function isKey(label: string): boolean {
  const charCode = label.charCodeAt(0);
  if (charCode >= 97 && charCode <= 122) {
    return true;
  }

  return false;
}

function isLock(label: string): boolean {
  const charCode = label.charCodeAt(0);
  if (charCode >= 65 && charCode <= 90) {
    return true;
  }

  return false;
}

// TODO cache it
function findNeighbors(pos: Pos, grid: string[][]): Pos[] {
  const [i, j] = pos;
  const neighbors: Pos[] = [];
  if (i > 0) neighbors.push([i - 1, j]); // right
  if (j > 0) neighbors.push([i, j - 1]); // bottom
  if (i < grid.length - 1) neighbors.push([i + 1, j]); // left
  if (j < grid[0].length - 1) neighbors.push([i, j + 1]); // top

  return neighbors;
}
