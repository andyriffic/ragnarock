import {
  createPlayerGameMove,
  Paper,
  Player,
  playGame,
  Rock,
  Scissors,
} from "./game";

describe("game", () => {
  describe("playGame", () => {
    const player1: Player = { id: "player1" };
    const player2: Player = { id: "player2" };

    it("Correct result when both players choose Rock", () => {
      const player1Move = createPlayerGameMove(player1, Rock);
      const player2Move = createPlayerGameMove(player2, Rock);

      expect(playGame(player1Move, player2Move)).toEqual({ draw: true });
    });

    it("Correct result when both players choose Paper", () => {
      const player1Move = createPlayerGameMove(player1, Paper);
      const player2Move = createPlayerGameMove(player2, Paper);

      expect(playGame(player1Move, player2Move)).toEqual({ draw: true });
    });

    it("Correct result when both players choose Scissors", () => {
      const player1Move = createPlayerGameMove(player1, Scissors);
      const player2Move = createPlayerGameMove(player2, Scissors);

      expect(playGame(player1Move, player2Move)).toEqual({ draw: true });
    });

    it("Correct result when players1 wins with Rock", () => {
      const player1Move = createPlayerGameMove(player1, Rock);
      const player2Move = createPlayerGameMove(player2, Scissors);

      expect(playGame(player1Move, player2Move)).toEqual({ winner: player1 });
    });

    it("Correct result when players1 wins with Paper", () => {
      const player1Move = createPlayerGameMove(player1, Paper);
      const player2Move = createPlayerGameMove(player2, Rock);

      expect(playGame(player1Move, player2Move)).toEqual({ winner: player1 });
    });

    it("Correct result when players1 wins with Scissors", () => {
      const player1Move = createPlayerGameMove(player1, Scissors);
      const player2Move = createPlayerGameMove(player2, Paper);

      expect(playGame(player1Move, player2Move)).toEqual({ winner: player1 });
    });

    it("Correct result when players2 wins with Rock", () => {
      const player1Move = createPlayerGameMove(player1, Scissors);
      const player2Move = createPlayerGameMove(player2, Rock);

      expect(playGame(player1Move, player2Move)).toEqual({ winner: player2 });
    });

    it("Correct result when players2 wins with Paper", () => {
      const player1Move = createPlayerGameMove(player1, Rock);
      const player2Move = createPlayerGameMove(player2, Paper);

      expect(playGame(player1Move, player2Move)).toEqual({ winner: player2 });
    });

    it("Correct result when players2 wins with Scissors", () => {
      const player1Move = createPlayerGameMove(player1, Paper);
      const player2Move = createPlayerGameMove(player2, Scissors);

      expect(playGame(player1Move, player2Move)).toEqual({ winner: player2 });
    });
  });
});
