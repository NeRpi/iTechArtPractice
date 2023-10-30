import Board from "../Board.ts";
import Cell from "../Cell.ts";
import LongRangePiece from "./LongRangePiece.ts";
import { Color } from "./Piece.ts";

export default class Bishop extends LongRangePiece {
  constructor(board: Board, cell: Cell, color: Color) {
    super(board, cell, color);
    this.directions = [
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1]
    ];
  }

  toString(): string {
    return this.color === Color.White ? "B" : "b";
  }
}
