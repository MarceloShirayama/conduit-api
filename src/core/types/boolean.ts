import * as t from "io-ts";

export const BooleanType = new t.Type<boolean, boolean, unknown>(
  "BooleanType",
  (input: unknown): input is boolean => typeof input === "boolean",
  (input, context) =>
    typeof input === "boolean"
      ? t.success(input)
      : t.failure(input, context, "Invalid Boolean."),
  t.identity
);

export type BooleanType = t.TypeOf<typeof BooleanType>;
