import Board from "./Board.ts";

describe("Chess", () => {
  let board = new Board();

  beforeEach(() => {
    board = new Board();
  });

  describe("Fen", () => {
    it("Checking set and get FEN anotation", () => {
      board.fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
      expect(board.fen).toEqual("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
    });
  });

  describe("Get moves", () => {
    it("Checking getting all moves", () => {
      board.initFigure();
      board.startGame();
      expect(board.getMoves()).toHaveLength(12);
    });

    it("Checking getting moves long range pieces", () => {
      board.fen = "8/8/8/8/8/n7/8/R3k3";
      board.startGame();
      expect(board.getMoves()).toHaveLength(6);
    });
  });

  describe("Moves king", () => {
    it("Checking getting valid moves of King", () => {
      board.fen = "3q4/8/8/8/8/8/8/4K3";
      board.startGame();
      expect(board.getMoves()).toHaveLength(3);
    });
  });

  describe("Shah", () => {
    it("Checking the receipt of codes during the Rock check", () => {
      board.fen = "8/8/8/8/8/4Q3/8/r6K";
      board.startGame();
      expect(board.getMoves()).toHaveLength(5);
    });

    it("Checking the receipt of codes during the Knight check", () => {
      board.fen = "8/8/8/8/6N1/4Q3/5n2/7K";
      board.startGame();
      expect(board.getMoves()).toHaveLength(5);
    });
  });

  describe("Bundle", () => {
    it("Checking bundle long range piece by long range pieces", () => {
      board.fen = "8/8/8/8/7r/8/7Q/7K";
      board.startGame();
      expect(board.getMoves()).toHaveLength(3);
    });

    it("Checking bundle piece by long range pieces", () => {
      board.fen = "8/8/8/8/7r/8/7N/7K";
      board.startGame();
      expect(board.getMoves()).toHaveLength(2);
    });
  });
});
