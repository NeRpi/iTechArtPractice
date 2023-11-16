import Cell from "../Cell.ts";
import BaseMove from "../move/BaseMove.ts";
import Move from "../move/Move.ts";
import Color from "../enums/color.enum.ts";
import Piece from "./Piece.ts";
import EnPassantMove from "../move/EnPassantMove.ts";
import Board from "../Board.ts";

export default class Pawn extends Piece {
  public dx: number;

  constructor(cell: Cell, color: Color) {
    super(cell, color);
    this.dx = this.color === Color.White ? -1 : 1;
  }

  toString(): string {
    return this.color === Color.White ? "P" : "p";
  }

  getMoves(board: Board): BaseMove[] {
    const posibleMoves: BaseMove[] = [];
    for (let dy = -1; dy <= 1; dy += 2) {
      const cellTo = board.getCellByShift(this.cell, this.dx, dy);
      if (cellTo && this.checkAttacke(cellTo)) {
        posibleMoves.push(new Move(this, this.cell, cellTo));
      }
    }

    let cellTo = board.getCellByShift(this.cell, this.dx, 0);
    if (cellTo?.isEmpty()) {
      posibleMoves.push(new Move(this, this.cell, cellTo));
      if (this.cell.x % 5 === 1) {
        cellTo = board.getCellByShift(this.cell, 2 * this.dx, 0);
        if (cellTo?.isEmpty()) posibleMoves.push(new Move(this, this.cell, cellTo));
      }
    }

    const enpassant = this.getEnPassantMove(board);
    if (enpassant) posibleMoves.push(enpassant);

    return posibleMoves;
  }

  getAttackedCells(board: Board): Cell[] {
    const cells: Cell[] = [];
    for (let dy = -1; dy <= 1; dy += 2) {
      const cell = board.getCellByShift(this.cell, this.dx, dy);
      if (cell) cells.push(cell);
    }
    return cells;
  }

  getEnPassantMove(board: Board): Move | undefined {
    if (board.enpassant && board.enpassant.x === this.cell.x && Math.abs(board.enpassant.y - this.cell.y) === 1) {
      const cellTo = board.getCellByShift(this.cell, this.dx, board.enpassant.y - this.cell.y);
      return cellTo ? new EnPassantMove(this, this.cell, cellTo) : undefined;
    }
  }

  afterMove(board: Board, move: BaseMove): void {
    if (Math.abs(move.cellFrom.x - move.cellTo.x) === 2) board.enpassant = move.cellTo;
    this.afterMove = super.afterMove;
    this.getEnPassantMove = () => undefined;
  }
}
