import Piece from "./pieces/Piece.ts";

export default class Cells {
  readonly x: number;
  readonly y: number;
  public piece: Piece | null;
  isAttacked: boolean;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.piece = null;
  }
}
