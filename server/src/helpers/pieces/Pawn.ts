import Move from "../Move.ts";
import Piece, { Color } from "./Piece.ts";

export default class Pawn extends Piece {
  toString(): string {
    return this.color === Color.White ? "P" : "p";
  }

  getMoves(): Move[] {
    const cellTo = this.board.field[this.cell.x + 1][this.cell.y];
    return this.isPossibleMove(cellTo) ? [new Move(this, this.cell, cellTo)] : [];
  }
}
