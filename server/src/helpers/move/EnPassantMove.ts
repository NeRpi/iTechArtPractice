import Board from "../Board.ts";
import BaseMove from "./BaseMove.ts";

export default class EnPassantMove extends BaseMove {
  move(board: Board): void {
    this.cellFrom.piece = null;
    this.cellTo.piece = this.piece;
    this.piece.cell = this.cellTo;
    const cell = board.getCell(this.cellFrom.x, this.cellTo.y);
    if (cell) cell.piece = null;
    this.piece.afterMove(board, this);
  }

  toString(): string {
    return (
      String.fromCharCode(97 + this.cellFrom.y) + "x" + String.fromCharCode(97 + this.cellTo.y) + (this.cellTo.x + 1)
    );
  }
}
