import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import { PathReporter } from "io-ts/PathReporter";

import { mapAll } from "../../config/test/fixtures";
import { PasswordType } from "./";

describe("Password scalar", () => {
  const validPasswords: unknown[] = ["12345678", "abcdefgh"];
  const invalidPasswords: unknown[] = ["1234567", "abcdefg"];

  it.each(validPasswords)(
    "Should validate password properly",
    (validPassword) => {
      pipe(
        validPassword,
        PasswordType.decode,
        TE.fromEither,
        mapAll((result) => expect(result).toBe(validPassword))
      )();
    }
  );

  it.each(invalidPasswords)(
    "Should return an error if password is invalid",
    (invalidPassword) =>
      expect(PathReporter.report(PasswordType.decode(invalidPassword))).toEqual(
        ["Invalid password. Password must contain at least 8 characters."]
      )
  );
});
