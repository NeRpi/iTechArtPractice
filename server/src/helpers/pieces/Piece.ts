import Board from "../Board.ts";
import Cell from "../Cell.ts";
import Move from "../Move.ts";

export enum Color {
  Black,
  White
}

export default abstract class Piece {
  public board: Board;
  public cell: Cell;
  protected color: Color;

  constructor(board: Board, cell: Cell, color: Color) {
    this.board = board;
    this.cell = cell;
    this.color = color;
  }

  protected isPossibleMove(cell: Cell): boolean {
    return !cell.piece || cell.piece.color !== this.color;
  }

  protected isPossibleShift(cell: Cell, x: number, y: number): boolean {
    return cell.x + x >= 0 && cell.x + x < 8 && cell.y + y >= 0 && cell.y + y < 8;
  }

  abstract toString(): string;
  abstract getMoves(): Move[];
}
