import { Either } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { of as ofTask } from "fp-ts/lib/Task";
import { fold, getOrElse, map } from "fp-ts/lib/TaskEither";
import * as E from "fp-ts/lib/Either";
import { Player } from "./game";
import { getPlayer } from "./playerService";

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
  //   getOrElse(() => of(null))(getPlayer("player1"));

  //   pipe(
  //     getPlayer("player1"),
  //     getOrElse(() => of("")),
  //     fold(
  //       (msg) => of(handleUserError(msg)),
  //       getOrElse(
  //         (msg) => of(handleUserNotFound(msg)),
  //         (player) => of(handleUserSucess(player))
  //       )
  //     )
  //   )();

  pipe(
    getPlayer("player1"),
    fold(
      (msg) => ofTask(handleUserError(msg)),
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
}

run();
