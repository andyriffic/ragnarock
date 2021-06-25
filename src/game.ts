export interface Player {
  id: string;
}

export type MoveName = "Rock" | "Paper" | "Scissors";

export interface Move {
  name: MoveName;
  beats: MoveName;
}

export const Rock: Move = {
  name: "Rock",
  beats: "Scissors",
};

export const Paper: Move = {
  name: "Paper",
  beats: "Rock",
};

export const Scissors: Move = {
  name: "Scissors",
  beats: "Paper",
};

export interface PlayerGameMove {
  player: Player;
  move: Move;
}

export interface GameResult {
  winner?: Player;
  draw?: boolean;
}

export function createPlayerGameMove(
  player: Player,
  move: Move
): PlayerGameMove {
  return {
    player,
    move,
  };
}

export function playGame(
  player1: PlayerGameMove,
  player2: PlayerGameMove
): GameResult {
  if (player1.move === player2.move) {
    return {
      draw: true,
    };
  }

  const winningPlayer =
    player1.move.beats === player2.move.name ? player1.player : player2.player;

  return {
    winner: winningPlayer,
  };
}
