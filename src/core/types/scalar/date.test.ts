import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import { PathReporter } from "io-ts/PathReporter";

import { mapAll } from "../../../config/test/fixtures";
import { DateType } from "./";

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
      DateType.decode,
      TE.fromEither,
      mapAll((result) => expect(result).toBe(validDate))
    )();
  });

  it.each(invalidDates)(
    "Should return an error if date is invalid",
    (invalidDate) =>
      expect(PathReporter.report(DateType.decode(invalidDate))).toEqual([
        "Invalid date.",
      ])
  );
});
