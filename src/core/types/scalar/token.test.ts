import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import { PathReporter } from "io-ts/PathReporter";

import { mapAll } from "../../../test/config/fixtures";
import { TokenType } from "./";

describe("Token scalar", () => {
  const validTokens: unknown[] = ["12345678", "abcdefgh"];
  const invalidTokens: unknown[] = ["", 1];

  it.each(validTokens)("Should validate token properly", (validToken) => {
    pipe(
      validToken,
      TokenType.decode,
      TE.fromEither,
      mapAll((result) => expect(result).toBe(validToken))
    )();
  });

  it.each(invalidTokens)(
    "Should return an error if token is invalid",
    (invalidToken) =>
      expect(PathReporter.report(TokenType.decode(invalidToken))).toEqual([
        "Invalid token.",
      ])
  );
});
