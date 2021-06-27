import { flow, pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/lib/TaskEither";
import * as T from "fp-ts/lib/Task";
import * as E from "fp-ts/lib/Either";
import { Player } from "./game";

const players: Player[] = [{ id: "player1" }];

export type FetchPlayerError = { type: "NetError"; message: string };

export function networkError(e: Error): FetchPlayerError {
  return {
    type: "NetError",
    message: e.message,
  };
}

// https://codesandbox.io/s/github/zanza00/learn-fp-ts/tree/master/examples/taskeither/with-io-ts?module=/src/example.ts&file=/src/example.ts:691-974
export function getPlayer(
  id: string
): TE.TaskEither<Error, E.Either<string, Player>> {
  return TE.tryCatch(
    () =>
      id === "exception"
        ? Promise.reject("network error")
        : Promise.resolve(
            E.fromNullable("player not found")(players.find((p) => p.id === id))
          ),
    E.toError
  );
}

type Blah = {
  message: string;
};

function blah(message: string): Blah {
  return {
    message,
  };
}

export function lookupPlayer(id: string): T.Task<E.Either<string, Player>> {
  return pipe(
    id,
    getPlayer,
    TE.mapLeft((e) => networkError(e)),
    TE.fold(
      (error) => T.of(E.left(error.message)),
      pipe(
        E.fold(
          (msg) => T.of(E.left(msg)),
          (player) => T.of(E.right(player))
        )
      )
    )
  );
}

// export function getPlayer(
//   id: string
// ): TaskEither<string, Either<string, Player>> {
//   return tryCatch<string, Either<string, Player>>(
//     () =>
//       Promise.resolve(
//         fromNullable("Player not found")(players.find((p) => p.id === id))
//       ),
//     (reason) => `failed to get user: ${reason}`
//   );
// }
