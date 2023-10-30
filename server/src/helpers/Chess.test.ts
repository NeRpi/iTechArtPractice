import Board from "./Board.ts";

describe("Chess", () => {
  let board = new Board();

  beforeEach(() => {
    board = new Board();
  });

  describe("Fen", () => {
    it("Set fen", () => {
      board.fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
      expect(board.fen).toEqual("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
    });
  });

  describe("Get moves", () => {
    board.initFigure();
    board.startGame();
    expect(board.getMoves()).toHaveLength(12);
  });

  describe("Moves king", () => {
    board.fen = "3q4/8/8/8/8/8/8/4K3";
    board.startGame();
    expect(board.getMoves()).toHaveLength(3);
  });
});
