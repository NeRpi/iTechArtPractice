import Board from "./Board.ts";
import Cell from "./Cell.ts";
import getFigureFromString from "./PieceFactory.ts";
import Color from "./enums/color.enum.ts";

const allCastlings = ["K", "Q", "k", "q"];

export default class FenParser {
  static getFen(board: Board): string {
    let fen = "";
    for (const row of board.getField()) {
      let emptyCells = 0;
      for (const cell of row) {
        if (cell.piece) {
          fen += cell.piece ? (emptyCells || "") + cell.piece.toString() : "";
          emptyCells = 0;
        } else emptyCells++;
      }
      fen += (emptyCells || "") + "/";
    }

    const castlings = board.castlings.reduce((acc, val, index) => (acc += val ? allCastlings[index] : ""), "");
    fen = [
      fen.slice(0, -1),
      board.side.valueOf(),
      castlings === "" ? "-" : castlings,
      board.enpassant ? board.enpassant?.toString() : "-",
      board.halfmove,
      board.fullmove
    ].join(" ");

    return fen;
  }

  static getByFen(fen: string, board: Board): void {
    board.initField();
    const [field, side, castlings, enpassant, halfmove, fullmove] = fen.split(" ");
    board.side = side === "w" ? Color.White : Color.Black;
    board.castlings = allCastlings.map((castling) => castlings.includes(castling));
    board.halfmove = +halfmove;
    board.fullmove = +fullmove;

    const pieces: string[] = field.split("/");

    for (const [x, row] of pieces.entries()) {
      let y = 0;
      for (const figure of row) {
        const cell = new Cell(x, y);
        const result = getFigureFromString(figure, board, cell);
        if (typeof result === "number") {
          y += result;
        } else {
          cell.piece = result;
          board.setCell(cell, x, y);
          y++;
        }
      }
    }

    const enpassantCell = board.getCell(+enpassant[1] - 1, enpassant.charCodeAt(0) - 97);
    board.enpassant = enpassant === "-" && enpassantCell ? null : enpassantCell!;
  }
}
