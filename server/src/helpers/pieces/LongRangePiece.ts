import Cell from "../Cell.ts";
import BaseMove from "../move/BaseMove.ts";
import Move from "../move/Move.ts";
import Piece from "./Piece.ts";

export default abstract class LongRangePiece extends Piece {
  protected directions: number[][];
  protected requiredDirection: number[];

  getMoves(): BaseMove[] {
    const possibleMoves: BaseMove[] = [];
    for (const direction of this.directions) {
      for (let i = 1; i <= 7; i++) {
        const [x, y] = [direction[0] * i, direction[1] * i];
        const cellTo = this.board.getCellByShift(this.cell, x, y);
        if (cellTo) {
          if (this.isPossibleMove(cellTo)) {
            possibleMoves.push(new Move(this, this.cell, cellTo));
            if (this.checkShah(cellTo)) this.requiredDirection = direction;
            if (cellTo.piece) break;
          } else break;
        } else break;
      }
    }

    return this.bundleCell ? possibleMoves.filter((move) => move.cellTo === this.bundleCell) : possibleMoves;
  }

  checkBundle(): void {
    let bundlePiece: Piece | null = null;
    main_loop: for (const direction of this.directions) {
      for (let i = 1; i <= 7; i++) {
        const [x, y] = [direction[0] * i, direction[1] * i];
        const cell = this.board.getCellByShift(this.cell, x, y);
        if (cell) {
          if (cell.piece) {
            if (cell.piece.checkSide(this.color) || cell.piece.toString().toLowerCase() === "k") break main_loop;
            else if (!bundlePiece) bundlePiece = cell.piece;
            else {
              bundlePiece = null;
              break main_loop;
            }
          }
        } else break;
      }
    }

    if (bundlePiece) bundlePiece.bundleCell = this.cell;
  }

  getAttackedCells(): Cell[] {
    this.checkBundle();
    return super.getAttackedCells();
  }

  getRequiredCells(): Cell[] {
    const requiredCells: Cell[] = [this.cell];
    for (let i = 1; i <= 7; i++) {
      const [x, y] = [this.requiredDirection[0] * i, this.requiredDirection[1] * i];
      const cellTo = this.board.getCellByShift(this.cell, x, y);
      if (cellTo) {
        if (cellTo.piece) break;
        if (this.isPossibleMove(cellTo)) requiredCells.push(cellTo);
        else break;
      } else break;
    }
    return requiredCells;
  }
}
