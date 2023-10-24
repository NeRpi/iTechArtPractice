import Cell from "./Cell.ts";
import Piece from "./pieces/Piece.ts";

export default class Move {
  piece: Piece;
  cellFrom: Cell;
  cellTo: Cell;

  constructor(piece: Piece, cellFrom: Cell, cellTo: Cell) {
    this.piece = piece;
    this.cellFrom = cellFrom;
    this.cellTo = cellTo;
  }

  toString(): string {
    return (
      this.piece +
      String.fromCharCode(97 + this.cellFrom.y) +
      (this.cellFrom.x + 1) +
      String.fromCharCode(97 + this.cellTo.y) +
      (this.cellTo.x + 1)
    );
  }
}
