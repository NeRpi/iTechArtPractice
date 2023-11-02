import Board from "../Board.ts";
import Cell from "../Cell.ts";
import BaseMove from "../move/BaseMove.ts";
import Color from "../enums/color.enum.ts";

export default abstract class Piece {
  public board: Board;
  public cell: Cell;
  public color: Color;
  public bundleCell: Cell | null;

  constructor(board: Board, cell: Cell, color: Color) {
    this.board = board;
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
    return cell.piece?.toString().toLowerCase() === "k";
  }

  public checkSide(side: Color): boolean {
    return side === this.color;
  }

  getAttackedCells(): Cell[] {
    const cells = this.getMoves().map((move) => move.cellTo);
    for (const cell of cells) {
      if (cell.piece?.toString().toLowerCase() === "k") {
        this.board.shahs++;
        this.board.requaredCells.push(...this.getRequiredCells());
        break;
      }
    }
    return cells;
  }

  getRequiredCells(): Cell[] {
    return [this.cell];
  }

  afterMove(move: BaseMove): void {
    return;
  }

  abstract toString(): string;
  abstract getMoves(): BaseMove[];
}
