import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import { PathReporter } from "io-ts/PathReporter";

import { mapAll } from "../../test/config/fixtures";
import { UserType } from "./";

describe("User type", () => {
  const validUsers: unknown[] = [
    {
      email: "john@mail.com",
      username: "john",
    },
  ];

  const invalidUsers: unknown[] = [
    {},
    {
      email: "invalid-email.com",
      username: "j",
    },
  ];

  it.each(validUsers)("Should validate user properly ", (validUser) => {
    pipe(
      validUser,
      UserType.decode,
      TE.fromEither,
      mapAll((result) => expect(result).toBe(validUser))
    )();
  });

  it.each(invalidUsers)(
    "Should return an error if user is invalid",
    (invalidUser) => {
      expect(PathReporter.report(UserType.decode(invalidUser))).toEqual([
        "Invalid email.",
        "Invalid slug. Please, use alphanumeric characters, dash and/or numbers.",
      ]);
    }
  );
});
