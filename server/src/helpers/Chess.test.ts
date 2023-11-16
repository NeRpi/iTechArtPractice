import Board from "./Board.ts";
import EnPassantMove from "./move/EnPassantMove.ts";

describe("Chess", () => {
  let board = new Board();

  beforeEach(() => {
    board = new Board();
  });

  describe("Fen", () => {
    it("Checking set and get FEN anotation", () => {
      board.fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 0";
      expect(board.fen).toEqual("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 0");
    });
  });

  describe("Get moves", () => {
    it("Checking getting all moves", () => {
      board.initFigure();
      board.startGame();
      expect(board.getMoves()).toHaveLength(20);
    });

    it("Checking getting moves long range pieces", () => {
      board.fen = "8/8/8/8/8/n7/8/R3k3 w KQkq - 0 0";
      board.startGame();
      expect(board.getMoves()).toHaveLength(6);
    });
  });

  describe("Moves king", () => {
    it("Checking getting valid moves of King", () => {
      board.fen = "3q4/8/8/8/8/8/8/4K3 w - - 0 0";
      board.startGame();
      expect(board.getMoves()).toHaveLength(3);
    });
  });

  describe("Shah", () => {
    it("Checking the receipt of codes during the Rock check", () => {
      board.fen = "8/8/8/8/8/4Q3/8/r6K w - - 0 0";
      board.startGame();
      expect(board.getMoves()).toHaveLength(5);
    });

    it("Checking the receipt of codes during the Knight check", () => {
      board.fen = "8/8/8/8/6N1/4Q3/5n2/7K w - - 0 0";
      board.startGame();
      expect(board.getMoves()).toHaveLength(5);
    });
  });

  describe("Bundle", () => {
    it("Checking bundle long range piece by long range pieces", () => {
      board.fen = "8/8/8/8/7r/8/7Q/7K w - - 0 0";
      board.startGame();
      expect(board.getMoves()).toHaveLength(4);
    });

    it("Checking bundle long range piece by long range pieces", () => {
      board.fen = "8/8/8/8/7r/8/7B/7K w - - 0 0";
      board.startGame();
      expect(board.getMoves()).toHaveLength(2);
    });

    it("Checking bundle piece by long range pieces", () => {
      board.fen = "8/8/8/8/7r/8/7N/7K w - - 0 0";
      board.startGame();
      expect(board.getMoves()).toHaveLength(2);
    });

    it("Checking bundle long range piece by long range pieces", () => {
      board.fen = "8/8/8/8/7r/8/7Q/8 w - - 0 0";
      board.startGame();
      expect(board.getMoves()).toHaveLength(17);
    });
  });

  describe("Castling", () => {
    it("Checking castlings", () => {
      board.fen = "R3K2R/PPPPPPPP/8/8/8/8/8/8 w KQ - 0 0";
      board.startGame();
      const moves = board.getMoves();
      expect(moves.map((move) => move.toString())).toContain("0-0");
      expect(moves.map((move) => move.toString())).toContain("0-0-0");
      const castling = moves.find((move) => move.toString() === "0-0")!;
      board.movePiece(castling);
      expect(board.fen).toEqual("R4RK1/PPPPPPPP/8/8/8/8/8/8 b - - 0 0");
    });
  });

  describe("En passant", () => {
    it("Checking en passant moves", () => {
      board.fen = "8/8/8/8/Pp6/8/8/8 w - b5 0 0";
      board.startGame();
      const moves = board.getMoves();
      expect(moves).toHaveLength(2);
      const enpassant = moves.find((move) => move instanceof EnPassantMove);
      if (enpassant) board.movePiece(enpassant);
      expect(board.fen).toEqual("8/8/8/1P6/8/8/8/8 b - - 0 0");
    });

    it("Checking set en passant moves ", () => {
      board.fen = "8/8/8/8/1p6/8/P7/8 w - - 0 0";
      board.startGame();
      let moves = board.getMoves();
      expect(moves).toHaveLength(2);
      board.movePiece(moves[1]);
      expect(board.fen).toEqual("8/8/8/8/Pp6/8/8/8 b - a5 0 0");
      moves = board.getMoves();
      expect(moves).toHaveLength(2);
      expect(moves.map((move) => move.toString())).toContain("bxa6");
      board.movePiece(moves[0]);
      expect(board.fen).toEqual("8/8/8/8/P7/1p6/8/8 w - - 0 1");
    });
  });
});
