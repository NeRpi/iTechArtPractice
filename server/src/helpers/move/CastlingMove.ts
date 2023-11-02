import Cell from "../Cell.ts";
import BaseMove from "./BaseMove.ts";
import King from "../pieces/King.ts";
import Rock from "../pieces/Rock.ts";

export default class CastlingMove extends BaseMove {
  rock: Rock;
  typeCastling: string;
  cellRockFrom: Cell;
  cellRockTo: Cell;

  constructor(
    king: King,
    cellFrom: Cell,
    cellTo: Cell,
    rock: Rock,
    cellRockFrom: Cell,
    cellRockTo: Cell,
    typeCastling: string
  ) {
    super(king, cellFrom, cellTo);
    this.rock = rock;
    this.typeCastling = typeCastling;
    this.cellRockFrom = cellRockFrom;
    this.cellRockTo = cellRockTo;
  }

  move() {
    this.cellFrom.piece = null;
    this.cellTo.piece = this.piece;
    this.piece.cell = this.cellTo;
    this.cellRockFrom.piece = null;
    this.cellRockTo.piece = this.rock;
    this.rock.cell = this.cellRockTo;
    this.piece.afterMove(this);
  }

  toString(): string {
    return this.typeCastling;
  }
}
