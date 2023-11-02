import Cell from "./Cell.ts";
import FenParser from "./FenParser.ts";
import BaseMove from "./move/BaseMove.ts";
import Color from "./enums/color.enum.ts";
import King from "./pieces/King.ts";

export default class Board {
  protected field: Cell[][];
  side: Color;
  shahs: number;
  requaredCells: Cell[];
  castlings: boolean[];
  enpassant: Cell | null;
  halfmove: number;
  fullmove: number;

  constructor() {
    this.initField();
  }

  initField() {
    this.field = Array.from(Array(8), (row, x) => Array.from(Array(8), (cell, y) => new Cell(x, y)));
    this.requaredCells = [];
  }

  initFigure() {
    this.fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 0";
  }

  startGame() {
    this.setAttackedCells();
  }

  movePiece(move: BaseMove) {
    move.move();
    this.fullmove++;
    this.changeSide();
  }

  changeSide(): void {
    this.side = this.side === Color.Black ? Color.White : Color.Black;
    this.setAttackedCells();
  }

  clearStates(): void {
    this.requaredCells = [];
    this.shahs = 0;
    this.enpassant = !this.enpassant?.piece || this.side === this.enpassant.piece?.color ? null : this.enpassant;
    this.field.forEach((row) =>
      row.forEach((cell) => {
        cell.isAttacked = false;
        if (cell.piece) cell.piece.bundleCell = null;
      })
    );
  }

  setAttackedCells(): void {
    this.clearStates();
    const cells: Cell[] = [];
    for (const row of this.field) {
      for (const cell of row) {
        if (cell.piece && !cell.piece.checkSide(this.side)) cells.push(...cell.piece.getAttackedCells());
      }
    }
    cells.forEach((cell) => (cell.isAttacked = true));
  }

  getMoves(): BaseMove[] {
    let moves: BaseMove[] = [];
    let kingMoves: BaseMove[] = [];
    for (const row of this.field) {
      for (const cell of row) {
        if (cell.piece && cell.piece.checkSide(this.side)) {
          moves.push(...cell.piece.getMoves());
          if (cell.piece instanceof King) kingMoves = cell.piece.getMoves();
        }
      }
    }

    if (this.shahs === 1) {
      moves = [...moves.filter((move) => this.requaredCells.includes(move.cellTo)), ...kingMoves];
    } else if (this.shahs === 2) {
      moves = kingMoves;
    }

    return moves;
  }

  getField() {
    return this.field;
  }

  setCell(cell: Cell, x: number, y: number): void {
    if (x >= 0 && x < 8 && y >= 0 && y < 8) this.field[x][y] = cell;
  }

  getCell(x: number, y: number): Cell | undefined {
    if (x >= 0 && x < 8 && y >= 0 && y < 8) return this.field[x][y];
  }

  getCellByShift(cellFrom: Cell, x: number, y: number): Cell | undefined {
    if (cellFrom.x + x >= 0 && cellFrom.x + x < 8 && cellFrom.y + y >= 0 && cellFrom.y + y < 8)
      return this.field[cellFrom.x + x][cellFrom.y + y];
  }

  set fen(fen: string) {
    FenParser.getByFen(fen, this);
  }

  get fen(): string {
    return FenParser.getFen(this);
  }
}
