import { Either, fromNullable } from "fp-ts/lib/Either";
import { TaskEither, tryCatch } from "fp-ts/lib/TaskEither";
import { Player } from "./game";

const players: Player[] = [{ id: "player1" }];

export function getPlayer(
  id: string
): TaskEither<string, Either<string, Player>> {
  return tryCatch<string, Either<string, Player>>(
    () =>
      Promise.resolve(
        fromNullable("Player not found")(players.find((p) => p.id === id))
      ),
    (reason) => `failed to get user: ${reason}`
  );
}
