import { MouseEventHandler } from "react";
import "./SlidingPuzzle.css";
import React from "react";
import { slidingPuzzle, findZero } from "./utils/tiktok";

const ROWS = 5;
const COLS = 5;
class BoardContainer extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      board: shuffleBoard(),
    };
  }
  swap(aPos: Pos, bBos: Pos): void {}
  render(): React.ReactNode {
    const props = { board: this.state.board, onSwap: this.swap };
    return <Board {...props} />;
  }
}
function Board() {
  const solution = slidingPuzzle(board);
  const zeroPos = findZero(board);
  console.log({ board, solution, zeroPos });
  return (
    <div className="pillar">
      <h1>Sliding puzzle</h1>
      <div className="sliding-puzzle" onClick={onClickBoard}>
        {board.map((row, i) =>
          row.map((col, j) => (
            <span
              className="sliding-puzzle__col"
              data-value={col}
              data-i={i}
              data-j={j}
            >
              {col}
            </span>
          ))
        )}
      </div>
    </div>
  );

  function onClickBoard(e: React.MouseEvent<HTMLElement>) {
    console.log(e.target);
    const cellElement = e.target as HTMLElement;
    const i = parseInt(cellElement.dataset.i ?? "0");
    const j = parseInt(cellElement.dataset.ji ?? "0");
    const targetValue = board[i][j];
    console.log({ i, j, zeroPos, board });
    board = board.map((row, rowIndex) => {
      if (rowIndex === i || rowIndex === zeroPos.i) {
        return row.map((col, colIndex) => {
          if (colIndex === j && rowIndex === i) return 0;
          if (colIndex === zeroPos.j && rowIndex === zeroPos.i)
            return targetValue;
          return col;
        });
      }
      return row;
    });
    console.log({ board });
  }
}

function shuffleBoard(): number[][] {
  const lastNum = ROWS * COLS - 1;
  const nums: number[] = [];
  const board: number[][] = [];

  for (let i = 0; i <= lastNum; i++) {
    nums.push(i);
  }
  for (let i = 0; i < ROWS; i++) {
    board[i] = [];
    for (let j = 0; j < COLS; j++) {
      const randIndex = Math.floor(Math.random() * nums.length);
      const theNumber = nums.splice(randIndex, 1).pop() as number;
      board[i][j] = theNumber;
    }
  }

  return board;
}

export default BoardContainer;
