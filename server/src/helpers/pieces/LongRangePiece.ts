import Cell from "../Cell.ts";
import Move from "../Move.ts";
import Piece from "./Piece.ts";

export default abstract class LongRangePiece extends Piece {
  protected directions: number[][];
  protected requiredDirection: number[];

  getMoves(): Move[] {
    const possibleMoves: Move[] = [];
    for (const direction of this.directions) {
      for (let i = 1; i <= 7; i++) {
        const [x, y] = [direction[0] * i, direction[1] * i];
        if (this.isPossibleShift(this.cell, x, y)) {
          const cellTo = this.board.field[this.cell.x + x][this.cell.y + y];
          if (this.isPossibleMove(cellTo)) {
            possibleMoves.push(new Move(this, this.cell, cellTo));
            if (this.checkShah(cellTo)) this.requiredDirection = direction;
          } else break;
        } else break;
      }
    }

    return possibleMoves;
  }

  // checkBundle(): void {
  //   const pieces = [];
  //   for (const direction of this.directions) {
  //     for (let i = 1; i <= 7; i++) {
  //       const [x, y] = [direction[0] * i, direction[1] * i];
  //       if (this.isPossibleShift(this.cell, x, y)) {
  //         const cell = this.board.field[this.cell.x + x][this.cell.y + y];
  //         if (cell.piece && cell.piece)
  //       } else break;
  //     }
  //   }
  // }

  getRequiredCells(): Cell[] {
    const requiredCells: Cell[] = [this.cell];
    for (let i = 1; i <= 7; i++) {
      const [x, y] = [this.requiredDirection[0] * i, this.requiredDirection[1] * i];
      if (this.isPossibleShift(this.cell, x, y)) {
        const cellTo = this.board.field[this.cell.x + x][this.cell.y + y];
        if (this.isPossibleMove(cellTo)) requiredCells.push(cellTo);
        else break;
      } else break;
    }
    return requiredCells;
  }
}
