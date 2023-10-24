import Move from "../Move.ts";
import Piece, { Color } from "./Piece.ts";

export default class Knight extends Piece {
  toString(): string {
    return this.color === Color.White ? "N" : "n";
  }

  getMoves(): Move[] {
    const possibleMoves: Move[] = [];

    const shifts = [
      [-2, -1],
      [-2, 1],
      [-1, -2],
      [-1, 2],
      [1, -2],
      [1, 2],
      [2, -1],
      [2, 1]
    ];

    for (const shift of shifts) {
      if (this.isPossibleShift(this.cell, shift[0], shift[1])) {
        const cellTo = this.board.field[this.cell.x + shift[0]][this.cell.y + shift[1]];
        if (this.isPossibleMove(cellTo)) {
          possibleMoves.push(new Move(this, this.cell, cellTo));
        }
      }
    }

    return possibleMoves;
  }
}
