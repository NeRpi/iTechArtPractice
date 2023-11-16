import Board from "../Board.ts";
import Cell from "../Cell.ts";
import Color from "../enums/color.enum.ts";
import LongRangePiece from "./LongRangePiece.ts";

export default class Queen extends LongRangePiece {
  constructor(cell: Cell, color: Color) {
    super(cell, color);
    this.directions = [
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0]
    ];
  }

  toString(): string {
    return this.color === Color.White ? "Q" : "q";
  }
}
