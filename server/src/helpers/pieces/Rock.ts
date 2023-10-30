import Move from "../Move.ts";
import Piece, { Color } from "./Piece.ts";

export default class Rock extends Piece {
  toString(): string {
    return this.color === Color.White ? "R" : "r";
  }

  getMoves(): Move[] {
    const possibleMoves: Move[] = [];
    const directions = [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0]
    ];

    for (const direction of directions) {
      for (let i = 1; i <= 7; i++) {
        const [x, y] = [direction[0] * i, direction[1] * i];
        if (this.isPossibleShift(this.cell, x, y)) {
          const cellTo = this.board.field[this.cell.x + x][this.cell.y + y];
          if (this.isPossibleMove(cellTo)) possibleMoves.push(new Move(this, this.cell, cellTo));
          else break;
        } else break;
      }
    }

    return possibleMoves;
  }

  getAttacke(): Move[] {
    return this.getMoves();
  }
}
