import * as t from "io-ts";

export const BioType = new t.Type<string, string, unknown>(
  "BioType",
  (input: unknown): input is string =>
    typeof input === "string" && validateLengthOfString(input),
  (input, context) =>
    typeof input === "string" && validateLengthOfString(input)
      ? t.success(input)
      : t.failure(input, context, "Invalid bio."),
  t.identity
);

export type BioType = t.TypeOf<typeof BioType>;

export function validateLengthOfString(value: string) {
  return value.length >= 10 && value.length <= 300;
}
