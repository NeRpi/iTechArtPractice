import BaseMove from "../move/BaseMove.ts";
import Move from "../move/Move.ts";
import Color from "../enums/color.enum.ts";
import Piece from "./Piece.ts";

export default class Knight extends Piece {
  toString(): string {
    return this.color === Color.White ? "N" : "n";
  }

  getMoves(): BaseMove[] {
    if (this.bundleCell) return [];

    const possibleMoves: BaseMove[] = [];
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
      const cellTo = this.board.getCellByShift(this.cell, shift[0], shift[1]);
      if (cellTo && this.isPossibleMove(cellTo)) possibleMoves.push(new Move(this, this.cell, cellTo));
    }

    return possibleMoves;
  }
}
