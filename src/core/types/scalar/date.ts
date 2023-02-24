import * as t from "io-ts";

export const date = new t.Type<string, string, unknown>(
  "Date",
  (input: unknown): input is string =>
    typeof input === "string" && isDate(input),
  (input, context) =>
    typeof input === "string" && isDate(input)
      ? t.success(input)
      : t.failure(input, context, `${input} is Invalid date.`),
  t.identity
);

export type Date = t.TypeOf<typeof date>;

function isDate(date: string) {
  const validDate = Date.parse(date);
  // TODO: check leap year

  if (isNaN(validDate)) return false;

  return true;
}
