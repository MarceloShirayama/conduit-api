import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import { PathReporter } from "io-ts/PathReporter";

import { mapAll } from "../../../test/config/fixtures";
import { EmailType } from "./";

describe("Email scalar", () => {
  const validEmails: unknown[] = ["john@mail.com"];
  const invalidEmails: unknown[] = ["invalid-email"];

  it.each(validEmails)("Should validate email properly", (validEmail) => {
    pipe(
      validEmail,
      EmailType.decode,
      TE.fromEither,
      mapAll((result) => expect(result).toBe(validEmail))
    )();
  });

  it.each(invalidEmails)(
    "Should return an error if email is invalid",
    (invalidEmail) =>
      expect(PathReporter.report(EmailType.decode(invalidEmail))).toEqual([
        "Invalid email.",
      ])
  );
});
