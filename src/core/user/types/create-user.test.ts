import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import { PathReporter } from "io-ts/PathReporter";

import { mapAll } from "../../../config/test/fixtures";
import { CreateUserType } from "./";

describe("CreateUser type", () => {
  const validCreateUsers: unknown[] = [
    {
      email: "john@mail.com",
      password: "12345678",
      username: "any-username",
    },
  ];

  const invalidCreateUsers: unknown[] = [
    {},
    {
      email: "invalid-email.com",
      password: "1234567",
    },
    {
      email: "invalid-email.com",
      password: "1234567",
      username: "invalid--username",
    },
  ];

  it.each(validCreateUsers)(
    "Should validate create user properly ",
    (validCreateUser) => {
      pipe(
        validCreateUser,
        CreateUserType.decode,
        TE.fromEither,
        mapAll((result) => expect(result).toBe(validCreateUser))
      )();
    }
  );

  it.each(invalidCreateUsers)(
    "Should return an error if create user is invalid",
    (invalidCreateUser) => {
      expect(
        PathReporter.report(CreateUserType.decode(invalidCreateUser))
      ).toEqual([
        "Invalid email.",
        "Invalid password. Password must contain at least 8 characters.",
        "Invalid slug. Please, use alphanumeric characters, dash and/or numbers.",
      ]);
    }
  );
});
