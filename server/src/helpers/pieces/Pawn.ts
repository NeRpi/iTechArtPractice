import Cell from "../Cell.ts";
import Move from "../Move.ts";
import Piece, { Color } from "./Piece.ts";

export default class Pawn extends Piece {
  toString(): string {
    return this.color === Color.White ? "P" : "p";
  }

  getMoves(): Move[] {
    const diraction = this.color === Color.White ? -1 : 1;
    const cellTo = this.board.field[this.cell.x + diraction][this.cell.y];
    return this.isPossibleMove(cellTo) ? [new Move(this, this.cell, cellTo)] : [];
  }

  getAttacke(): Move[] {
    const diraction = this.color === Color.White ? -1 : 1;
    const moves = [-1, 1]
      .filter(
        (d) =>
          this.isPossibleShift(this.cell, diraction, d) &&
          this.isPossibleMove(new Cell(this.cell.x + d, this.cell.y + d))
      )
      .map((d) => new Move(this, this.cell, new Cell(this.cell.x + d, this.cell.y + d)));
    return moves;
  }
}
