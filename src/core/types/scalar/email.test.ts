import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import { getErrorMessage, mapAll } from "../../../test/config/fixtures";

import { email } from "./";

describe("Email scalar", () => {
  const validEmails: unknown[] = ["john@mail.com"];
  const invalidEmails: unknown[] = ["invalid-email"];

  it.each(validEmails)("Should validate email properly", (validEmail) => {
    pipe(
      validEmail,
      email.decode,
      TE.fromEither,
      mapAll((result) => expect(result).toBe(validEmail))
    )();
  });

  it.each(invalidEmails)(
    "Should return an error if email is invalid",
    (invalidEmail) => {
      pipe(
        invalidEmail,
        email.decode,
        TE.fromEither,
        mapAll((error) =>
          expect(getErrorMessage(error)).toBe(
            `${invalidEmail} is Invalid email.`
          )
        )
      )();
    }
  );
});
