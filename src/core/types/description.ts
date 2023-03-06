import * as t from "io-ts";

export const DescriptionType = new t.Type<string, string, unknown>(
  "DescriptionType",
  (input: unknown): input is string =>
    typeof input === "string" && isDescription(input),
  (input, context) =>
    typeof input === "string" && isDescription(input)
      ? t.success(input)
      : t.failure(input, context, "Invalid Description."),
  t.identity
);

export type DescriptionType = t.TypeOf<typeof DescriptionType>;

export function isDescription(value: string) {
  return value.length > 0;
}
