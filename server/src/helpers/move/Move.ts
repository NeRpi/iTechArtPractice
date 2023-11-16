import Board from "../Board.ts";
import BaseMove from "./BaseMove.ts";

export default class Move extends BaseMove {
  move(board: Board): void {
    this.cellFrom.piece = null;
    this.cellTo.piece = this.piece;
    this.piece.cell = this.cellTo;
    this.piece.afterMove(board, this);
  }

  toString(): string {
    if (!this.cellTo) console.log(this.piece, this.cellFrom);
    return (
      this.piece +
      String.fromCharCode(97 + this.cellFrom.y) +
      (this.cellFrom.x + 1) +
      String.fromCharCode(97 + this.cellTo.y) +
      (this.cellTo.x + 1)
    );
  }
}
