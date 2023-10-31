import Board from "../Board.ts";
import Cell from "../Cell.ts";
import Move from "../Move.ts";

export enum Color {
  White,
  Black
}

export default abstract class Piece {
  public board: Board;
  public cell: Cell;
  protected color: Color;
  public bundleCell: Cell | null;

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

  abstract toString(): string;
  abstract getMoves(): Move[];
}
