import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import { getErrorMessage, mapAll } from "../../../test/config/fixtures";

import { date } from "./";

describe("Date scalar", () => {
  const validDates: unknown[] = [
    "2023-02-18T19:56:50.451Z",
    "2023-02-18",
    "2023/02/18",
  ];
  const invalidDates: unknown[] = ["2023-13-02", "2023-01-32"];

  it.each(validDates)("Should validate date properly", (validDate) => {
    pipe(
      validDate,
      date.decode,
      TE.fromEither,
      mapAll((result) => expect(result).toBe(validDate))
    )();
  });

  it.each(invalidDates)(
    "Should return an error if date is invalid",
    (invalidDate) => {
      pipe(
        invalidDate,
        date.decode,
        TE.fromEither,
        mapAll((error) =>
          expect(getErrorMessage(error)).toBe(`${invalidDate} is Invalid date.`)
        )
      )();
    }
  );
});
