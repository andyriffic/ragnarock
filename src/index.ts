import { Either } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { of as ofTask } from "fp-ts/lib/Task";
import { fold, getOrElse, map, mapLeft } from "fp-ts/lib/TaskEither";
import * as E from "fp-ts/lib/Either";
import { Player } from "./game";
import { getPlayer, networkError } from "./playerService";

const handleUserError = (msg: string) =>
  console.log("Error fetching player", msg);

const handleUserNotFound = (msg: string) => {
  console.log("Player not found", msg);
};

const handleUserSuccess = (playerOrErrorMsg: Either<string, Player>) =>
  pipe(
    playerOrErrorMsg,
    E.fold(
      (e) => console.log("error", e),
      (player) => console.log("Player", player)
    )
  );

function run() {
  pipe(
    getPlayer("player1"),
    mapLeft((e) => networkError(e)),
    fold(
      (error) => ofTask(console.log("error", error)),
      (playerOrErrorMsg) =>
        ofTask(
          pipe(
            playerOrErrorMsg,
            E.fold(
              (msg) => console.log("Player not found", msg),
              (player) => console.log("Player", player)
            )
          )
        )
    )
  )();

  // getStuff(
  //     "https://ghibliapi.herokuapp.com/films/58611129-2dbc-4a81-a72f-77ddfc1b1b49"
  //   ),
  //   TE.mapLeft(e => netError(e)),
  //   TE.chain(validate),
  //   TE.map(film => film.title), // for better display of data, also note the auto completion
  //   TE.fold(
  //     e => T.of(renderError(name1, e)),
  //     pokemon => T.of(renderSuccess(name1, pokemon))
  //   )

  //   pipe(
  //     getPlayer("player1"),
  //     fold(
  //       (msg) => ofTask(handleUserError(msg)),
  //       (playerOrErrorMsg) =>
  //         ofTask(
  //           pipe(
  //             playerOrErrorMsg,
  //             E.fold(
  //               (msg) => console.log("Player not found", msg),
  //               (player) => console.log("Player", player)
  //             )
  //           )
  //         )
  //     )
  //   )();
}

run();
