import Cell from "./Cell.ts";
import Move from "./Move.ts";
import Bishop from "./pieces/Bishop.ts";
import King from "./pieces/King.ts";
import Knight from "./pieces/Knight.ts";
import Pawn from "./pieces/Pawn.ts";
import Piece, { Color } from "./pieces/Piece.ts";
import Queen from "./pieces/Queen.ts";
import Rock from "./pieces/Rock.ts";

function getFigureFromString(type: string, field: Board, cell: Cell): any {
  const figure = {
    K: function () {
      return new King(field, cell, Color.White);
    },
    Q: function () {
      return new Queen(field, cell, Color.White);
    },
    R: function () {
      return new Rock(field, cell, Color.White);
    },
    N: function () {
      return new Knight(field, cell, Color.White);
    },
    B: function () {
      return new Bishop(field, cell, Color.White);
    },
    P: function () {
      return new Pawn(field, cell, Color.White);
    },
    k: function () {
      return new King(field, cell, Color.Black);
    },
    q: function () {
      return new Queen(field, cell, Color.Black);
    },
    r: function () {
      return new Rock(field, cell, Color.Black);
    },
    n: function () {
      return new Knight(field, cell, Color.Black);
    },
    b: function () {
      return new Bishop(field, cell, Color.Black);
    },
    p: function () {
      return new Pawn(field, cell, Color.Black);
    }
  };

  return figure[type as keyof typeof figure] ? figure[type as keyof typeof figure]() : +type;
}

export default class Board {
  field: Cell[][];
  side: Color;
  shahs: number;
  requaredCells: Cell[];

  constructor() {
    this.initField();
  }

  initField() {
    this.field = Array.from(Array(8), (row, x) => Array.from(Array(8), (cell, y) => new Cell(x, y)));
    this.requaredCells = [];
  }

  initFigure() {
    this.fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
  }

  startGame() {
    this.side = Color.Black;
    this.changeSide();
  }

  movePiece(piece: Piece, cellFrom: Cell, cellTo: Cell) {
    cellFrom.piece = null;
    cellTo.piece = piece;
    piece.cell = cellTo;
    this.changeSide();
  }

  changeSide(): void {
    this.field.forEach((row) => row.forEach((cell) => (cell.isAttacked = false)));
    this.requaredCells = [];
    this.shahs = 0;
    const cells: Cell[] = [];
    for (const row of this.field) {
      for (const cell of row) {
        if (cell.piece && cell.piece.checkSide(this.side)) cells.push(...cell.piece.getAttackedCells());
      }
    }

    cells.forEach((cell) => (cell.isAttacked = true));
    this.side = this.side === Color.Black ? Color.White : Color.Black;
  }

  getMoves(): Move[] {
    let moves: Move[] = [];
    let kingMoves: Move[] = [];
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

  set fen(fen: string) {
    this.initField();
    const rows: string[] = fen.split("/");
    for (const [index, row] of rows.entries()) {
      let step = 0;
      for (const figure of row) {
        const cell = new Cell(index, step);
        const result = getFigureFromString(figure, this, cell);
        if (typeof result === "number") {
          step += result;
        } else {
          cell.piece = result;
          this.field[index][step] = cell;
          step++;
        }
      }
    }
  }

  get fen(): string {
    let fen = "";
    for (const row of this.field) {
      let emptyCells = 0;
      for (const cell of row) {
        if (cell.piece) {
          fen += cell.piece ? emptyCells || "" + cell.piece : "";
          emptyCells = 0;
        } else emptyCells++;
      }
      fen += (emptyCells || "") + "/";
    }
    return fen.slice(0, -1);
  }
}
