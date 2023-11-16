import Board from "../Board.ts";
import Cell from "../Cell.ts";
import BaseMove from "../move/BaseMove.ts";
import Color from "../enums/color.enum.ts";

export default abstract class Piece {
  public cell: Cell;
  public color: Color;
  public bundleCell: Cell | null;

  constructor(cell: Cell, color: Color) {
    this.cell = cell;
    this.color = color;
  }

  protected isPossibleMove(cell: Cell): boolean {
    return !cell.piece || cell.piece.color !== this.color;
  }

  public checkAttacke(cell: Cell): boolean {
    return cell.piece !== null && cell.piece.color !== this.color;
  }

  public checkShah(cell: Cell): boolean {
    return cell.piece !== null && !cell.piece.checkSide(this.color) && cell.piece.toString().toLowerCase() === "k";
  }

  public checkSide(side: Color): boolean {
    return side === this.color;
  }

  getAttackedCells(board: Board): Cell[] {
    const cells = this.getMoves(board).map((move) => move.cellTo);
    for (const cell of cells) {
      if (cell.piece?.toString().toLowerCase() === "k") {
        board.shahs++;
        board.requaredCells.push(...this.getRequiredCells(board));
        break;
      }
    }
    return cells;
  }

  getRequiredCells(board: Board): Cell[] {
    return [this.cell];
  }

  afterMove(board: Board, move: BaseMove): void {
    return;
  }

  abstract toString(): string;
  abstract getMoves(board: Board): BaseMove[];
}
