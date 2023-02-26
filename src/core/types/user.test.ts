import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import { PathReporter } from "io-ts/PathReporter";

import { mapAll } from "../../test/config/fixtures";
import { UserType } from "./";

describe("User type", () => {
  const validUsers: unknown[] = [
    {
      email: "john@mail.com",
      password: "12345678",
      token: "any-token",
      bio: "a".repeat(10),
      image: "http://image_url.com",
    },
  ];

  const invalidUsers: unknown[] = [
    {},
    {
      email: "invalid-email.com",
      password: "1234567",
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
        "Invalid password. Password must contain at least 8 characters.",
        "Invalid token.",
        "Invalid bio.",
        "Invalid image url.",
      ]);
    }
  );
});
