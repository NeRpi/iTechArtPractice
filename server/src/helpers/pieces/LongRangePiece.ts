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
        if (this.isPossibleShift(this.cell, x, y)) {
          const cell = this.board.field[this.cell.x + x][this.cell.y + y];
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
      if (this.isPossibleShift(this.cell, x, y)) {
        const cellTo = this.board.field[this.cell.x + x][this.cell.y + y];
        if (cellTo.piece) break;
        if (this.isPossibleMove(cellTo)) requiredCells.push(cellTo);
        else break;
      } else break;
    }
    return requiredCells;
  }
}
