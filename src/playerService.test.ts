import { pipe } from "fp-ts/lib/function";
import * as T from "fp-ts/lib/Task";
import * as E from "fp-ts/lib/Either";
import * as TE from "fp-ts/lib/TaskEither";
import { lookupPlayer } from "./playerService";

describe("index", () => {
  describe("run", () => {
    it("Fetch player network error maps left", () => {
      pipe(
        lookupPlayer("exception"),
        TE.fold(
          (msg) => TE.of(expect(msg).toEqual("network error")),
          () => {
            throw new Error("Should not get here");
          }
        )
      )();
    });

    it("Fetch unknown player maps left", () => {
      pipe(
        lookupPlayer("player"),
        TE.fold(
          (msg) => TE.of(expect(msg).toEqual("player not found")),
          () => {
            throw new Error("Should not get here");
          }
        )
      )();
    });

    it("Fetch player maps right", () => {
      pipe(
        lookupPlayer("player1"),
        TE.fold(
          (msg) => {
            throw new Error("Should not get here");
          },
          (player) => TE.of(expect(player).toEqual({ id: "player1" }))
        )
      )();
    });
  });
});
