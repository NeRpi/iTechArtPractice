import Cell from "./Cell.ts";
import Color from "./enums/color.enum.ts";
import Bishop from "./pieces/Bishop.ts";
import King from "./pieces/King.ts";
import Knight from "./pieces/Knight.ts";
import Pawn from "./pieces/Pawn.ts";
import Queen from "./pieces/Queen.ts";
import Rock from "./pieces/Rock.ts";

export default function getFigureFromString(type: string, cell: Cell): any {
  const figure = {
    K: function () {
      return new King(cell, Color.White);
    },
    Q: function () {
      return new Queen(cell, Color.White);
    },
    R: function () {
      return new Rock(cell, Color.White);
    },
    N: function () {
      return new Knight(cell, Color.White);
    },
    B: function () {
      return new Bishop(cell, Color.White);
    },
    P: function () {
      return new Pawn(cell, Color.White);
    },
    k: function () {
      return new King(cell, Color.Black);
    },
    q: function () {
      return new Queen(cell, Color.Black);
    },
    r: function () {
      return new Rock(cell, Color.Black);
    },
    n: function () {
      return new Knight(cell, Color.Black);
    },
    b: function () {
      return new Bishop(cell, Color.Black);
    },
    p: function () {
      return new Pawn(cell, Color.Black);
    }
  };

  return figure[type as keyof typeof figure] ? figure[type as keyof typeof figure]() : +type;
}
