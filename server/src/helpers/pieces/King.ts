import Move from "../Move.ts";
import Piece, { Color } from "./Piece.ts";

export default class King extends Piece {
  toString(): string {
    return this.color === Color.White ? "K" : "k";
  }

  getMoves(): Move[] {
    const possibleMoves: Move[] = [];

    for (let i = -1; i < 1; i++) {
      for (let j = -1; j < 1; j++) {
        if (this.isPossibleShift(this.cell, i, j)) {
          const cellTo = this.board.field[this.cell.x + i][this.cell.y + j];
          if (this.isPossibleMove(cellTo) && !cellTo.isAttacked) {
            possibleMoves.push(new Move(this, this.cell, cellTo));
          }
        }
      }
    }

    return possibleMoves;
  }
}
