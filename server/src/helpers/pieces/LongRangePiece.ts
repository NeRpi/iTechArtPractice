import Board from "../Board.ts";
import Cell from "../Cell.ts";
import BaseMove from "../move/BaseMove.ts";
import Move from "../move/Move.ts";
import Piece from "./Piece.ts";

export default abstract class LongRangePiece extends Piece {
  protected directions: number[][];
  protected requiredDirection: number[];

  getMoves(board: Board): BaseMove[] {
    const possibleMoves: BaseMove[] = [];
    let directions = this.directions;

    if (this.bundleCell) {
      directions = [[Math.sign(this.bundleCell.x - this.cell.x), Math.sign(this.bundleCell.y - this.cell.y)]];
      if (!this.directions.some((direction) => `${direction}` === `${directions[0]}`)) return [];
    }

    for (const direction of directions) {
      for (let i = 1; i <= 7; i++) {
        const [dx, dy] = [direction[0] * i, direction[1] * i];
        const cellTo = board.getCellByShift(this.cell, dx, dy);
        if (cellTo) {
          if (this.isPossibleMove(cellTo)) {
            possibleMoves.push(new Move(this, this.cell, cellTo));
            if (this.checkShah(cellTo)) this.requiredDirection = direction;
            if (cellTo.piece) break;
          } else break;
        } else break;
      }
    }

    return possibleMoves;
  }

  checkBundle(board: Board): void {
    let result: Piece | null = null;
    for (const direction of this.directions) {
      let bundlePiece: Piece | null = null;
      for (let i = 1; i <= 7; i++) {
        const [dx, dy] = [direction[0] * i, direction[1] * i];
        const cell = board.getCellByShift(this.cell, dx, dy);
        if (cell) {
          if (cell.piece) {
            if (!cell.piece.checkSide(this.color)) {
              if (cell.piece.toString().toLowerCase() === "k" && bundlePiece) {
                result = bundlePiece;
              } else if (!bundlePiece) {
                bundlePiece = cell.piece;
              } else {
                bundlePiece = null;
                break;
              }
            } else break;
          }
        } else break;
      }
    }

    if (result) result.bundleCell = this.cell;
  }

  getAttackedCells(board: Board): Cell[] {
    this.checkBundle(board);
    return super.getAttackedCells(board);
  }

  getRequiredCells(board: Board): Cell[] {
    const requiredCells: Cell[] = [this.cell];
    for (let i = 1; i <= 7; i++) {
      const [dx, dy] = [this.requiredDirection[0] * i, this.requiredDirection[1] * i];
      const cellTo = board.getCellByShift(this.cell, dx, dy);
      if (cellTo) {
        if (cellTo.piece) break;
        if (this.isPossibleMove(cellTo)) requiredCells.push(cellTo);
        else break;
      } else break;
    }
    return requiredCells;
  }
}
