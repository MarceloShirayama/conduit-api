import * as t from "io-ts";

export const DateType = new t.Type<string, string, unknown>(
  "DateType",
  (input: unknown): input is string =>
    typeof input === "string" && isDate(input),
  (input, context) =>
    typeof input === "string" && isDate(input)
      ? t.success(input)
      : t.failure(input, context, "Invalid date."),
  t.identity
);

export type DateType = t.TypeOf<typeof DateType>;

function isDate(date: string) {
  const validDate = Date.parse(date);
  // TODO: check leap year

  if (isNaN(validDate)) return false;

  return true;
}
