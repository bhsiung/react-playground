import "./SlidingPuzzle.css";
import React from "react";
import { slidingPuzzle, findZero, Pos, Direction } from "./utils/tiktok";
import assert from "assert";
import {resolve} from "dns";

const ROWS = 3;
const COLS = 3;

interface IProps {
}
interface IState {
  board: number[][];
  solution: string;
}
interface BoardProps {
  board: number[][];
  onSwap: (pos: Pos)=> void;
  onReshuffle: () => void;
  onAutoSolve: () => void;
}
interface Cell {
  i: number;
  j: number;
  value: number;
}

class BoardContainer extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    const board = shuffleBoard()
    // const board = [[1,2,3],[4,5,6],[7,0,8]]
    // const board = [[2,3,0],[1,4,6],[7,5,8]]
    const solution = slidingPuzzle(board);
    this.state = {
      board,
      solution
    };
  }
  reshuffle() {
    const board = [[2,3,0],[1,4,6],[7,5,8]]
    const solution = slidingPuzzle(board);
    this.setState(() => ({
      board,
      solution
    }))
  }
  swap(targetPos: Pos): Promise<void> {
    return new Promise(resolve => {
      const zeroPos = findZero(this.state.board);
      // assert target is valid
      const {i, j} = targetPos
      assert(isNextTo(zeroPos, targetPos), new Error('target is not movable'))
      const targetValue = this.state.board[i][j];
      console.log({ i, j, zeroPos, board: this.state.board });
      // TODO find a better way to get element
      document.querySelector('.sliding-puzzle__board')?.addEventListener('transitionend', () => {
        console.log('Transition ended');
        setTimeout(() => resolve(), 200)
      });
      this.setState(previousState => ({
        ...previousState,
        board: previousState.board.map((row, rowIndex) => {
          if (rowIndex === i || rowIndex === zeroPos.i) {
            return row.map((col, colIndex) => {
              if (colIndex === j && rowIndex === i) return 0;
              if (colIndex === zeroPos.j && rowIndex === zeroPos.i)
                return targetValue;
              return col;
            });
          }
          return row;
        })
      }))
    })
  }
  async autoSolve() {
    console.log('auto', this.state.solution);
    for (let move of this.state.solution) {
      const zeroPos = findZero(this.state.board);
      if (move === Direction.UP) {
        await this.swap({ i: zeroPos.i - 1, j: zeroPos.j })
      } else if (move === Direction.DOWN) {
        await this.swap({ i: zeroPos.i + 1, j: zeroPos.j })
      } else if (move === Direction.LEFT) {
        await this.swap({ i: zeroPos.i, j: zeroPos.j - 1 })
      } else if (move === Direction.RIGHT) {
        await this.swap({ i: zeroPos.i, j: zeroPos.j + 1})
      }
    }
  }
  render(): React.ReactNode {
    const props = {
      board: this.state.board,
      onReshuffle: () => this.reshuffle(),
      onSwap: (target:Pos) => this.swap(target),
      onAutoSolve: () => this.autoSolve()
    };
    return <Board {...props} />;
  }
}

function Board(props:BoardProps) {
  const cells:Cell[] = [];
  for (let i = 0; i<props.board.length; i++) {
    for (let j = 0; j<props.board[0].length; j++) {
      cells.push({i, j, value: props.board[i][j]})
    }
  }
  cells.sort((a,b)=>a.value-b.value)
  return (
    <div className="sliding-puzzle">
      <h1>Sliding puzzle</h1>
      <div className="sliding-puzzle__board" onClick={onClickBoard}>
        {cells.map((cell) =>
          <span
            key={cell.value}
            className="sliding-puzzle__cell"
            data-value={cell.value}
            data-i={cell.i}
            data-j={cell.j}
          >
            {cell.value}
          </span>
        )}
      </div>
      <div className="sliding-puzzle__btn-set">
        <button className="sliding-puzzle__btn" onClick={props.onReshuffle}>Reshuffle</button>
        <button className="sliding-puzzle__btn" onClick={props.onAutoSolve}>Auto</button>
      </div>
    </div>
  );

  function onClickBoard(e: React.MouseEvent<HTMLElement>) {
    const cellElement = e.target as HTMLElement;
    const i = parseInt(cellElement.dataset.i ?? "0");
    const j = parseInt(cellElement.dataset.j ?? "0");
    props.onSwap({i,j})
  }
}

function shuffleBoard(): number[][] {
  const lastNum = ROWS * COLS - 1;
  const numbers: number[] = [];
  const board: number[][] = [];

  for (let i = 0; i <= lastNum; i++) {
    numbers.push(i);
  }
  for (let i = 0; i < ROWS; i++) {
    board[i] = [];
    for (let j = 0; j < COLS; j++) {
      const randIndex = Math.floor(Math.random() * numbers.length);
      const theNumber = numbers.splice(randIndex, 1).pop() as number;
      board[i][j] = theNumber;
    }
  }

  return board;
}

function isNextTo(aPos: Pos, bPos: Pos): boolean {
  if (aPos.i == bPos.i && Math.abs(aPos.j - bPos.j) === 1) return true
  if (aPos.j == bPos.j && Math.abs(aPos.i - bPos.i) === 1) return true
  return false
}

export default BoardContainer;
