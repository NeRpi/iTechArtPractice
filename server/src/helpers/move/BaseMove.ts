import Cell from "../Cell.ts";
import Piece from "../pieces/Piece.ts";

export default abstract class BaseMove {
  piece: Piece;
  cellFrom: Cell;
  cellTo: Cell;

  constructor(piece: Piece, cellFrom: Cell, cellTo: Cell) {
    this.piece = piece;
    this.cellFrom = cellFrom;
    this.cellTo = cellTo;
  }

  abstract move(): void;
  abstract toString(): string;
}
