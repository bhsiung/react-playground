export interface Pos {
  i: number;
  j: number;
}

export enum Direction {
  UP = "U",
  DOWN = "D",
  LEFT = "L",
  RIGHT = "R",
}

interface BoardMovement {
  board: number[][];
  direction: string; // history direction
}

let tried = 0

export function slidingPuzzle(board: number[][]): string {
  tried = 0
  const queue: BoardMovement[] = [{ board: board, direction: "" }];
  const visited = new Set<string>();
  while (queue.length > 0) {
    const currentBoardMovement = queue.shift() as BoardMovement;
    // console.log('pop', currentBoardMovement)
    const neighborMovements: BoardMovement[] = findConnections(
      currentBoardMovement.board
    );
    for (let neighborMovement of neighborMovements) {
      const neighborBoardString = JSON.stringify(neighborMovement.board);
      if (!visited.has(neighborBoardString)) {
        visited.add(neighborBoardString);
        const accumulatedDirection =
          currentBoardMovement.direction + neighborMovement.direction;
        if (puzzleIsResolved(neighborMovement.board)) {
          console.log('yay!', {
            current: currentBoardMovement.direction, 
            new: neighborMovement.direction, 
            total: accumulatedDirection
          })
          return accumulatedDirection;
        }
        queue.push({
          board: neighborMovement.board,
          direction: accumulatedDirection,
        });
      }
    }
  }

  console.log("not found", visited);
  return "";
}
function findConnections(board: number[][]): BoardMovement[] {
  // TODO optimized for a better performance
  const zeroPos: Pos = findZero(board);
  const connectedBoards: BoardMovement[] = [];
  if (zeroPos.i > 0) {
    const newBoard = board.map((row,i) => row.map((col, j) => {
      if (i === zeroPos.i - 1 && j === zeroPos.j) return 0
      if (i === zeroPos.i && j === zeroPos.j) return board[zeroPos.i - 1][zeroPos.j]
      return col
    }))
    connectedBoards.push({
      board: newBoard,
      direction: Direction.UP,
    });
  }
  if (zeroPos.i < board.length - 1) {
    const newBoard = board.map((row,i) => row.map((col, j) => {
      if (i === zeroPos.i + 1 && j === zeroPos.j) return 0
      if (i === zeroPos.i && j === zeroPos.j) return board[zeroPos.i + 1][zeroPos.j]
      return col
    }))
    connectedBoards.push({
      board: newBoard,
      direction: Direction.DOWN,
    });
  }
  if (zeroPos.j > 0) {
    const newBoard = board.map((row,i) => row.map((col, j) => {
      if (i === zeroPos.i && j === zeroPos.j - 1) return 0
      if (i === zeroPos.i && j === zeroPos.j) return board[zeroPos.i][zeroPos.j - 1]
      return col
    }))
    connectedBoards.push({
      board: newBoard,
      direction: Direction.LEFT,
    });
  }
  if (zeroPos.j < board[0].length - 1) {
    const newBoard = board.map((row,i) => row.map((col, j) => {
      if (i === zeroPos.i && j === zeroPos.j + 1) return 0
      if (i === zeroPos.i && j === zeroPos.j) return board[zeroPos.i][zeroPos.j + 1]
      return col
    }))
    connectedBoards.push({
      board: newBoard,
      direction: Direction.RIGHT,
    });
  }

  return connectedBoards;
}

export function findZero(board: number[][]): Pos {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] === 0) return { i, j };
    }
  }
  throw new Error("no zero found in the board");
}
function puzzleIsResolved(board: number[][]): boolean {
  if (tried > 100) {
    console.log('retry exhausted', tried)
    return true
  }
  return JSON.stringify(board) === "[[1,2,3],[4,5,6],[7,8,0]]";
}
