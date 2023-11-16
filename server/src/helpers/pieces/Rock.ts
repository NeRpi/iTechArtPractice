import Board from "../Board.ts";
import Cell from "../Cell.ts";
import BaseMove from "../move/BaseMove.ts";
import Color from "../enums/color.enum.ts";
import LongRangePiece from "./LongRangePiece.ts";

export default class Rock extends LongRangePiece {
  constructor(cell: Cell, color: Color) {
    super(cell, color);
    this.directions = [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0]
    ];
  }

  toString(): string {
    return this.color === Color.White ? "R" : "r";
  }

  afterMove(board: Board, move: BaseMove): void {
    const sideCastlings = this.color === Color.White ? 0 : 2;
    board.castlings[sideCastlings + (this.cell.y % 2)] = false;
    this.afterMove = super.afterMove;
  }
}
