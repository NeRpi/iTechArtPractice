import CastlingMove from "../move/CastlingMove.ts";
import BaseMove from "../move/BaseMove.ts";
import Move from "../move/Move.ts";
import Color from "../enums/color.enum.ts";
import Piece from "./Piece.ts";
import Rock from "./Rock.ts";
import Board from "../Board.ts";

export default class King extends Piece {
  toString(): string {
    return this.color === Color.White ? "K" : "k";
  }

  getMoves(board: Board): BaseMove[] {
    const possibleMoves: BaseMove[] = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const cellTo = board.getCellByShift(this.cell, i, j);
        if (cellTo && this.isPossibleMove(cellTo) && !cellTo.isAttacked)
          possibleMoves.push(new Move(this, this.cell, cellTo));
      }
    }

    possibleMoves.push(...this.getCastlings(board));
    return possibleMoves;
  }

  getCastlings(board: Board): BaseMove[] {
    const sideCastlings = this.color === Color.White ? 0 : 2;
    const availableCatlings = [board.castlings[sideCastlings], board.castlings[sideCastlings + 1]];
    const moves: CastlingMove[] = [];

    availableCatlings.forEach((isCastling, index) => {
      const duration = index === 1 ? -1 : 1;
      for (let i = 1; i < 3 + index && availableCatlings[index]; i++) {
        const cellTo = board.getCellByShift(this.cell, 0, duration * i);
        if (cellTo && (cellTo.piece || cellTo.isAttacked)) availableCatlings[index] = false;
      }
    });

    availableCatlings.forEach((isCastling, index) => {
      if (isCastling) {
        const castlingMove = this.createCastlingMove(board, sideCastlings + index);
        if (castlingMove) moves.push(castlingMove);
      }
    });

    return moves;
  }

  createCastlingMove(board: Board, sideCastlings: number): CastlingMove | undefined {
    const [argCastlings, typeCastling] = sideCastlings % 2 === 0 ? [[7, 5, 6], "0-0"] : [[0, 3, 2], "0-0-0"];
    const kingCellTo = board.getCell(this.cell.x, argCastlings[2])!;
    const rockCell = board.getCell(this.cell.x, argCastlings[0])!;
    const rockCellTo = board.getCell(this.cell.x, argCastlings[1])!;
    const rock = rockCell.piece;
    if (rock && rock instanceof Rock) {
      return new CastlingMove(this, this.cell, kingCellTo, rock, rockCell, rockCellTo, typeCastling);
    } else board.castlings[sideCastlings] = false;
  }

  afterMove(board: Board, move: BaseMove): void {
    const sideCastlings = this.color === Color.White ? 0 : 2;
    board.castlings[sideCastlings] = false;
    board.castlings[sideCastlings + 1] = false;
    console.log(board.castlings);
    this.afterMove = super.afterMove;
    this.getCastlings = () => [];
  }
}
